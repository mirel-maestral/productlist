using System;
using System.Collections.Generic;

namespace ProductList.Models
{
    public class Category: BaseEntity
    {
       
        public string Name
        {
            get;
            set;
        }
        public List<Product> Products
        {
            get;
            set;
        }

        public override int Id 
        { 
            get;
            set;
        }
    }
}
