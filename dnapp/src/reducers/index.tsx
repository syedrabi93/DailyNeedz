import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import { Store } from '../types';
import { searchAddressReducer } from '../newScreens/SearchAddressScreen/reducer/searchAddressReducer';
import { addressReducer } from '../newScreens/SearchAddressScreen/reducer/addressReducer';
import { spinnerReducer } from '../newScreens/Spinner/spinnerReducer/spinnerReducer';

export default combineReducers<Store>({
	user: authReducer,
	products: productsReducer,
	cart: cartReducer,
	searchAddresses: searchAddressReducer,
	addresses: addressReducer,
	selectedAddress: () => 0,
	loader: spinnerReducer
});
