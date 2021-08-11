import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

import { action } from 'typesafe-actions';

export const addToCart = (productId: string) => action(ADD_TO_CART, { productId });

export const removeFromCart = (productId: string) => action(REMOVE_FROM_CART, { productId });


export const emptyCart = (produceIds: string[]) => action("EMPTY_CART", { produceIds });