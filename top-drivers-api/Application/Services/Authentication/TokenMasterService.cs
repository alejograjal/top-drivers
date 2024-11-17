using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core.Interfaces;
using Application.Interfaces.Authentication;
using Application.Models.DTOs.Authentication;
using Domain.Core.Specifications;
using TopDrivers.Infrastructure;

namespace Application.Services.Authentication;

public class TokenMasterService(ICoreService<TokenMaster> coreService) : ITokenMasterService
{
    /// <inheritdoc />
    public async Task<ResponseTokenMasterDto> CreateAsync(TokenMaster tokenMaster)
    {
        var data = await coreService.UnitOfWork.Repository<TokenMaster>().AddAsync(tokenMaster);
        _ = await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(data.Id);
    }

    /// <inheritdoc />
    public async Task<bool> ExistsAsync(long id)
    {
        var data = await coreService.UnitOfWork.Repository<TokenMaster>().GetByIdAsync(id);
        return data != null;
    }

    public async Task<bool> ExistsAsync(string token)
    {
        var spec = new BaseSpecification<TokenMaster>(m => m.Token == token);
        var data = await coreService.UnitOfWork.Repository<TokenMaster>().FirstOrDefaultAsync(spec);
        return data != null;
    }

    /// <inheritdoc />
    public async Task<ResponseTokenMasterDto> GetByIdAsync(long id)
    {
        var data = await coreService.UnitOfWork.Repository<TokenMaster>().GetByIdAsync(id);
        return coreService.AutoMapper.Map<ResponseTokenMasterDto>(data);
    }

    /// <inheritdoc />
    public async Task<TokenMaster?> GetByTokenAsync(string token)
    {
        var spec = new BaseSpecification<TokenMaster>(m => m.Token == token);
        var data = await coreService.UnitOfWork.Repository<TokenMaster>().FirstOrDefaultAsync(spec);

        return data;
    }

    /// <inheritdoc />
    public async Task<ResponseTokenMasterDto> UpdateAsync(TokenMaster tokenMaster)
    {
        coreService.UnitOfWork.Repository<TokenMaster>().Update(tokenMaster);
        _ = await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(tokenMaster.Id);
    }
}