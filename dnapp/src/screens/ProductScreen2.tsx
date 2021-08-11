import * as React from 'react';
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity as TO,
} from 'react-native';

import _ from "lodash";
import { Entypo } from '@expo/vector-icons';

import { Card } from 'react-native-paper';
import { ElevatedButton } from '../components/Buttons/ElevatedButton';
import { Semi, Bold, Reg } from '../components';
import { AddToCartButton } from './AddToCartButton';
import { Store } from '../types';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { incDecActions, cartActions } from '../actions';
import store from '../store';


export interface ProductScreenProps extends NavigationScreenProps {

}


class ProductScreen extends React.PureComponent<ProductScreenProps & ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatchToProps>
	> {
	static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => {
		const productId = navigation.getParam("productId");
		const Name = store.getState().products.fetchProducts.listById[productId].product_brand_name
		return {
			headerTitle: Name,
			headerTitleStyle: {
				fontWeight: 'normal',
				fontFamily: 'ops',
			},
		}
	};

	addToWishList = () => {

	}

	addToCart = () => {
		if (this.props.count === 0) {
			return this.props.addToCart(this.props.productId);
		} else {
			return this.props.incrementCartItem(this.props.productId);
		}
	}
	removeFromCart = () => {
		if (this.props.count === 1) {
			return this.props.removeFromCart(this.props.productId);
		} else {
			return this.props.decrementCartItem(this.props.productId);
		}
	}

	handleBottomButtonPress = () => {
		if (this.props.count === 0) {
			return this.props.addToCart(this.props.productId);
		}
	}
	renderDescription = () => {
		const { product } = this.props;
		const description = _.filter(product.product_description.about, (value) => {
			return value.length > 4
		})
		if (description[0]) {
			console.log(description)
			return <Card
				elevation={2}
				style={{
					width: Dimensions.get('window').width - 30,
					marginTop: 20,
				}}>
				<View
					style={{
						padding: 15,
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<View style={{ flex: 1 }}>
						<Entypo name="plus" size={22} color="#a6a6ad" />
					</View>
					<View style={{ flex: 6 }}>
						<Bold style={styles.titleStyle}>Description</Bold>
					</View>
				</View>
				<View style={{ paddingHorizontal: 20, paddingBottom: 20}}>
					<Reg style={{ fontSize: 14}}>{description[0]}</Reg>
				</View>
			</Card>
		}
		return null;

	}
	render() {
		const { product } = this.props;

		return (
			<View style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
				<View
					style={styles.topBar}>
					{/* <View style={{ flex: 1, paddingRight: 5 }}>
						<TouchableWithoutFeedback onPress={this.addToWishList}>
							<Card elevation={2}>
								<View
									style={styles.darkBtn}>
									<Semi style={{ color: '#fff' }}>{'Add To WishList'.toUpperCase()}</Semi>
								</View>
							</Card>
						</TouchableWithoutFeedback>
					</View> */}
					<AddToCartButton
						count={product.product_count} onInc={this.addToCart} onDec={this.removeFromCart} />
				</View>

				<ScrollView style={{ flex: 1 }}>
					<View style={styles.screen}>
						<Card
							elevation={2}
							style={{
								alignSelf: 'center',
								backgroundColor: '#fff',
								width: Dimensions.get('window').width - 30,
							}}>
							<View style={{ padding: 15, alignItems: 'center' }}>
								<Image
									source={{ uri: product.product_image.url }}
									style={{
										width: 300,
										height: 300,
									}}
								/>
							</View>
							<View style={{ flexDirection: 'row', padding: 15 }}>
								<View style={{ flex: 12, paddingHorizontal: 5, paddingRight: 10 }}>
									<Bold
										style={{
											fontSize: 16,
											color: '#323c3f',
										}}>
										{product.product_brand_name} - {product.product_name}
									</Bold>
								</View>
								<View
									style={{
										paddingVertical: 12,
										flex: 5,
										alignSelf: 'flex-start',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#bfbfc4',
										borderRadius: 2,
									}}>
									<Semi style={{ color: '#fff' }}>Rs {product.product_mrp}</Semi>
								</View>
							</View>
						</Card>

						{this.renderDescription()}

						<Card
							elevation={2}
							style={{
								width: Dimensions.get('window').width - 30,
								marginTop: 20,
							}}>
							<View
								style={{
									alignItems: 'center',
									padding: 15,
								}}>
								<Text style={styles.titleStyle}>Pack Size:</Text>
								<Text style={{ color: '#a6a6ad', fontWeight: 'bold' }}>
									Pack sizes available for this item
                        </Text>
								<View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
									<TO>
										<View
											style={[
												{
													padding: 10,
													paddingHorizontal: 15,
													borderWidth: 1,
													borderColor: '#323c3f',
													borderRadius: 2,
													marginRight: 8,
													marginBottom: 8,
												},
											]}>
											<Text
												style={{
													fontSize: 13,
													fontWeight: 'bold',
													marginBottom: 4,
													color: '#3a3a3a',
												}}>
												{product.product_size}
											</Text>
											<Text style={{ fontSize: 12, color: '#9b9b9b' }}>
												Rs {product.product_mrp}</Text>
										</View>
									</TO>
								</View>
							</View>
						</Card>
						<View style={{ width: 200, paddingVertical: 20 }}>
							<ElevatedButton onPress={this.handleBottomButtonPress}>{product.product_count === 0 ? "Add To Cart" : "Added To Cart"}</ElevatedButton>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}


const mapStateToProps = (state: Store, ownProps: ProductScreenProps) => {
	const productId = ownProps.navigation.getParam("productId");
	const product = state.products.fetchProducts.listById[productId];
	return {
		productId,
		product,
		count: product.product_count
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		incrementCartItem: (productId: string) => {
			dispatch(incDecActions.incrementCartItem(productId));
		},
		decrementCartItem: (productId: string) => {
			dispatch(incDecActions.decrementCartItem(productId));
		},
		addToCart: (productId: string) => {
			dispatch(cartActions.addToCart(productId));
		},
		removeFromCart: (productId: string) => {
			dispatch(cartActions.removeFromCart(productId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#e8e8e8',
		padding: 8,
		alignItems: 'center',
	},
	titleStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#323c3f',
	},
	topBar: {
		backgroundColor: '#38474f',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	darkBtn: {
		height: 50,
		backgroundColor: '#2d3a40',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 2,
	}
});
