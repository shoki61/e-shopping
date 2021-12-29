import { Product } from 'models';
import * as types from '../actionTypes';

type ProductReducer = {
  productDetail: null | Product;
  mainCategoryProducts: null | Product[];
  categoryProducts: null | Product[];
  subCategoryProducts: null | Product[];
  similarProducts: null | Product[];
};

const initialState: ProductReducer = {
  productDetail: null,
  mainCategoryProducts: null,
  categoryProducts: null,
  subCategoryProducts: null,
  similarProducts: null,
};

export const product = (state = initialState, { type, payload }: any): ProductReducer => {
  switch (type) {
    case types.SET_PRODUCT_DETAIL:
      return { ...state, productDetail: payload };

    case types.SET_MAIN_CATEGORY_PRODUCTS:
      return { ...state, mainCategoryProducts: payload };

    case types.SET_CATEGORY_PRODUCTS:
      return { ...state, categoryProducts: payload };

    case types.SET_SUB_CATEGORY_PRODUCTS:
      return { ...state, subCategoryProducts: payload };

    case types.SET_SIMILAR_PRODUCT_PRODUCTS:
      return { ...state, similarProducts: payload };

    default:
      return state;
  }
};
