namespace OnrightDigital.Api.Notifications;

/// <summary>SMTP settings, bound from "Notifications:Email" in configuration.</summary>
public sealed class EmailOptions
{
    public const string SectionName = "Notifications:Email";

    public bool Enabled { get; set; }

    /// <summary>SMTP server, e.g. smtp.gmail.com or the one from your email/hosting provider.</summary>
    public string Host { get; set; } = string.Empty;

    public int Port { get; set; } = 587;

    public EmailSecurity Security { get; set; } = EmailSecurity.StartTls;

    public string? Username { get; set; }

    /// <summary>Never put this in appsettings.json — use user-secrets or an environment variable.</summary>
    public string? Password { get; set; }

    /// <summary>Sender address, e.g. "Onright Digital website &lt;noreply@example.nl&gt;".</summary>
    public string From { get; set; } = string.Empty;

    /// <summary>Where enquiries are delivered — your own inbox.</summary>
    public string To { get; set; } = string.Empty;
}

public enum EmailSecurity
{
    /// <summary>Plain connection. Only for a local test server.</summary>
    None,

    /// <summary>Upgrade to TLS after connecting (usually port 587).</summary>
    StartTls,

    /// <summary>TLS from the first byte (usually port 465).</summary>
    SslOnConnect,
}
