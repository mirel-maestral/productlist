using System;

namespace ProductList.Business.Model
{
    public class ProductViewModel
    {
        public int Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

      
        public string Category
        {
            get;
            set;
        }

        public bool Active
        {
            get;
            set;
        }
        public decimal Price
        {
            get;
            set;
        }
    }
}
