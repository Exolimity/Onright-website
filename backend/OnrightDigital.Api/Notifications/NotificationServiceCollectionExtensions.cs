namespace OnrightDigital.Api.Notifications;

public static class NotificationServiceCollectionExtensions
{
    /// <summary>Registers the notification queue, background dispatcher and all channels.</summary>
    public static IServiceCollection AddContactNotifications(this IServiceCollection services)
    {
        // ValidateOnStart: a channel that is switched on but half-configured stops the app at
        // startup with a clear message, instead of failing silently on the first enquiry.
        services.AddOptions<EmailOptions>()
            .BindConfiguration(EmailOptions.SectionName)
            .Validate(
                o => !o.Enabled || (!string.IsNullOrWhiteSpace(o.Host) && !string.IsNullOrWhiteSpace(o.From) && !string.IsNullOrWhiteSpace(o.To)),
                "Notifications:Email is enabled but Host, From or To is missing.")
            .ValidateOnStart();

        services.AddOptions<TelegramOptions>()
            .BindConfiguration(TelegramOptions.SectionName)
            .Validate(
                o => !o.Enabled || (!string.IsNullOrWhiteSpace(o.BotToken) && !string.IsNullOrWhiteSpace(o.ChatId)),
                "Notifications:Telegram is enabled but BotToken or ChatId is missing.")
            .ValidateOnStart();

        services.AddHttpClient<TelegramNotificationChannel>(client => client.Timeout = TimeSpan.FromSeconds(10));

        services.AddTransient<INotificationChannel, EmailNotificationChannel>();
        services.AddTransient<INotificationChannel>(sp => sp.GetRequiredService<TelegramNotificationChannel>());

        services.AddSingleton<NotificationQueue>();
        services.AddHostedService<NotificationDispatcher>();

        return services;
    }
}
