using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Services;

/// <summary>Supplies the list of services the site advertises.</summary>
public interface IServiceCatalog
{
    IReadOnlyList<ServiceItem> GetAll();
}
