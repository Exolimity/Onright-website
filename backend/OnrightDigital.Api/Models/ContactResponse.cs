namespace OnrightDigital.Api.Models;

/// <summary>What the client gets back after a successful submission.</summary>
/// <param name="ReferenceId">Reference the visitor can quote in follow-up emails.</param>
/// <param name="Message">Friendly confirmation text.</param>
public sealed record ContactResponse(string ReferenceId, string Message);
