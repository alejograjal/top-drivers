using System.Text;

namespace Common.Helper;

public class ErrorHandling
{
    public static string? GetErrorMessage(Exception ex)
    {
        if (ex == null) return null;

        var errorMessage = new StringBuilder();
        errorMessage.Append(ex.Message);
        return ex.InnerException != null ? GetAllErrorMessage(ex)  : errorMessage.ToString();
    }

    private static string GetAllErrorMessage(Exception ex) => ex.InnerException == null ? ex.Message : $"{ex.Message} : {GetAllErrorMessage(ex.InnerException)}";
}