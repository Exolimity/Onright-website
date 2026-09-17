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
    [StringLength(80, MinimumLength = 2, ErrorMessage = "Please enter your name.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter a valid email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [StringLength(160)]
    public string Email { get; set; } = string.Empty;

    [StringLength(120)]
    public string? Company { get; set; }

    [StringLength(60)]
    public string? Budget { get; set; }

    [Required(ErrorMessage = "Please tell us a little more (at least 10 characters).")]
    [StringLength(4000, MinimumLength = 10, ErrorMessage = "Please tell us a little more (at least 10 characters).")]
    public string Message { get; set; } = string.Empty;
}
