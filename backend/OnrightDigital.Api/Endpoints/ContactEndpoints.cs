using System.ComponentModel.DataAnnotations;
using OnrightDigital.Api.Models;
using OnrightDigital.Api.Notifications;
using OnrightDigital.Api.Services;

namespace OnrightDigital.Api.Endpoints;

public static class ContactEndpoints
{
    /// <summary>Rate-limit policy name; configured in Program.cs.</summary>
    public const string RateLimitPolicy = "contact-form";

    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost("/", async (
                ContactRequest request,
                IContactStore store,
                NotificationQueue notifications,
                ILoggerFactory loggerFactory,
                CancellationToken cancellationToken) =>
            {
                // Honeypot filled in → almost certainly a bot. Pretend it worked so the bot
                // moves on, but store nothing and notify no one.
                if (!string.IsNullOrWhiteSpace(request.Website))
                {
                    loggerFactory.CreateLogger("OnrightDigital.Api.Contact")
                        .LogInformation("Honeypot triggered; submission discarded");
                    return Results.Ok(new ContactResponse(ContactMessage.NewReferenceId()));
                }

                if (!TryValidate(request, out var errors))
                {
                    return Results.ValidationProblem(errors);
                }

                var saved = await store.SaveAsync(request, cancellationToken);
                notifications.Enqueue(saved);

                return Results.Ok(new ContactResponse(saved.ReferenceId));
            })
            .RequireRateLimiting(RateLimitPolicy)
            .WithName("SubmitContact")
            .WithSummary("Receives an enquiry from the website contact form.")
            .Produces<ContactResponse>()
            .ProducesValidationProblem()
            .Produces(StatusCodes.Status429TooManyRequests);

        return routes;
    }

    /// <summary>
    /// Runs the DataAnnotations attributes on <see cref="ContactRequest"/> and shapes any
    /// failures into the field-keyed dictionary the React form knows how to display.
    /// </summary>
    private static bool TryValidate(ContactRequest request, out Dictionary<string, string[]> errors)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(request);
        var isValid = Validator.TryValidateObject(request, context, results, validateAllProperties: true);

        errors = results
            .SelectMany(result => result.MemberNames.DefaultIfEmpty(string.Empty)
                .Select(member => (Member: member, result.ErrorMessage)))
            .GroupBy(entry => entry.Member)
            .ToDictionary(
                group => group.Key,
                group => group
                    .Select(entry => entry.ErrorMessage ?? "Ongeldige waarde.")
                    .Distinct()
                    .ToArray());

        return isValid;
    }
}
