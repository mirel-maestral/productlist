using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductList.Repositories
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
         
        Task<T> GetAsync(int id);

        Task SaveAsync(T entity);

        Task DeleteAsync(int id);

        Task Update(int id, T entity);
    }
}
