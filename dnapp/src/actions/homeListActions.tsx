import { action } from 'typesafe-actions';
import {
   ADD_TO_HOMELIST,
   REMOVE_FROM_HOMELIST,
   HOME_LIST_FETCH_FAIL,
} from './types';

export const addToHomelist = (productIdList: string[]) =>
   action(ADD_TO_HOMELIST, { productIdList });

export const removeFromHomeList = (productId: string) =>
   action(REMOVE_FROM_HOMELIST, { productId });

export const homeListFetchFail = () => action(HOME_LIST_FETCH_FAIL);

