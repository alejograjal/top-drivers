using System.Data;
using System.Data.Common;
using System.Linq.Expressions;
using Domain.Core.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Application.Core.Interfaces;

public interface IUnitOfWork
{
    IDbConnection MySqlConnection { get; }

    IBaseRepositoryAsync<T> Repository<T>() where T : BaseEntity;

    IExecutionStrategy CreateExecutionStrategy();

    IDbContextTransaction BeginTransaction();

    Task<IDbContextTransaction> BeginTransactionAsyncAsync();

    Task<int> SaveChangesAsync();

    Task RollbackChangesAsync();

    void ClearChangeTracking();

    Task<IList<T>?> FromSqlAsync<T>(FormattableString sql, params Expression<Func<T, object>>[]? includes);

    Task<int> GetTotalRowCountAsync(FormattableString sql);

    Task<IList<string>> GetTableColumnsAsync(string tableName);

    Task<IList<string>> GetTableColumnsAsync(string tableName, string excludeColumn);

    Task<IList<string>> GetTableColumnsAsync(string tableName, List<string> excludeColumnsList);
}