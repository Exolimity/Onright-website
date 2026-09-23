namespace OnrightDigital.Api.Models;

/// <summary>What the client gets back after a successful submission.</summary>
/// <param name="ReferenceId">Reference the visitor can quote in follow-up emails.</param>
public sealed record ContactResponse(string ReferenceId);
