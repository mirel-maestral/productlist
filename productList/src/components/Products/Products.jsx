import React, { Component } from 'react';
import { Table, Alert } from 'reactstrap';

class Products extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    console.log(this.props);
    const { productsPending, products, productsFail, goToSingleProduct } = this.props;
    if (productsPending) {
      return 'Loader';
    }
    if (productsFail || !products) {
      return 'Products could not be fetched';
    }

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Active</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index} onClick={() => goToSingleProduct(item.id)}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.active ? 'True' : 'False'}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Products;
