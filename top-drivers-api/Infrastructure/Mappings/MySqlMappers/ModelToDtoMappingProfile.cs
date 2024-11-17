using Application.Models.DTOs;
using Application.Models.DTOs.Authentication;
using AutoMapper;
using TopDrivers.Infrastructure;

namespace Infrastructure.Mappings.MySqlMappers;

public class ModelToDtoMappingProfile : Profile
{
    public ModelToDtoMappingProfile()
    {
        // Course
        CreateMap<Course, ResponseCourseDto>();
        CreateMap<Course, ResponseSimpleCourseDto>();

        // Event
        CreateMap<Event, ResponseEventDto>();

        // New
        CreateMap<New, ResponseNewDto>();

        // Resource
        CreateMap<Resource, ResponseResourceDto>();
        CreateMap<Resource, ResponseSimpleResourceDto>();

        // Service
        CreateMap<Service, ResponseServiceDto>();

        // User
        CreateMap<User, ResponseUserDto>();

        // Token
        CreateMap<TokenMaster, ResponseTokenMasterDto>();
    }
}