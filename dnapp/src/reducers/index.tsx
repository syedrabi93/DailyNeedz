import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import { Store } from '../types';
import { spinnerReducer } from '../newScreens/Spinner/spinnerReducer/spinnerReducer';

export default combineReducers<Store>({
	user: authReducer,
	products: productsReducer,
	cart: cartReducer,
	selectedAddress: () => 0,
	loader: spinnerReducer
});
