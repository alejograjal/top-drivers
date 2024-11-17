using Application.Core.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace Application.Core.Services;

public class CoreService<T>(ILogger<T> logger, IMapper autoMapper, IUnitOfWork unitOfWork) : ICoreService<T>
{
    public ILogger<T> Logger { get { return logger; } }
    public IMapper AutoMapper { get { return autoMapper; } }
    public IUnitOfWork UnitOfWork { get { return unitOfWork; } }
}