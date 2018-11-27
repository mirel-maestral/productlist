import { handleActions } from 'redux-actions';
import { Status } from '../../../utils/constants';

import { EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_INIT } from './constants';

export const initialState = {
  data: null,
  state: Status.INIT,
  error: null
};

export default handleActions(
  {
    [EDIT_PRODUCT_REQUEST]: state => {
      return {
        ...state,
        data: null,
        state: Status.PENDING,
        error: null
      };
    },
    [EDIT_PRODUCT_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        state: Status.DONE,
        error: null
      };
    },
    [EDIT_PRODUCT_FAIL]: (state, action) => {
      return {
        ...state,
        data: null,
        state: Status.FAIL,
        error: action.payload
      };
    },
    [EDIT_PRODUCT_INIT]: state => {
      return {
        ...state,
        data: null,
        state: Status.INIT,
        error: null
      };
    },
  },
  initialState
);
