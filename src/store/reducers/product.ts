import { Product } from 'models';
import * as types from '../actionTypes';

type ProductReducer = {
  productDetail: null | Product;
  products: null | Product[];
  similarProducts: null | Product[];
};

const initialState: ProductReducer = {
  productDetail: null,
  products: null,
  similarProducts: null,
};

export const product = (state = initialState, { type, payload }: any): ProductReducer => {
  switch (type) {
    case types.SET_PRODUCT_DETAIL:
      return { ...state, productDetail: payload.product, similarProducts: payload.similarProducts };

    case types.SET_PRODUCTS:
      return { ...state, products: payload.products, similarProducts: payload.similarProducts };

    default:
      return state;
  }
};
