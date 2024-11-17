namespace Common.Extensions;

public static class FormattableStringExpressions
{
    public static string GetSQL(this FormattableString instance) => FormattableString.Invariant(instance);
}