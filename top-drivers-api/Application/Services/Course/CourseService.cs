using FluentValidation;
using Application.Core.Interfaces;
using Application.Interfaces;
using Application.Models.DTOs;
using TopDrivers.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Application.Models.DTOs.Course;
using Domain.Core.Specifications;
using Domain.Exceptions;

namespace Application.Services;

public class CourseService(ICoreService<Course> coreService, IValidator<Course> courseValidator) : ICourseService
{
    public async Task<ResponseCourseDto> CreateAsync(RequestCourseDto requestCourseDto)
    {
        var course = ValidateCourse(requestCourseDto);

        var data = await coreService.UnitOfWork.Repository<Course>().AddAsync(course);
        await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(data.Id);
    }

    public async Task<bool> DeleteAsync(long id)
    {
        if (!await ExistsCourseAsync(id))
        {
            throw new NotFoundException("Curso no existe");
        }

        var spec = new BaseSpecification<Course>(m => m.Id == id);
        var course = await coreService.UnitOfWork.Repository<Course>().FirstOrDefaultAsync(spec);
        course!.IsActive = false;

        coreService.UnitOfWork.Repository<Course>().Update(course);
        return await coreService.UnitOfWork.SaveChangesAsync() != 0;
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseCourseDto>> GetAllAsync(bool includeDisabled = false)
    {
        var query = coreService.UnitOfWork.Repository<Course>().AsQueryable().Where(m => m.IsEnabled || m.IsEnabled == !includeDisabled);

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseCourseDto>>(await query.ToListAsync());
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseSimpleCourseDto>> GetAllAsync()
    {
        var query = coreService.UnitOfWork.Repository<Course>().AsQueryable().Where(m => m.IsEnabled);

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseSimpleCourseDto>>(await query.ToListAsync());
    }

    public async Task<ResponseCourseDto> GetByIdAsync(long id)
    {
        var spec = new BaseSpecification<Course>(m => m.Id == id);
        var course = await coreService.UnitOfWork.Repository<Course>().FirstOrDefaultAsync(spec);

        if (course == null || !course.IsActive)
        {
            throw new NotFoundException("Curso no existe");
        }

        return coreService.AutoMapper.Map<ResponseCourseDto>(course);
    }

    public async Task<ResponseCourseDto> UpdateAsync(long courseId, RequestCourseDto requestCourseDto)
    {
        requestCourseDto.Id = courseId;
        if (!await ExistsCourseAsync(requestCourseDto.Id))
        {
            throw new NotFoundException("Curso no existe");
        }

        var course = ValidateCourse(requestCourseDto);
        course.Id = requestCourseDto.Id;
        course.IsActive = true;

        coreService.UnitOfWork.Repository<Course>().Update(course);
        await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(requestCourseDto.Id);
    }

    private async Task<bool> ExistsCourseAsync(long id) => await coreService.UnitOfWork.Repository<Course>().ExistsAsync(id);

    private Course ValidateCourse(RequestCourseDto requestCourseDto)
    {
        var course = coreService.AutoMapper.Map<Course>(requestCourseDto);
        courseValidator.ValidateAndThrow(course);

        return course;
    }
}