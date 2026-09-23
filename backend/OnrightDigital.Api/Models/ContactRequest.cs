using System.ComponentModel.DataAnnotations;

namespace OnrightDigital.Api.Models;

/// <summary>
/// What the contact form posts to POST /api/contact.
/// These attributes are the real validation rules; the React form mirrors them
/// only to give instant feedback.
/// </summary>
public sealed class ContactRequest
{
    [Required(ErrorMessage = "Vul uw naam in.")]
    [StringLength(80, MinimumLength = 2, ErrorMessage = "Uw naam moet tussen 2 en 80 tekens lang zijn.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vul uw e-mailadres in.")]
    [EmailAddress(ErrorMessage = "Vul een geldig e-mailadres in.")]
    [StringLength(160, ErrorMessage = "Het e-mailadres mag maximaal 160 tekens lang zijn.")]
    public string Email { get; set; } = string.Empty;

    [StringLength(120, ErrorMessage = "De bedrijfsnaam mag maximaal 120 tekens lang zijn.")]
    public string? Company { get; set; }

    // Optional + then 8–20 digits, spaces, dashes or brackets. Same pattern as the front end.
    [RegularExpression(@"^\+?[\d\s\-()]{8,20}$", ErrorMessage = "Vul een geldig telefoonnummer in.")]
    public string? Phone { get; set; }

    [StringLength(80, ErrorMessage = "Het onderwerp mag maximaal 80 tekens lang zijn.")]
    public string? Topic { get; set; }

    [Required(ErrorMessage = "Vul een bericht in.")]
    [StringLength(4000, MinimumLength = 10, ErrorMessage = "Uw bericht moet tussen 10 en 4000 tekens lang zijn.")]
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Honeypot. The field is hidden from people, so only bots fill it in.
    /// Deliberately unvalidated: a bot must not learn that it was caught.
    /// </summary>
    public string? Website { get; set; }
}
