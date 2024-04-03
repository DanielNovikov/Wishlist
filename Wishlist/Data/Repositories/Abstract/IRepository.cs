using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Repositories.Abstract;

public interface IRepository<T> where T : EntityBase
{
    Task<TQueryResult> Query<TQueryResult>(Func<IQueryable<T>, Task<TQueryResult>> query, CancellationToken cancellationToken = default);

    Task<TQueryResult> QueryTracking<TQueryResult>(Func<DbSet<T>, Task<TQueryResult>> query, CancellationToken cancellationToken = default);
    
    Task<T?> GetById(int id, CancellationToken cancellationToken = default);

    Task<List<T>> GetAll(CancellationToken cancellationToken = default);

    Task Add(T entity, CancellationToken cancellationToken = default);
    
    Task AddRange(IEnumerable<T> entities, CancellationToken cancellationToken = default);

    Task Update(T entity, CancellationToken cancellationToken = default);
    
    Task UpdateRange(IEnumerable<T> entities, CancellationToken cancellationToken = default);

    Task Delete(T entity, CancellationToken cancellationToken = default);
    
    Task DeleteRange(IEnumerable<T> entities, CancellationToken cancellationToken = default);
}