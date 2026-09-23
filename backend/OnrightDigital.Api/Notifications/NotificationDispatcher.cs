namespace OnrightDigital.Api.Notifications;

/// <summary>
/// Background worker: takes each queued enquiry and sends it through every
/// enabled <see cref="INotificationChannel"/>. One channel failing never stops
/// the others, and never affects the visitor's submission.
/// </summary>
public sealed class NotificationDispatcher : BackgroundService
{
    private readonly NotificationQueue _queue;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<NotificationDispatcher> _logger;

    public NotificationDispatcher(
        NotificationQueue queue,
        IServiceScopeFactory scopeFactory,
        ILogger<NotificationDispatcher> logger)
    {
        _queue = queue;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        LogEnabledChannels();

        await foreach (var message in _queue.ReadAllAsync(stoppingToken))
        {
            // A fresh scope per message so HttpClient instances are recycled properly.
            using var scope = _scopeFactory.CreateScope();
            var channels = scope.ServiceProvider.GetServices<INotificationChannel>().Where(c => c.IsEnabled);

            foreach (var channel in channels)
            {
                try
                {
                    await channel.SendAsync(message, stoppingToken);
                    _logger.LogInformation("Sent {Channel} notification for {ReferenceId}", channel.Name, message.ReferenceId);
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    _logger.LogError(ex, "Could not send {Channel} notification for {ReferenceId}", channel.Name, message.ReferenceId);
                }
            }
        }
    }

    private void LogEnabledChannels()
    {
        using var scope = _scopeFactory.CreateScope();
        var enabled = scope.ServiceProvider.GetServices<INotificationChannel>()
            .Where(c => c.IsEnabled)
            .Select(c => c.Name)
            .ToList();

        if (enabled.Count == 0)
        {
            _logger.LogWarning("No notification channels enabled; enquiries are only saved to disk");
        }
        else
        {
            _logger.LogInformation("Notification channels enabled: {Channels}", string.Join(", ", enabled));
        }
    }
}
