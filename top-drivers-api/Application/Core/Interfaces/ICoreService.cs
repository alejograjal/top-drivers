using AutoMapper;
using Microsoft.Extensions.Logging;

namespace Application.Core.Interfaces;

public interface ICoreService<T>
{
    ILogger<T> Logger { get; }

    IMapper AutoMapper { get; }

    IUnitOfWork UnitOfWork { get; }
}