import { action } from 'typesafe-actions';
import { INCREMENT_COUNT, DECREMENT_COUNT } from './types';
export const incrementCartItem = (productId: string) => action(INCREMENT_COUNT, { productId });
export const decrementCartItem = (productId: string) => action(DECREMENT_COUNT, { productId });
