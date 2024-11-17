using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Common.Extensions;

public static class IQueryableExtensions
{
    public static IQueryable<T> AddIncludes<T>(this IQueryable<T> query, params string[]? includes) where T : class
    {
        if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

        return query;
    }

    public static IQueryable<T> AddIncludes<T>(this IQueryable<T> query, Expression<Func<T, object>>[] includes) where T : class
    {
        if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

        return query;
    }
}