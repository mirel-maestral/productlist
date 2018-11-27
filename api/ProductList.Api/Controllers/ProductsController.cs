using System;
using System.Threading.Tasks;
using log4net;
using Microsoft.AspNetCore.Mvc;
using ProductList.Business.Model;
using ProductList.Business.Services;
using ProductList.Models;

namespace ProductList.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController: Controller
    {
        private readonly IProductService _productService;
        private ILog _log;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
            _log = LogManager.GetLogger(typeof(ProductsController));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _log.Info($"Getting product wuth ID:{id}");
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound($"Product  wtih id:{id} doesn't exist.");

            return Ok(product);
        }


        [HttpGet("")]
        public async Task<IActionResult> GetAll()
        {
            _log.Info($"Getting products..");
            var products = await _productService.GetProductsAsync();

            return Ok(products);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] ProductViewModel model, int id)
        {
            if (model == null)
                return BadRequest("Product is null");
                
            _log.Info($"Updating product ID:{model.Id}");
            await _productService.UpdateProductAsync(model, id);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Product product)
        {
            if (product == null)
                return BadRequest("Product is null");

            _log.Info($"Saving product ID:{product.Id}");
            await _productService.AddProductAsync(product);

            return Ok();
        }
    }
}
