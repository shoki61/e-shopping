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
      return { ...state, productDetail: payload };

    case types.SET_PRODUCTS:
      return { ...state, products: payload };

    case types.SET_SIMILAR_PRODUCTS:
      return { ...state, similarProducts: payload };

    default:
      return state;
  }
};
