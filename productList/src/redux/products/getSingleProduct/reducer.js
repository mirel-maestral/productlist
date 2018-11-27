import { handleActions } from 'redux-actions';
import { Status } from '../../../utils/constants';

import { GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAIL } from './constants';

export const initialState = {
  data: null,
  state: Status.INIT,
  error: null
};

export default handleActions(
  {
    [GET_SINGLE_PRODUCT_REQUEST]: state => {
      return {
        ...state,
        data: null,
        state: Status.PENDING,
        error: null
      };
    },
    [GET_SINGLE_PRODUCT_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        state: Status.DONE,
        error: null
      };
    },
    [GET_SINGLE_PRODUCT_FAIL]: (state, action) => {
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
