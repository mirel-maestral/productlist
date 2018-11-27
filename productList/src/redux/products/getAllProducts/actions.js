import { createAction } from 'redux-actions';
import { getAllProducts as getAll } from '../../../services/ProductService';

import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL
} from './constants';

const request = createAction(GET_ALL_PRODUCTS_REQUEST);
const success = createAction(GET_ALL_PRODUCTS_SUCCESS);
const fail = createAction(GET_ALL_PRODUCTS_FAIL);

export const getAllProducts = () => async dispatch => {
  dispatch(request());
  getAll()
    .then(response => {
      dispatch(success(response));
    })
    .catch(error => {
      dispatch(fail(error));
    });
};