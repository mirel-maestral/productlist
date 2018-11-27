using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ProductList.Repositories.EF;
using Microsoft.EntityFrameworkCore;
using ProductList.Models;
using ProductList.Repositories;
using System.Net;
using Microsoft.AspNetCore.Http;
using ProductList.Business.Services;
using Microsoft.AspNetCore.Diagnostics;
using log4net;

namespace ProductList.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApiDbContext>(opt => opt.UseInMemoryDatabase("MyDatabase"), ServiceLifetime.Scoped);
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductService, ProductService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //Configure log4net
            loggerFactory.AddLog4Net(Configuration.GetValue<string>("Log4NetConfigFile:Name"));

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Enable CORS 
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            // On any unhandled exception run middleware
            app.UseExceptionHandler(x =>
            {
                x.Run( async (ctx) =>
                {
                    var log = loggerFactory.CreateLogger<Startup>();

                    //Get error and log it
                    var exceptionData = ctx.Features.Get<IExceptionHandlerFeature>();
                    log.LogError("Unhandled exception occured:", exceptionData.Error);

                    //Wrap error text msg into response body and  503 Status code
                    ctx.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    ctx.Response.ContentType = "application/json";
                    await ctx.Response.WriteAsync(exceptionData.Error.Message).ConfigureAwait(false);
                });
            });


            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var apiDbContext = serviceScope.ServiceProvider.GetService<ApiDbContext>();
                SeedTestData(apiDbContext);
            }
            
            app.UseHttpsRedirection();
            app.UseMvc();
        }

        private static void SeedTestData(ApiDbContext context)
        {

            var testProduct1 = new Product
            {
                Id = 1,
                Name = "Coca Cola",
                Active = true,
                CategoryId = 1,
                Price = 12.34M
            };

            context.Products.Add(testProduct1);

            var testProduct2 = new Product
            {
                Id = 2,
                Name = "Nesletters",
                Active = false,
                CategoryId = 2,
                Price = 1.12M
            };

            context.Products.Add(testProduct2);

            var testProduct3 = new Product
            {
                Id = 3,
                Name = "Book",
                Active = true,
                CategoryId = 2,
                Price = 34.10M
            };

            context.Products.Add(testProduct3);

            var cat1 = new Category()
            {
                Id = 1,
                Name = "Food"
            };

            context.Categories.Add(cat1);

            var cat2 = new Category()
            {
                Id = 2,
                Name = "Other"
            };

            context.Categories.Add(cat2);

            context.SaveChanges();
        }
    }
}
