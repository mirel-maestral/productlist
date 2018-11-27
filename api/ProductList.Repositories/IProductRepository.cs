using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductList.Models;

namespace ProductList.Repositories
{
    public interface IProductRepository: IRepository<Product>
    {
        Task<Product> GetProductById(int id);

        Task<List<Product>> GetProducts();
    }
}
