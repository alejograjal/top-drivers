using Common.Extensions;
using Domain.Core.Models;

namespace Application.Core.Models;

public class PageResultDTO<T> : PageResultBase where T : class
{   
    public IReadOnlyCollection<T>? Results { get; set; }

    public PageResultDTO() => Results = [];

    public static PageResultDTO<T> GetPageResult(PagingDetails pagingDetails, IReadOnlyCollection<T>? data)
    {
        var rowCountTotal = data != null ? data.Count : 0;
        var response = new PageResultDTO<T>()
        {
            CurrentPage = pagingDetails.CurrentPage,
            PageSize = pagingDetails.PageSize,
            RowCount = rowCountTotal,
            PageCount = (rowCountTotal + pagingDetails.PageSize - 1) / pagingDetails.PageSize,
        };

        var skip = (response.CurrentPage - 1) * response.PageSize;
        response.Results = data != null && data.HasItems() ? data.Skip(skip).Take(response.PageSize).ToList() : null;

        response.FirstRowOnPage = response.Results != null && response.Results.HasItems() ? (response.CurrentPage - 1) * response.PageSize + 1 : 0;
        response.LastRowOnPage = response.Results != null && response.Results.HasItems() ? Math.Min(response.CurrentPage * response.PageSize, response.RowCount) : 0;

        return response;
    }
}