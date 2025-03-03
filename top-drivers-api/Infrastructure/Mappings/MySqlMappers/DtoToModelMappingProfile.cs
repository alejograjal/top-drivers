using AutoMapper;
using Domain.Core.Models;
using TopDrivers.Infrastructure;
using Application.Models.DTOs.Course;
using Application.Models.DTOs.Core;
using Infrastructure.Mappings.ValueResolvers;

namespace Infrastructure.Mappings.MySqlMappers;

public class DtoToModelMappingProfile : Profile
{
    public DtoToModelMappingProfile()
    {
        CreateMap<RequestBaseDto, BaseEntity>()
            .ForMember(m => m.CreatedBy, opts =>
            {
                opts.MapFrom<UserIdResolverCreateFromBaseDTO>();
            })
            .ForMember(m => m.ModifiedBy, opts =>
            {
                opts.MapFrom<UserIdResolverModifyFromBaseDTO>();
            });

        CreateMap<RequestCourseDto, Course>()
            .IncludeBase<RequestBaseDto, BaseEntity>();
    }
}