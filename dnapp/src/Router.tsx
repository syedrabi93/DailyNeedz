import React from 'react';
import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator,
	createDrawerNavigator,
} from 'react-navigation';

import { HeaderRightComponent } from './components/HeaderComponents';
import { DrawerComponent } from './components';
import { PRIMARY_COLOR } from './constants';
import { HomeScreen, CartScreen, SearchScreen, AccountScreen, CategoryListScreen, AccountEditScreen, PasswordChangeScreen, HelpScreen, SearchResultScreen, InitialScreen, OrderListScreen } from './screens';
import ProductScreen from './screens/ProductScreen2';
import SearchAddressScreen from './newScreens/SearchAddressScreen/SearchAddressScreen';

const AuthStack = createStackNavigator(
	{
		Initial: InitialScreen,
	},
	{
		navigationOptions: {
			header: null,
			swipeEnabled: false,
			drawerLockMode: "locked-closed"
		},
	}
);


const MainStack = createStackNavigator(
	{
		Home: HomeScreen, // List of Products
		Product: ProductScreen, // Product Screen
		Cart: CartScreen, // cart items

		Account: AccountScreen, // Account Screen Change password
	
		AccountEdit: AccountEditScreen, //  It is change
		PasswordChange: PasswordChangeScreen, // Password
		Help: HelpScreen, // Includes
		AddressSearch: SearchAddressScreen, // Addresses
		Orders: OrderListScreen // My orders 
		// Payment it opens browser window . Card Details.
	},
	{
		defaultNavigationOptions: () => ({
			headerStyle: {
				backgroundColor: PRIMARY_COLOR,
				elevation: 0,
				paddingTop: 40,
				shadowRadius: 0,
				height: 80,
				shadowOpacity: 0,
				borderBottomWidth: 0
			},
			
			headerTitleStyle: { color: '#fff', fontFamily: 'opr', fontWeight: 'normal' },
			headerBackTitle: null,
			headerTintColor: '#fff',
			headerRight: <HeaderRightComponent />,
		}),
	}
);

const DrawerStack = createDrawerNavigator(
	{
		Drawer: MainStack,
		LoginModal: AuthStack
	},
	{
		contentComponent: DrawerComponent,
	}
);


const AppNavigator = createSwitchNavigator(
	{
		Login: AuthStack,
		Main: DrawerStack,
	},
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
