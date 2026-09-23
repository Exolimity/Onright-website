using Microsoft.AspNetCore.Diagnostics;
using OnrightDigital.Api.Endpoints;
using OnrightDigital.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "OnrightFrontend";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();

// The React dev server runs on a different port, so it needs an explicit CORS grant.
// Allowed origins live in appsettings.json — add your production domain there at deploy time.
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? ["http://localhost:5173"];

        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Application services. Both are stateless or internally synchronised, so singletons are fine.
builder.Services.AddSingleton<IServiceCatalog, StaticServiceCatalog>();
builder.Services.AddSingleton<IContactStore, JsonFileContactStore>();

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
    errorApp.Run(context =>
    {
        var error = context.Features.Get<IExceptionHandlerFeature>()?.Error;

        // Malformed request bodies surface as BadHttpRequestException carrying a 4xx
        // status. That is the client's mistake, so report it as such rather than a 500.
        var result = error is BadHttpRequestException badRequest
            ? Results.Problem(
                title: "The request could not be read.",
                detail: "Check that the body is valid JSON.",
                statusCode: badRequest.StatusCode)
            : Results.Problem("An unexpected error occurred. Please try again.");

        return result.ExecuteAsync(context);
    }));

if (app.Environment.IsDevelopment())
{
    // Interactive API docs at http://localhost:5080/swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseCors(CorsPolicyName);

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", timeUtc = DateTimeOffset.UtcNow }))
    .WithTags("Health")
    .WithSummary("Liveness check used by deployment tooling.");

app.MapServiceEndpoints();
app.MapContactEndpoints();

app.Run();
