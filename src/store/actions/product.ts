import { Dispatch } from 'redux';

import * as types from '../actionTypes';
import { Request } from '../../Request';

export const getProductDetail =
  (productId: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.get(`/product/product_detail/${productId}`);
    if ((res as any).data) {
      console.log((res as any).data);
      dispatch({ type: types.SET_PRODUCT_DETAIL, payload: (res as any).data });
    }
    callback(res);
  };

export const getMainCategoryProducts =
  (mainCategory: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.get(`/product/main_category/${mainCategory}`);
    if ((res as any).data) {
      dispatch({ type: types.SET_PRODUCTS, payload: (res as any).data });
    }
    callback(res);
  };

export const getCategoryProducts =
  (mainCategory: string, category: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.get(`/product/${mainCategory}/${category}`);
    if ((res as any).data) {
      dispatch({ type: types.SET_PRODUCTS, payload: (res as any).data });
    }
    callback(res);
  };

export const getSubCategoryProducts =
  (mainCategory: string, category: string, subCategory: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.get(`/product/${mainCategory}/${category}/${subCategory}`);
    if ((res as any).data) {
      dispatch({ type: types.SET_PRODUCTS, payload: (res as any).data });
    }
    callback(res);
  };
