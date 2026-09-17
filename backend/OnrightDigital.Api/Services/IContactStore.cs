using OnrightDigital.Api.Models;

namespace OnrightDigital.Api.Services;

/// <summary>Persists contact enquiries.</summary>
public interface IContactStore
{
    Task<ContactMessage> SaveAsync(ContactRequest request, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ContactMessage>> GetAllAsync(CancellationToken cancellationToken = default);
}
