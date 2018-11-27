using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductList.Business.Model;
using ProductList.Models;

namespace ProductList.Business.Services
{
    public interface IProductService
    {
        Task<List<ProductViewModel>> GetProductsAsync();

        Task<ProductViewModel> GetProductByIdAsync(int id);

        Task DeleteProductByIdAsync(int id);

        Task UpdateProductAsync(ProductViewModel product, int id);

        Task AddProductAsync(Product product);
    }
}
