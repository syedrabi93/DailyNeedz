import React from 'react';
import { Screen, DNRowHeader, CartItemComponent } from '../components';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { searchActions } from '../actions';
import { connect } from 'react-redux';
import { Store, Status } from '../types';
import { View, ActivityIndicator, ScrollView } from 'react-native';

export interface SearchResultScreenProps
	extends NavigationScreenProps,
	ReturnType<typeof mapDisptachToProps>,
	PropsFromState { }

class SearchResultScreen extends React.PureComponent<SearchResultScreenProps> {
	static navigationOptions: NavigationScreenOptions = {
		headerTitle: 'Search Results',
	};

	async componentWillMount() {
		let category = this.props.navigation.getParam('category');
		if (category) {
			await this.props.searchProducts('', [], category.id);
		} else {
			await this.props.searchProducts(this.props.navigation.getParam('query'), [], null);
		}
	}

	render() {
		const { searchResults, navigation } = this.props;
		if (this.props.status === 'UNDEFINED' || this.props.status === 'LOADING') {
			// return loading screen
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#009ddc" />
				</View>
			);
		}
		return (
			<Screen>
				<ScrollView>
					<DNRowHeader containerStyle={{ padding: 20 }} upperCase style={{ letterSpacing: 1 }}>
						Search
               </DNRowHeader>
					{searchResults.map(id => {
						return (
							<CartItemComponent
								key={id}
								productId={id}
								onPress={() => {
									navigation.navigate('Product', { productId: id });
								}}
							/>
						);
					})}
				</ScrollView>
			</Screen>
		);
	}
}

const mapDisptachToProps = (dispatch: any) => {
	return {
		searchProducts: (query: string, filters: string[], categoryId: string | null) => {
			dispatch(searchActions.searchProductsAsync(query, filters, categoryId));
		},
	};
};

type PropsFromState = {
	status: Status;
	searchResults: string[];
};

const mapStateToProps = (state: Store): PropsFromState => {
	if (state.products.search) {
		return {
			status: state.products.search.status,
			searchResults: state.products.search.list,
		};
	} else {
		return {
			status: 'UNDEFINED',
			searchResults: [],
		};
	}
};

export default connect(mapStateToProps, mapDisptachToProps)(SearchResultScreen);
