using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Notifications;

/// <summary>
/// One way of telling you about a new enquiry (email, Telegram, …).
/// To add another channel: implement this interface and register it in
/// <see cref="NotificationServiceCollectionExtensions"/>. Nothing else changes.
/// </summary>
public interface INotificationChannel
{
    /// <summary>Human-readable name used in log messages.</summary>
    string Name { get; }

    /// <summary>False when switched off in configuration; the dispatcher then skips it.</summary>
    bool IsEnabled { get; }

    Task SendAsync(ContactMessage message, CancellationToken cancellationToken);
}
