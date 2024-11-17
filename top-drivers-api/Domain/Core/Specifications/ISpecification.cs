using System.Linq.Expressions;

namespace Domain.Core.Specifications;

public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }

    List<Expression<Func<T, object>>> Includes { get; }

    List<string> IncludeString { get; }

    List<Expression<Func<T, object>>>? OrderBy { get; }

    List<Expression<Func<T, object>>>? OrderByDescending { get; }

    Expression<Func<T, object>>? GroupBy { get; }

    int Take { get; }

    int Skip { get; }

    bool IsPagingEnabled { get; }

    bool NoTracking { get; }

    bool NoTrackingWithIdentityResolution { get; }
}