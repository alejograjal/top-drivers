using Common.Extensions;
using Domain.Core.Models;
using Domain.Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public static class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> specification)
    {
        var query = inputQuery;

        if (specification.Criteria != null) query = query.Where(specification.Criteria);

        query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));
        query = specification.IncludeString.Aggregate(query, (current, include) => current.Include(include));

        IOrderedQueryable<T> orderedQuery = null!;
        if (specification.OrderBy != null && specification.OrderBy.HasItems())
        {
            foreach (var item in specification.OrderBy)
            {
                orderedQuery = orderedQuery == null ? query.OrderBy(item) : orderedQuery.ThenBy(item);
            }
        }

        if (specification.OrderByDescending != null && specification.OrderByDescending.HasItems())
        {
            foreach (var item in specification.OrderByDescending)
            {
                orderedQuery = orderedQuery == null ? query.OrderByDescending(item) : orderedQuery.ThenByDescending(item);
            }
        }

        if (orderedQuery != null)
        {
            query = orderedQuery;
        }

        if (specification.IsPagingEnabled)
        {
            query = query.Skip(specification.Skip)
                            .Take(specification.Take);
        }

        if (specification.NoTracking)
        {
            query = query.AsNoTracking();
        }
        else
        {
            if (specification.NoTrackingWithIdentityResolution)
            {
                query = query.AsNoTrackingWithIdentityResolution();
            }
        }

        return query;
    }
}