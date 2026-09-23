using Microsoft.Extensions.Options;
using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Notifications;

/// <summary>
/// Sends a short alert to your phone through a Telegram bot.
///
/// Privacy: Telegram's servers are outside the EU, so the alert deliberately
/// contains only the reference, name and topic. The full enquiry (email,
/// phone, message) goes by email only. The privacy statement says the same.
/// </summary>
public sealed class TelegramNotificationChannel : INotificationChannel
{
    private readonly HttpClient _http;
    private readonly TelegramOptions _options;

    public TelegramNotificationChannel(HttpClient http, IOptions<TelegramOptions> options)
    {
        _http = http;
        _options = options.Value;
    }

    public string Name => "telegram";

    public bool IsEnabled => _options.Enabled;

    public async Task SendAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        var url = $"{_options.ApiBaseUrl.TrimEnd('/')}/bot{_options.BotToken}/sendMessage";

        var text =
            $"Nieuwe aanvraag via de website\n\n" +
            $"Referentie: {message.ReferenceId}\n" +
            $"Naam: {message.Name}\n" +
            $"Onderwerp: {message.Topic ?? "–"}\n\n" +
            "De volledige aanvraag staat in je e-mail.";

        // No parse_mode: the text is sent as plain text, so nothing a visitor
        // types can be interpreted as Telegram formatting.
        var response = await _http.PostAsJsonAsync(
            url,
            new { chat_id = _options.ChatId, text, disable_web_page_preview = true },
            cancellationToken);

        response.EnsureSuccessStatusCode();
    }
}
