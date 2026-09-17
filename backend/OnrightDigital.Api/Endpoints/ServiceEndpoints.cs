using OnrightDigital.Api.Models;
using OnrightDigital.Api.Services;

namespace OnrightDigital.Api.Endpoints;

public static class ServiceEndpoints
{
    public static IEndpointRouteBuilder MapServiceEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/services").WithTags("Services");

        group.MapGet("/", (IServiceCatalog catalog) => Results.Ok(catalog.GetAll()))
            .WithName("GetServices")
            .WithSummary("Lists the services shown on the website.")
            .Produces<IReadOnlyList<ServiceItem>>();

        group.MapGet("/{id}", (string id, IServiceCatalog catalog) =>
            {
                var item = catalog.GetAll()
                    .FirstOrDefault(s => string.Equals(s.Id, id, StringComparison.OrdinalIgnoreCase));

                return item is null ? Results.NotFound() : Results.Ok(item);
            })
            .WithName("GetServiceById")
            .WithSummary("Gets a single service by its slug.")
            .Produces<ServiceItem>()
            .Produces(StatusCodes.Status404NotFound);

        return routes;
    }
}
