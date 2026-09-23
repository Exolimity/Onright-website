using System.Threading.Channels;
using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Notifications;

/// <summary>
/// In-memory hand-off between the contact endpoint and <see cref="NotificationDispatcher"/>.
/// The endpoint drops a message in and answers the visitor immediately; sending happens
/// in the background, so a slow mail server never makes the form hang.
///
/// Queued notifications are lost if the app restarts before they are sent — the enquiry
/// itself is already saved to disk, so nothing is lost, you just don't get the alert.
/// </summary>
public sealed class NotificationQueue
{
    private readonly Channel<ContactMessage> _channel =
        Channel.CreateBounded<ContactMessage>(new BoundedChannelOptions(capacity: 100)
        {
            // Under a flood (e.g. spam that slipped through), keep the newest alerts.
            FullMode = BoundedChannelFullMode.DropOldest,
            SingleReader = true,
        });

    public void Enqueue(ContactMessage message) => _channel.Writer.TryWrite(message);

    public IAsyncEnumerable<ContactMessage> ReadAllAsync(CancellationToken cancellationToken) =>
        _channel.Reader.ReadAllAsync(cancellationToken);
}
