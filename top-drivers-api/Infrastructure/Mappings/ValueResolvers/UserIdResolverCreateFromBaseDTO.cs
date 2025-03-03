using Application.Interfaces.Authorization;
using Application.Models.DTOs.Core;
using AutoMapper;
using Domain.Core.Models;

namespace Infrastructure.Mappings.ValueResolvers;

public class UserIdResolverCreateFromBaseDTO(IUserContextService userContextService) : IValueResolver<RequestBaseDto, BaseEntity, string>
{
    public string Resolve(RequestBaseDto source, BaseEntity destination, string destMember, ResolutionContext context) => userContextService.UserId!;
}