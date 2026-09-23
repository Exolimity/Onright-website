using System.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Notifications;

/// <summary>Emails you the full enquiry. Replying to the email goes straight to the visitor.</summary>
public sealed class EmailNotificationChannel : INotificationChannel
{
    private readonly EmailOptions _options;

    public EmailNotificationChannel(IOptions<EmailOptions> options)
    {
        _options = options.Value;
    }

    public string Name => "email";

    public bool IsEnabled => _options.Enabled;

    public async Task SendAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(_options.From));
        email.To.Add(MailboxAddress.Parse(_options.To));

        // Hitting "Reply" in your mail app answers the visitor directly.
        if (MailboxAddress.TryParse(message.Email, out var replyTo))
        {
            replyTo.Name = message.Name;
            email.ReplyTo.Add(replyTo);
        }

        email.Subject = $"Nieuwe aanvraag {message.ReferenceId} – {message.Name}";
        email.Body = new TextPart("plain") { Text = BuildBody(message) };

        using var client = new SmtpClient { Timeout = 15_000 };
        await client.ConnectAsync(_options.Host, _options.Port, ToMailKit(_options.Security), cancellationToken);

        if (!string.IsNullOrEmpty(_options.Username))
        {
            await client.AuthenticateAsync(_options.Username, _options.Password ?? string.Empty, cancellationToken);
        }

        await client.SendAsync(email, cancellationToken);
        await client.DisconnectAsync(quit: true, cancellationToken);
    }

    private static string BuildBody(ContactMessage message)
    {
        var body = new StringBuilder()
            .AppendLine("Er is een nieuwe aanvraag binnengekomen via de website.")
            .AppendLine()
            .AppendLine($"Referentie:   {message.ReferenceId}")
            .AppendLine($"Ontvangen:    {message.ReceivedAtUtc.ToLocalTime():dd-MM-yyyy HH:mm}")
            .AppendLine($"Naam:         {message.Name}")
            .AppendLine($"E-mail:       {message.Email}");

        if (message.Company is not null) body.AppendLine($"Bedrijf:      {message.Company}");
        if (message.Phone is not null) body.AppendLine($"Telefoon:     {message.Phone}");
        if (message.Topic is not null) body.AppendLine($"Onderwerp:    {message.Topic}");

        return body
            .AppendLine()
            .AppendLine("Bericht:")
            .AppendLine(message.Message)
            .ToString();
    }

    private static SecureSocketOptions ToMailKit(EmailSecurity security) => security switch
    {
        EmailSecurity.None => SecureSocketOptions.None,
        EmailSecurity.SslOnConnect => SecureSocketOptions.SslOnConnect,
        _ => SecureSocketOptions.StartTls,
    };
}
