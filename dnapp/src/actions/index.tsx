import * as authActions from './authActions';
import * as fetchProductActions from './fetchProductActions';
import * as cartActions from './addToCartActions';
import * as searchActions from './searchProductActions';
import * as homeListActions from './homeListActions';
import * as incDecActions from './incrementDecActions';
import * as algoliaSearchActions from './algoliaSearchActions';
import { ActionType } from 'typesafe-actions';

export type CartActions = ActionType<typeof cartActions>;
export type AuthActions = ActionType<typeof authActions>;
export type FetchProductActions = ActionType<typeof fetchProductActions>;
export type SearchActions = ActionType<typeof searchActions>;
export type HomeListActions = ActionType<typeof homeListActions>;
export type IncDecActions = ActionType<typeof incDecActions>;
export type AlgoliaSearchActions = ActionType<typeof algoliaSearchActions>;

export {
   cartActions,
   fetchProductActions,
   authActions,
   searchActions,
   homeListActions,
   incDecActions,
   algoliaSearchActions,
};
