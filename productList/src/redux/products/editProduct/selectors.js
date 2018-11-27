import { Status } from '../../../utils/constants';

export const editProductRequest = state => state.editProduct.state === Status.PENDING;
export const editProductSuccess = state => state.editProduct.state === Status.DONE;
export const editProductFail = state => state.editProduct.state === Status.FAIL;
