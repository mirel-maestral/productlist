using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductList.Models;
using ProductList.Repositories.EF;

namespace ProductList.Repositories
{
    public class ProductRepository: Repository<Product>, IProductRepository
    {
        private ApiDbContext _dbContext;

        public ProductRepository(ApiDbContext dbContext):
            base(dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Product> GetProductById(int id)
        {
            return base.GetAsync(id);
        }

        public Task<List<Product>> GetProducts()
        {
            return _dbContext.Products.
                             Include("Category").ToListAsync();
        }
    }
}
