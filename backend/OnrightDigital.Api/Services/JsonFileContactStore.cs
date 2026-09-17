using System.Text.Json;
using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Services;

/// <summary>
/// Stores enquiries as a JSON array under App_Data/contact-messages.json.
///
/// This is deliberately simple so the project runs with no database to set up.
/// When you outgrow it, implement <see cref="IContactStore"/> against EF Core
/// and change the one registration line in Program.cs.
/// </summary>
public sealed class JsonFileContactStore : IContactStore
{
    private static readonly JsonSerializerOptions SerializerOptions = new()
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    // Guards read-modify-write of the file; the store is registered as a singleton.
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly string _filePath;
    private readonly ILogger<JsonFileContactStore> _logger;

    public JsonFileContactStore(IWebHostEnvironment environment, ILogger<JsonFileContactStore> logger)
    {
        _logger = logger;
        var dataDirectory = Path.Combine(environment.ContentRootPath, "App_Data");
        Directory.CreateDirectory(dataDirectory);
        _filePath = Path.Combine(dataDirectory, "contact-messages.json");
    }

    public async Task<ContactMessage> SaveAsync(
        ContactRequest request,
        CancellationToken cancellationToken = default)
    {
        var message = ContactMessage.FromRequest(request);

        await _gate.WaitAsync(cancellationToken);
        try
        {
            var messages = await ReadAllAsync(cancellationToken);
            messages.Add(message);

            // Write to a temp file first so a crash mid-write cannot truncate the store.
            var tempPath = _filePath + ".tmp";
            await using (var stream = File.Create(tempPath))
            {
                await JsonSerializer.SerializeAsync(stream, messages, SerializerOptions, cancellationToken);
            }
            File.Move(tempPath, _filePath, overwrite: true);
        }
        finally
        {
            _gate.Release();
        }

        _logger.LogInformation(
            "Stored contact enquiry {ReferenceId} from {Email}",
            message.ReferenceId,
            message.Email);

        return message;
    }

    public async Task<IReadOnlyList<ContactMessage>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            return await ReadAllAsync(cancellationToken);
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Reads the file. Call only while holding <see cref="_gate"/>.</summary>
    private async Task<List<ContactMessage>> ReadAllAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_filePath))
        {
            return [];
        }

        try
        {
            await using var stream = File.OpenRead(_filePath);
            var messages = await JsonSerializer.DeserializeAsync<List<ContactMessage>>(
                stream,
                SerializerOptions,
                cancellationToken);
            return messages ?? [];
        }
        catch (JsonException ex)
        {
            // A corrupt file must not take the whole API down with it.
            _logger.LogError(ex, "Could not parse {FilePath}; starting from an empty list", _filePath);
            return [];
        }
    }
}
