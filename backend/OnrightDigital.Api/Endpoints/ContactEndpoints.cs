using System.ComponentModel.DataAnnotations;
using OnrightDigital.Api.Models;
using OnrightDigital.Api.Services;

namespace OnrightDigital.Api.Endpoints;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost("/", async (
                ContactRequest request,
                IContactStore store,
                CancellationToken cancellationToken) =>
            {
                if (!TryValidate(request, out var errors))
                {
                    return Results.ValidationProblem(errors);
                }

                var saved = await store.SaveAsync(request, cancellationToken);

                return Results.Ok(new ContactResponse(
                    saved.ReferenceId,
                    "Thanks for getting in touch — we will reply within two business days."));
            })
            .WithName("SubmitContact")
            .WithSummary("Receives an enquiry from the website contact form.")
            .Produces<ContactResponse>()
            .ProducesValidationProblem();

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
                    .Select(entry => entry.ErrorMessage ?? "Invalid value.")
                    .Distinct()
                    .ToArray());

        return isValid;
    }
}
