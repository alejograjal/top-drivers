namespace Common.Extensions;

public static class CollectionExtensions
{
    public static bool HasItems<T>(this IEnumerable<T> source) => source?.Any() ?? false;

    public static void AddRange<T>(this ICollection<T> destination, IEnumerable<T> source)
    {
        foreach (var item in source)
        {
            destination.Add(item);
        }
    }

    public static void SortBy<T, TKey>(this List<T> list, Func<T, TKey> selector, IComparer<TKey>? comparer = null)
    {
        comparer ??= Comparer<TKey>.Default;
        list.Sort((x, y) => comparer.Compare(selector(x), selector(y)));
    }

    public static void SortByDescending<T, TKey>(this List<T> list, Func<T, TKey> selector, IComparer<TKey>? comparer = null)
    {
        comparer ??= Comparer<TKey>.Default;
        list.Sort((x, y) => comparer.Compare(selector(y), selector(x)));
    }
}