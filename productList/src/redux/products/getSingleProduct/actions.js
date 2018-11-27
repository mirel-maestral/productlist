import { createAction } from 'redux-actions';
import { getSingleProduct as get } from '../../../services/ProductService';

import {
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL
} from './constants';

const request = createAction(GET_SINGLE_PRODUCT_REQUEST);
const success = createAction(GET_SINGLE_PRODUCT_SUCCESS);
const fail = createAction(GET_SINGLE_PRODUCT_FAIL);

export const getSingleProduct = (id) => async dispatch => {
  dispatch(request());
  get(id)
    .then(response => {
      dispatch(success(response));
    })
    .catch(error => {
      dispatch(fail(error));
    });
};