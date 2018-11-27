import Products from './Products';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getAllProducts } from '../../redux/products/getAllProducts/actions';
import {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail
} from '../../redux/products/getAllProducts/selectors';

const mapStateToProps = state => {
  return {
    productsPending: getAllProductsRequest(state),
    products: getAllProductsSuccess(state),
    productsFail: getAllProductsFail(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      return dispatch(getAllProducts());
    },
    goToSingleProduct: id => {
      dispatch(push(`${id}`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
