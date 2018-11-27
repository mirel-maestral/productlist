using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductList.Models;
using ProductList.Repositories.EF;

namespace ProductList.Repositories
{
    public class Repository<TEntity>: IRepository<TEntity>
        where TEntity: BaseEntity
    {
        private ApiDbContext _dbContext;
        public Repository(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetAsync(id);
            _dbContext.Set<TEntity>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsQueryable();
        }

        public async Task<TEntity> GetAsync(int id)
        {
            return await _dbContext.Set<TEntity>()
                                   .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task SaveAsync(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(int id, TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
