import { Status } from '../../../utils/constants';

export const getAllProductsRequest = state => state.allProducts.state === Status.PENDING;
export const getAllProductsSuccess = state => state.allProducts.data;
export const getAllProductsFail = state => state.allProducts.state === Status.FAIL;
