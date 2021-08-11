import { Reducer } from 'redux';
import { Store } from '../types/StoreState';
import produce from "immer";
import {
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_FAIL,
   INCREMENT_COUNT,
   DECREMENT_COUNT,
   ADD_SEARCH_SUGGESTIONS,
   SEARCH_PRODUCTS,
   SEARCH_PRODUCTS_SUCCESS,
   SEARCH_PRODUCTS_FAIL,
   FETCH_PRODUCTS,
} from '../actions/types';
import _ from 'lodash';
import {
   FetchProductActions,
   SearchActions,
   HomeListActions,
   IncDecActions,
   AlgoliaSearchActions,
	CartActions,
} from '../actions';

const initialState: Store['products'] = {
   algoliaResults: [],
   fetchProducts: { listById: {} },
   homeList: { list: [], status: 'UNDEFINED' },
   search: { status: 'UNDEFINED', list: [] },
};

const productReducer: Reducer<Store['products']> = (
   state = initialState,
   action:
      | FetchProductActions
      | SearchActions
      | HomeListActions
      | IncDecActions
		| AlgoliaSearchActions
		| CartActions
) => {
   switch (action.type) {
      case FETCH_PRODUCTS: {
         const newState: Store['products'] = {
            ...state,
            homeList: { ...state.homeList, status: 'LOADING' },
         };
         return newState;
      }
      case FETCH_PRODUCTS_SUCCESS: {
         const newState: Store['products'] = { ...state };
         const newProductList = { ...action.payload.products };
         newState['fetchProducts']['listById'] = newProductList;
         const homeList = _.map(newProductList, ({}, key) => {
            return key;
         });
         newState.homeList.list = homeList;
         newState.homeList.status = 'SUCCESS';
         return newState;
      }
      case FETCH_PRODUCTS_FAIL: {
         const newState: Store['products'] = {
            ...state,
            homeList: { ...state.homeList, status: 'FAIL' },
         };
         return newState;
      }
      case INCREMENT_COUNT: {
         const newState = { ...state };
         let newProduct = newState.fetchProducts.listById[action.payload.productId];
         newProduct.product_count += 1;
         newState.fetchProducts.listById[action.payload.productId] = newProduct;
         return newState;
      }
      case DECREMENT_COUNT: {
         const newState = { ...state };
         let newProduct = newState.fetchProducts.listById[action.payload.productId];
         newProduct.product_count -= 1;
         newState.fetchProducts.listById[action.payload.productId] = newProduct;
         return newState;
      }
      case ADD_SEARCH_SUGGESTIONS: {
         const newState = { ...state, algoliaResults: action.payload.suggestions };
         return newState;
      }
      case SEARCH_PRODUCTS: {
         const newState = { ...state };
         newState.search = {
            query: action.payload.query,
            filter: action.payload.filters,
            status: 'LOADING',
            list: [],
         };
         return newState;
      }
      case SEARCH_PRODUCTS_SUCCESS: {
         const newState = { ...state };
         const newProductList = { ...newState.fetchProducts.listById };
         // chech if product already present;
         const searchList = _.map(action.payload.products, (product, key) => {
            if (newProductList[key]) {
               return key;
            }
            newProductList[key] = product;
            return key;
			});
         newState.fetchProducts.listById = newProductList;
         newState.search = { ...newState.search, list: searchList, status: 'SUCCESS' };

         return newState;
      }
      case SEARCH_PRODUCTS_FAIL: {
         const newState: Store['products'] = {
            ...state,
            search: { ...state.search, status: 'FAIL', list: [] },
         };
         return newState;
		}
		case "EMPTY_CART": {
			const {produceIds} = action.payload;
			const newState = produce(state,draft => {
				produceIds.forEach((id) => {
					draft.fetchProducts.listById[id].product_count = 0;
				});
			});
			return newState
		}
   }
   return state;
};

export default productReducer;
