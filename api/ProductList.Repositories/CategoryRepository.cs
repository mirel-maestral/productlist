using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductList.Models;
using ProductList.Repositories.EF;

namespace ProductList.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private ApiDbContext _dbContext;

        public CategoryRepository(ApiDbContext dbContext) :
            base(dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Category> GetCategoryById(int id)
        {
            return base.GetAsync(id);
        }

        public Task<Category> GetCategoryByName(string name)
        {
            return base.GetAll().FirstOrDefaultAsync(cat => cat.Name == name.Trim());
        }
    }
}
