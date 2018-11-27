using System;
using System.Threading.Tasks;
using ProductList.Models;

namespace ProductList.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> GetCategoryById(int id);

        Task<Category> GetCategoryByName(string name);
    }
}
