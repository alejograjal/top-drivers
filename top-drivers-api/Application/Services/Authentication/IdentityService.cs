using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Application.Interfaces.Authentication;
using Application.Models.DTOs;
using Application.Models.DTOs.Authentication;
using Application.Models.DTOs.Authorization;
using Domain.Exceptions;
using Microsoft.IdentityModel.Tokens;
using TopDrivers.Infrastructure;
using Utilities;

namespace Application.Services.Authentication;

public class IdentityService(IUserService userService, ITokenMasterService tokenMasterService, AuthenticationConfiguration authenticationConfiguration, 
                                TokenValidationParameters tokenValidationParameters) : IIdentityService
{
    public async Task<TokenModel> LoginAsync(RequestUserLoginDto login)
    {
        string md5Password = Hashing.HashMd5(login.Password);
        var loginUser = await userService.LogInAsync(login.NickName, md5Password);

        if (loginUser == null) throw new UnAuthorizedException("Correo electrónico o contraseña inválido");

        return await AuthenticateAsync(loginUser);
    }

    /// <inheritdoc />
    public async Task<TokenModel> RefreshTokenAsync(TokenModel request)
    {
        var response = new AuthenticationResult();
        var authResponse = await GetRefreshTokenAsync(request.Token, request.RefreshToken);
        if (!authResponse.Success) throw new TopDriverException("No se pudo obtener el token actualizado");

        response.Token = authResponse.Token;
        response.RefreshToken = authResponse.RefreshToken;

        return response;
    }

    private async Task<AuthenticationResult> AuthenticateAsync(ResponseUserDto user)
    {
        var authenticationResult = new AuthenticationResult();
        var tokenHandler = new JwtSecurityTokenHandler();

        ClaimsIdentity subject = GenerateClaims(user);

        var tokenDescriptor = GetSecurityTokenDescriptor(subject);

        var token = tokenHandler.CreateToken(tokenDescriptor);
        authenticationResult.Token = tokenHandler.WriteToken(token);

        var refreshToken = GenerarTokenMaster(token.Id, user.Id);

        var tokenMaster = await tokenMasterService.CreateAsync(refreshToken);
        if (tokenMaster == null) throw new NotFoundException("Token no almacenado");

        authenticationResult.RefreshToken = refreshToken.Token;
        authenticationResult.Success = true;

        return authenticationResult;
    }

    private ClaimsIdentity GenerateClaims(ResponseUserDto usuario)
    {
        return new ClaimsIdentity(new Claim[]
        {
            new Claim("UserId", usuario.Id.ToString()),
            new Claim("FirstName", usuario.FirstName),
            new Claim("LastName", usuario.LastName),
            new Claim("FullName", $"{usuario.FirstName} {usuario.LastName}"),
            new Claim("Email", usuario.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        });
    }

    private SecurityTokenDescriptor GetSecurityTokenDescriptor(ClaimsIdentity subject) =>
       new SecurityTokenDescriptor
       {
           Subject = subject,
           Expires = DateTime.UtcNow.Add(authenticationConfiguration.JwtSettings_TokenLifetime),
           SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authenticationConfiguration.JwtSettings_Secret)), SecurityAlgorithms.HmacSha256Signature)
       };

    private TokenMaster GenerarTokenMaster(string idToken, long idUsuario) =>
        new TokenMaster
        {
            Token = Guid.NewGuid().ToString(),
            JwtId = idToken,
            UserId = idUsuario,
            Issued = DateTime.UtcNow,
            Used = false,
            Expiration = DateTime.UtcNow.AddMonths(6),
            Created = DateTime.Now,
            CreatedBy = "top-drivers-admin",
            IsActive = true
        };

    private async Task<AuthenticationResult> GetRefreshTokenAsync(string token, string refreshToken)
    {
        var validatedToken = GetPrincipalFromToken(token);
        if (validatedToken == null) return new AuthenticationResult { Errors = new[] { "Token Inválido" } };

        var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            .AddSeconds(long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value));

        if (expiryDateTimeUtc > DateTime.UtcNow) return new AuthenticationResult { Errors = new[] { "Token aun no ha expirado" } };

        if (!await tokenMasterService.ExistsAsync(refreshToken)) throw new NotFoundException("Token no encontrado.");
        var existingRefreshToken = await tokenMasterService.GetByTokenAsync(refreshToken);

        if (existingRefreshToken == null) return new AuthenticationResult { Errors = new[] { "Token no existe" } };
        if (DateTime.UtcNow > existingRefreshToken.Expiration) return new AuthenticationResult { Errors = new[] { "El token de actualización ya expiró" } };
        if (existingRefreshToken.Used) return new AuthenticationResult { Errors = new[] { "El token de actualización ya ha sido usado" } };
        if (existingRefreshToken.JwtId != validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value) return new AuthenticationResult { Errors = new[] { "El token de actualización no coincide con el JWt" } };

        existingRefreshToken.Used = true;
        await tokenMasterService.UpdateAsync(existingRefreshToken);
        var usuario = await userService.GetByIdAsync(long.Parse(validatedToken.Claims.Single(x => x.Type == "IdUsuario").Value));

        return await AuthenticateAsync(usuario!);
    }


    private ClaimsPrincipal GetPrincipalFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var validationParameters = tokenValidationParameters.Clone();
            validationParameters.ValidateLifetime = false;
            var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            if (!IsJwtWithValidSecurityAlgorithm(validatedToken)) return null!;

            return principal;
        }
        catch
        {
            return null!;
        }
    }

    private bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken) => (validatedToken is JwtSecurityToken jwtSecurityToken) &&
           jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
               StringComparison.InvariantCultureIgnoreCase);
}