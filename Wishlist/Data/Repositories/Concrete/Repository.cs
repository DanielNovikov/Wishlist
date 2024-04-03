using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models.Base;
using Wishlist.Data.Repositories.Abstract;

namespace Wishlist.Data.Repositories.Concrete;

public class Repository<T>(ApplicationDbContext context) : IRepository<T> where T : EntityBase
{
    public async Task<TQueryResult> Query<TQueryResult>(Func<IQueryable<T>, Task<TQueryResult>> query, CancellationToken cancellationToken = default)
    {
        return await query(context.Set<T>().AsNoTracking());
    }

    public async Task<TQueryResult> QueryTracking<TQueryResult>(Func<DbSet<T>, Task<TQueryResult>> query, CancellationToken cancellationToken = default)
    {
        return await query(context.Set<T>());
    }

    public virtual async Task<T?> GetById(int id, CancellationToken cancellationToken = default)
    {   
        return await QueryTracking(async set => await set.FindAsync(id, cancellationToken), cancellationToken);
    }

    public virtual async Task<List<T>> GetAll(CancellationToken cancellationToken = default)
    {
        return await Query(async set => await set.ToListAsync(cancellationToken), cancellationToken);
    }

    public virtual async Task Add(T entity, CancellationToken cancellationToken = default)
    {
        await context.Set<T>().AddAsync(entity, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task AddRange(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    {
        await context.Set<T>().AddRangeAsync(entities, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task Update(T entity, CancellationToken cancellationToken = default)
    {
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateRange(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    {
        context.Set<T>().UpdateRange(entities);
        await context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task Delete(T entity, CancellationToken cancellationToken = default)
    {
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteRange(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    {
        context.Set<T>().RemoveRange(entities);
        await context.SaveChangesAsync(cancellationToken);
    }
}