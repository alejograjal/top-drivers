using Newtonsoft.Json;

namespace Utilities;

public class Serialization
{
    /// <summary>
    /// Serialize object into json
    /// </summary>
    /// <param name="request">Object to be serialized</param>
    /// <returns>string</returns>
    public static string Serialize<T>(T request) => JsonConvert.SerializeObject(request)!;

    /// <summary>
    /// Deserialize json into object
    /// </summary>
    /// <param name="model">Json to be deserialize</param>
    /// <returns>T(Object)</returns>
    public static T Deserialize<T>(string model)
    {
        var settings = new JsonSerializerSettings();
        return JsonConvert.DeserializeObject<T>(model, settings)!;
    }
}