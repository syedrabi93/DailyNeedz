import { Dispatch } from 'redux';
import _ from 'lodash';
import { dnapi } from '../axios';
import { Product, ProductList } from '../types';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS } from './types';
import { action } from 'typesafe-actions';

export function fetchProductsAsync(limit: number = 10) {

   return async function(dispatch: Dispatch) {
      dispatch(fetchProducts());
      try {
         const { data } = await dnapi.get('/products?_limit='+ limit);
         //convert data to an array
         let products: ProductList = {};
         _.forEach(data, (product: Product) => {
            if(product.product_image){
               product.product_image.url = `${dnapi.defaults.baseURL}${product.product_image.url}`.replace(new RegExp('//', 'g'), '/');
               products[product.id] = product;
               products[product.id].product_count = 0;
            }
         });
         dispatch(fetchProductSuccess(products));
      } catch (e) {
         dispatch(fetchProductsFail('Network Error'));
      }
   };
}

export const fetchProducts = () => action(FETCH_PRODUCTS);

export const fetchProductSuccess = (products: ProductList) =>
   action(FETCH_PRODUCTS_SUCCESS, { products });

export const fetchProductsFail = (msg: string) => action(FETCH_PRODUCTS_FAIL, { msg });
