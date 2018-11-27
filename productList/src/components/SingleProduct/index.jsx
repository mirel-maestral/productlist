import SingleProduct from './SingleProduct';
import { connect } from 'react-redux';
import { getSingleProduct } from '../../redux/products/getSingleProduct/actions';
import {
  getSingleProductRequest,
  getSingleProductSuccess,
  getSingleProductFail
} from '../../redux/products/getSingleProduct/selectors';
import { editProduct, init } from '../../redux/products/editProduct/actions';
import { editProductSuccess, editProductFail } from '../../redux/products/editProduct/selectors';

const mapStateToProps = state => {
  return {
    productPending: getSingleProductRequest(state),
    initialValues: getSingleProductSuccess(state),
    productFail: getSingleProductFail(state),
    editSuccess: editProductSuccess(state),
    editFail: editProductFail(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => {
      return dispatch(getSingleProduct(id));
    },
    editProduct: (id, data) => {
      return dispatch(editProduct(id, data));
    },
    editToInit: () => {
      dispatch(init())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
