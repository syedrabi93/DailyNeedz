import { Store } from '../types/StoreState';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';
import { CartActions } from '../actions';
import { Reducer } from 'redux';
import produce from 'immer';

const INITIAL_CART_STATE: Store['cart'] = { list: [] };

const cartReducer: Reducer<Store['cart'], CartActions> = (
	state = INITIAL_CART_STATE,
	action: CartActions
) => {
	switch (action.type) {
		case ADD_TO_CART:
			if (state.list.indexOf(action.payload.productId) === -1) {
				const newState = { list: [...state.list, action.payload.productId] };
				return newState;
			} else {
				return state;
			}
		case REMOVE_FROM_CART:
			if (state.list.indexOf(action.payload.productId) === -1) {
				return state;
			} else {
				const newState = { list: [...state.list] };
				newState.list.splice(state.list.indexOf(action.payload.productId), 1);
				return newState;
			}
		case "EMPTY_CART": {
			const newState = produce(state, draft => {
				draft.list = [];
			});
			return newState;
		}
	}
	return state;
};

export default cartReducer;
