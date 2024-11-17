using System.Security.Cryptography;
using System.Text;

namespace Utilities;

public static class Hashing
{
    public static string HashMd5(string input)
    {
        using var md5Hash = MD5.Create();

        var byteArrayResult = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

        return string.Concat(Array.ConvertAll(byteArrayResult, h => h.ToString("X2")));
    }
}