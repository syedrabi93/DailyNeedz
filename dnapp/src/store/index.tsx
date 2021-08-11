import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { incDecActions } from '../actions';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';

const addToCartMiddleware = (store: any) => (next: any) => (action: any) => {
	if (action.type === ADD_TO_CART) {
		store.dispatch(incDecActions.incrementCartItem(action.payload.productId));
	}
	if (action.type === REMOVE_FROM_CART) {
		store.dispatch(incDecActions.decrementCartItem(action.payload.productId));
	}
	return next(action);
};

export default createStore(rootReducer, applyMiddleware(thunk, addToCartMiddleware));
