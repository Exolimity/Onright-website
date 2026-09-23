using System.ComponentModel.DataAnnotations;

namespace OnrightDigital.Api.Models;

/// <summary>
/// What the React contact form posts to POST /api/contact.
/// The attributes here are the single source of truth for validation —
/// the front end mirrors them for instant feedback, but the server decides.
/// </summary>
public sealed class ContactRequest
{
    [Required(ErrorMessage = "Please enter your name.")]
    [StringLength(80, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 80 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter a valid email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [StringLength(160, ErrorMessage = "Email must be 160 characters or fewer.")]
    public string Email { get; set; } = string.Empty;

    [StringLength(120, ErrorMessage = "Company must be 120 characters or fewer.")]
    public string? Company { get; set; }

    [StringLength(60, ErrorMessage = "Budget must be 60 characters or fewer.")]
    public string? Budget { get; set; }

    [Required(ErrorMessage = "Please tell us a little more (at least 10 characters).")]
    [StringLength(4000, MinimumLength = 10, ErrorMessage = "Message must be between 10 and 4,000 characters.")]
    public string Message { get; set; } = string.Empty;
}
