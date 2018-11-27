import { handleActions } from 'redux-actions';
import { Status } from '../../../utils/constants';

import { GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL } from './constants';

export const initialState = {
  data: null,
  state: Status.INIT,
  error: null
};

export default handleActions(
  {
    [GET_ALL_PRODUCTS_REQUEST]: state => {
      return {
        ...state,
        data: null,
        state: Status.PENDING,
        error: null
      };
    },
    [GET_ALL_PRODUCTS_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        state: Status.DONE,
        error: null
      };
    },
    [GET_ALL_PRODUCTS_FAIL]: (state, action) => {
      return {
        ...state,
        data: null,
        state: Status.FAIL,
        error: action.payload
      };
    }
  },
  initialState
);
