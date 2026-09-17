namespace OnrightDigital.Api.Models;

/// <summary>A service shown in the "What we do" section of the site.</summary>
/// <param name="Id">Stable slug, e.g. "web-apps".</param>
/// <param name="Title">Display name.</param>
/// <param name="Description">One or two sentences of plain-language explanation.</param>
/// <param name="Points">Short bullets naming what is actually delivered.</param>
/// <param name="Icon">Icon key the React front end knows how to draw.</param>
public sealed record ServiceItem(
    string Id,
    string Title,
    string Description,
    IReadOnlyList<string> Points,
    string Icon);
