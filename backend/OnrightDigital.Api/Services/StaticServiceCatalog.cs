using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Services;

/// <summary>
/// Hard-coded catalogue. This is the seam where a database would go later:
/// swap this registration for an EF Core-backed catalogue and nothing else changes.
/// </summary>
public sealed class StaticServiceCatalog : IServiceCatalog
{
    private static readonly IReadOnlyList<ServiceItem> Items =
    [
        new(
            "websites",
            "Business websites",
            "Marketing sites that load fast, read well on a phone and are easy for you to update.",
            ["Responsive design", "SEO fundamentals", "Content management"],
            "code"),
        new(
            "web-apps",
            "Custom web applications",
            "Dashboards, booking systems, portals — software shaped around how your business actually works.",
            ["React front ends", "C# / .NET back ends", "Role-based access"],
            "gauge"),
        new(
            "ecommerce",
            "E-commerce",
            "Online stores with a checkout that converts and an admin you can run without a developer.",
            ["Payment integration", "Inventory & orders", "Analytics setup"],
            "cart"),
        new(
            "mobile",
            "Mobile apps",
            "Cross-platform apps for iOS and Android that share one codebase and one design language.",
            ["iOS & Android", "Offline-friendly", "App store releases"],
            "mobile"),
        new(
            "apis",
            "APIs & integrations",
            "The plumbing between your systems: clean APIs, third-party integrations and data that stays in sync.",
            ["REST APIs", "Third-party integrations", "Database design"],
            "server"),
        new(
            "care",
            "Support & maintenance",
            "We stay on after launch — updates, monitoring, fixes and the small improvements that add up.",
            ["Hosting & deployment", "Security updates", "Ongoing improvements"],
            "wrench"),
    ];

    public IReadOnlyList<ServiceItem> GetAll() => Items;
}
