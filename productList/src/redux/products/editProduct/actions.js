import { createAction } from 'redux-actions';
import { editProduct as patch } from '../../../services/ProductService';

import { EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_INIT } from './constants';

const request = createAction(EDIT_PRODUCT_REQUEST);
const success = createAction(EDIT_PRODUCT_SUCCESS);
const fail = createAction(EDIT_PRODUCT_FAIL);

export const init = createAction(EDIT_PRODUCT_INIT);

export const editProduct = (id, data) => async dispatch => {
  dispatch(request());
  patch(id, data)
    .then(response => {
      dispatch(success(response));
    })
    .catch(error => {
      dispatch(fail(error));
    });
};
