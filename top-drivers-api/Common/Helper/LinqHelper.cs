using System.Linq.Expressions;

namespace Common.Helper;

public class LinqHelper
{
    public static string? GetMemberName<T>(Expression<Func<T, object>> expression)
    {
        return expression.Body switch
        {
            MemberExpression m => m.Member.Name,
            UnaryExpression u when u.Operand is MemberExpression m => m.Member.Name,
            _ => null,
        };
    }
}