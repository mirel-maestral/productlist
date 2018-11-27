using System;

namespace ProductList.Models
{
    public class Product: BaseEntity
    {
        public override int Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

        public int CategoryId
        {
            get;
            set;
        }

        public Category Category
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
