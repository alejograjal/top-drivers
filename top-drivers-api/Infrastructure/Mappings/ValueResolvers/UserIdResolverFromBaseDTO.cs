using Application.Interfaces.Authorization;
using AutoMapper;
using Domain.Core.Models;

namespace Infrastructure.Mappings.ValueResolvers;

public class UserIdResolverFromBaseDTO(IUserContextService userContextService) : IValueResolver<BaseDto, BaseEntity, string?>
{
    public string? Resolve(BaseDto source, BaseEntity destination, string? destMember, ResolutionContext context) => userContextService.UserId!;
}