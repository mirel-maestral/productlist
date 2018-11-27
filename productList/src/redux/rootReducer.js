import { combineReducers } from 'redux';

//routing reducer
import { routerReducer as routing } from 'react-router-redux';

//redux form reducer
import { reducer as formReducer } from 'redux-form';

//mine reducers
import allProducts from './products/getAllProducts/reducer';
import singleProduct from './products/getSingleProduct/reducer';
import editProduct from './products/editProduct/reducer';

export default combineReducers({
  routing,
  form: formReducer,
  allProducts,
  singleProduct,
  editProduct
});
