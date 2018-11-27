using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductList.Models;
using ProductList.Repositories;
using System.Linq;
using ProductList.Business.Model;

namespace ProductList.Business.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        public Task AddProductAsync(Product product)
        {
            return _productRepository.SaveAsync(product);
        }

        public Task DeleteProductByIdAsync(int id)
        {
            return _productRepository.DeleteAsync(id);
        }

        public async Task<ProductViewModel> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetProductById(id);
            if (product == null)
                throw new ApplicationException($"Product with ID:{id} does not exist");

            var category = await _categoryRepository.GetCategoryById(product.CategoryId);
            if (category == null)
                throw new ApplicationException($"Category with ID:{product.CategoryId} does not exist");

            return new ProductViewModel()
            {
                Id = product.Id,
                Name = product.Name,
                Category = category.Name,
                Active = product.Active,
                Price = product.Price
            };
        }

        public async Task<List<ProductViewModel>> GetProductsAsync()
        {
            var list  = await _productRepository.GetProducts();
            return list.Select(a => new ProductViewModel
             {
                 Id = a.Id,
                 Name = a.Name,
                 Category = a.Category.Name,
                 Active = a.Active,
                 Price = a.Price
             }).ToList();
        }

        public async Task UpdateProductAsync(ProductViewModel productModel, int id)
        {
            var product = await _productRepository.GetProductById(id);
            if (product == null)
                throw new ApplicationException($"Product with ID:{id} does not exist");

            var category = await _categoryRepository.GetCategoryByName(productModel.Category);
            if (category == null)
                throw new ApplicationException($"Category with Name:{productModel.Category} does not exist");

            product.Active = productModel.Active;
            product.Price = productModel.Price;
            product.CategoryId = category.Id;
            product.Name = productModel.Name;
            
            await _productRepository.Update(product.Id, product);
        }
    }
}
