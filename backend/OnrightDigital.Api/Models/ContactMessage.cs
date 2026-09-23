namespace OnrightDigital.Api.Models;

/// <summary>A stored enquiry: the submitted request plus server-assigned metadata.</summary>
public sealed class ContactMessage
{
    public string ReferenceId { get; init; } = string.Empty;
    public DateTimeOffset ReceivedAtUtc { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string? Company { get; init; }
    public string? Phone { get; init; }
    public string? Topic { get; init; }
    public string Message { get; init; } = string.Empty;

    public static ContactMessage FromRequest(ContactRequest request) => new()
    {
        ReferenceId = NewReferenceId(),
        ReceivedAtUtc = DateTimeOffset.UtcNow,
        Name = request.Name.Trim(),
        Email = request.Email.Trim(),
        Company = Clean(request.Company),
        Phone = Clean(request.Phone),
        Topic = Clean(request.Topic),
        Message = request.Message.Trim(),
    };

    /// <summary>Short, human-readable reference the client can quote back, e.g. OD-260923-4F1A2B.</summary>
    public static string NewReferenceId() =>
        $"OD-{DateTime.UtcNow:yyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}";

    private static string? Clean(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
