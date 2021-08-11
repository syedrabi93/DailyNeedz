import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationScreenProps, DrawerActions } from 'react-navigation';
import _ from 'lodash';
import { Slider, SliderProps, HeaderButton, CartItemComponent } from '../components';
import { dnapi } from '../axios';
import { Store } from '../types';
import { fetchProductActions } from '../actions';
import { connect } from 'react-redux';
import { addSpinner, AddSpinnerProps } from '../newScreens/Spinner/addSpinner';
import { cacheImages } from "../../cacheImages";
export interface HomeScreenProps extends NavigationScreenProps { }

interface HomeScreenState {
	slides: SliderProps['slides'];
}

class HomeScreen extends Component<
	HomeScreenProps & AddSpinnerProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
	HomeScreenState
> {
	static navigationOptions = ({ navigation }: NavigationScreenProps) => {
		return {
			headerTitle: 'Daily Needz',

			headerLeft: (
				<HeaderButton
					onPress={() => {
						navigation.dispatch(DrawerActions.openDrawer());
					}}>
					<MaterialIcons name="menu" size={24} color="#fff" />
				</HeaderButton>
			),
		};
	};

	state: Readonly<HomeScreenState> = {
		slides: [],
	};
	async componentDidMount() {
		const res = await dnapi.get('/sliders');
		const base = dnapi.defaults.baseURL?.endsWith('/') ? dnapi.defaults.baseURL.slice(0, dnapi.defaults.baseURL.length - 1) : dnapi.defaults.baseURL;
		// console.log(base);
		// console.log(res.data);
		const slides = res.data.map((sliderObj: {slide: { url: string }}) => {
			return base + sliderObj.slide.url;
		})
		console.log(slides);
		this.setState({ slides });
		const fetchSlides = cacheImages(slides)
		await Promise.all([...fetchSlides]);
		console.log("called");
		await this.props.fetchProducts();

	}


	handleItemPress = (id: string) => () => {
		this.props.navigation.navigate('Product', { productId: id });
	};


	render() {
		const { slides } = this.state;
		const { products } = this.props;
		if (this.props.status === 'UNDEFINED' || this.props.status === 'LOADING') {
			// return loading screen
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#009ddc" />
				</View>
			);
		} else if (this.props.status === 'SUCCESS') {
			return (
				<ScrollView style={styles.screen}>
					<Slider slides={slides} />
					{_.map(products, id => {
						return (
							<CartItemComponent
								key={id}
								productId={id}
								onPress={this.handleItemPress(id)}
							/>
						);
					})}
				</ScrollView>
			);
		} else if (this.props.status === 'FAIL') {
			// error message

			return null;
		} else {
			// something really bad happened that i dont know
			return null;
		}
	}
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#efefef' },
});



const mapStateToProps = (state: Store) => {
	return {
		status: state.products.homeList.status,
		products: state.products.homeList.list!,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchProducts: (count?: number) => {
			dispatch(fetchProductActions.fetchProductsAsync(count))
		}
	}
}

export default addSpinner(connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen));
