namespace OnrightDigital.Api.Models;

/// <summary>A stored enquiry: the submitted request plus server-assigned metadata.</summary>
public sealed class ContactMessage
{
    public string ReferenceId { get; init; } = string.Empty;
    public DateTimeOffset ReceivedAtUtc { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string? Company { get; init; }
    public string? Budget { get; init; }
    public string Message { get; init; } = string.Empty;

    public static ContactMessage FromRequest(ContactRequest request) => new()
    {
        // Short, human-readable reference the client can quote back to us.
        ReferenceId = $"OD-{DateTime.UtcNow:yyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}",
        ReceivedAtUtc = DateTimeOffset.UtcNow,
        Name = request.Name.Trim(),
        Email = request.Email.Trim(),
        Company = string.IsNullOrWhiteSpace(request.Company) ? null : request.Company.Trim(),
        Budget = string.IsNullOrWhiteSpace(request.Budget) ? null : request.Budget.Trim(),
        Message = request.Message.Trim(),
    };
}
