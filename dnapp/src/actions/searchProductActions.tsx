import { SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAIL, SEARCH_PRODUCTS } from './types';
import { ProductList } from '../types';
import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { dnapi } from '../axios';
import { forEach } from 'lodash';

export const searchProductsAsync = (query: string, filters: string[], categoryId: string| null) => async (
   dispatch: Dispatch
) => {
   dispatch(searchProducts(query, filters));
   try {
      let result;
      if (!query && categoryId) {
         result = await dnapi.get('/products?categories=' + categoryId);
      } else {
         result = await dnapi.get('/products?search=' + query + '&per_page=10');
      }
      const { data } = result;
      let products: ProductList = {};
      forEach(data, product => {
         products[product.id] = product.acf;
         products[product.id].product_count = 0;
      });

      dispatch(searchProductsSuccess(products));
   } catch (e) {
      dispatch(searchProductsFail('Network Error'));
   }
};

export const searchProducts = (query: string, filters: string[]) =>
   action(SEARCH_PRODUCTS, { query, filters });

export const searchProductsSuccess = (products: ProductList) =>
   action(SEARCH_PRODUCTS_SUCCESS, { products });

export const searchProductsFail = (msg: string) => action(SEARCH_PRODUCTS_FAIL, msg);
