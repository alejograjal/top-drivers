using System.Runtime.CompilerServices;

namespace Domain.Core.Models;

public class PageResultBase : PagingDetails
{
    public int PageCount { get; set; }

    public int RowCount { get; set; }

    public int FirstRowOnPage { get; set; }

    public int LastRowOnPage { get; set; }

    public static FormattableString GetPagingOffSet(PagingDetails pagingDetails) =>
        FormattableStringFactory.Create(@" Offset {0} Rows Fetch Next {1} Rows Only", (pagingDetails.CurrentPage - 1) * pagingDetails.PageSize, pagingDetails.PageSize);
}