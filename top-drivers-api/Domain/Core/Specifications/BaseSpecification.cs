using System.Linq.Expressions;
using Domain.Core.Models;

namespace Domain.Core.Specifications;

public class BaseSpecification<T>(Expression<Func<T, bool>> criteria) : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria { get; } = criteria;

    public List<Expression<Func<T, object>>> Includes { get; } = [];

    public List<string> IncludeString { get; } = [];

    public List<Expression<Func<T, object>>>? OrderBy { get; private set; } = [];

    public List<Expression<Func<T, object>>>? OrderByDescending { get; private set; } = [];

    public Expression<Func<T, object>>? GroupBy { get; private set; }

    public int Take { get; private set; }

    public int Skip { get; private set; }

    public bool IsPagingEnabled { get; private set; } = false;

    public bool NoTracking { get; private set; } = true;

    public bool NoTrackingWithIdentityResolution { get; private set; } = false;

    public virtual void AddInclude(Expression<Func<T, object>> includeExpression) => Includes.Add(includeExpression);

    public virtual void AddInclude(string includeString) => IncludeString.Add(includeString);

    public virtual void AddInclude(List<string> includeStrings) => IncludeString.AddRange(includeStrings);

    public virtual void AddInclude(string[] includeStrings) => IncludeString.AddRange(includeStrings);

    public virtual void ApplyPaging(PagingDetails pagingDetails)
    {
        Skip = (pagingDetails.CurrentPage -1) * pagingDetails.PageSize;
        Take = pagingDetails.PageSize;
        IsPagingEnabled = true;
    }

    public virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression) => OrderBy!.Add(orderByExpression);

    public virtual void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression) => OrderBy!.Add(orderByDescendingExpression);

    public virtual void ApplyGroupBy(Expression<Func<T, object>> groupByExpression) => GroupBy = groupByExpression;

    public virtual void ApplyNoTracking(bool isNoTracking) => NoTracking = isNoTracking;

    public virtual void ApplyNoTrackingWithIdentityResolution()
    {
        NoTrackingWithIdentityResolution = true;
        NoTracking = false;
    }
}