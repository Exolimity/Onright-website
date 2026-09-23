namespace OnrightDigital.Api.Notifications;

/// <summary>Telegram bot settings, bound from "Notifications:Telegram" in configuration.</summary>
public sealed class TelegramOptions
{
    public const string SectionName = "Notifications:Telegram";

    public bool Enabled { get; set; }

    /// <summary>Token from @BotFather. Secret: use user-secrets or an environment variable.</summary>
    public string BotToken { get; set; } = string.Empty;

    /// <summary>Your personal chat id with the bot (see README for how to find it).</summary>
    public string ChatId { get; set; } = string.Empty;

    /// <summary>Only changed in tests, to point at a fake server.</summary>
    public string ApiBaseUrl { get; set; } = "https://api.telegram.org";
}
