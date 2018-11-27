import { Status } from '../../../utils/constants';

export const getSingleProductRequest = state => state.singleProduct.state === Status.PENDING;
export const getSingleProductSuccess = state => state.singleProduct.data;
export const getSingleProductFail = state => state.singleProduct.state === Status.FAIL;
