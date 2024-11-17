using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

namespace Application.Models;

public class ErrorDetails
{
    public string Type { get; set; } = string.Empty;

    public int StatusCode { get; set; }

    public string? Message { get; set; }

    public string? Details { get; set; }

    [JsonIgnore]
    public LogLevel LogLevel { get; set; } = LogLevel.None;

    public override string ToString()
    {
        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
        return JsonSerializer.Serialize(this, options);
    }
}