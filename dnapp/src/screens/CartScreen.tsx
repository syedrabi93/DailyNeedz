import React, { Component } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Alert,
} from "react-native";
import { Button } from "../components/Button";
import { Store, Product } from "../types";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { CartItemComponent, DNRow } from "../components";
import grave from "../../assets/grave.png";
import _ from "lodash";
import { WebBrowser } from "expo";
import * as Linking from "expo-linking";
import { instamojoApi, } from "../axios";
import firebase from "firebase";
import { AddSpinnerProps, addSpinner } from "../newScreens/Spinner/addSpinner";
import { Dispatch } from "redux";
import { emptyCart } from "../actions/addToCartActions";
import { Checkbox, Colors } from "react-native-paper";
import { Order } from "./OrderListScreen";
import Axios from "axios";
export interface CartScreenProps
	extends NavigationScreenProps,
	AddSpinnerProps {
}



export const SomethingBadHappened = () => Alert.alert("Sorry", "Something Bad Happened. Try Again Later");

class CartScreen extends Component<CartScreenProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {
	static navigationOptions = () => {
		return { headerTitle: "Cart" };
	};
	state = {
		cod: true,
		requestId: "none"
	};
	componentDidMount() {
		Linking.addEventListener("url", this.handleLinking);
	}
	componentWillUnmount() {
		Linking.removeEventListener("url", this.handleLinking);
	}

	handleLinking = async () => {
		WebBrowser.dismissBrowser();
		const { data } = await instamojoApi.get("/payment-requests/" + this.state.requestId)
		console.log(data)
		if (data.payment_request.status !== "Completed") {
			Alert.alert("Sorry", "Something Bad Happened at our end. If you have already paid for the order, it will be refunded between 24 hours.")
		} else {
			Alert.alert("Success", "Your Order has been place it will be delivered to your place as soon as possible")
			this.props.emptyCart(this.props.cartItems)
			this.props.navigation.navigate("Orders");
		}
	};
	handlecod = async (amount: number) => {
		const user = firebase.auth().currentUser;
		this.props.showSpinner()
		try {
			if (user) {
				const result = await Axios.post("/orders/" + user.uid + ".json", {
					orderedItems: this.props.cartProducts,
					subTotal: amount,
					delivered: "Preparing",
					orderDate: (new Date()).toDateString(),
					deliveryDate: null,
				} as Order);
				if (result.status === 200) {
					Alert.alert("Success", "Your Order has been place it will be delivered to your place as soon as possible")
					this.props.emptyCart(this.props.cartItems);
					this.props.navigation.navigate("Orders");
				}
			} else {
				SomethingBadHappened()
			}

		} catch (e) {
			SomethingBadHappened()
		}
		this.props.hideSpinner()
	}
	handleCheckout = async (amount: number) => {
		if (this.state.cod) {
			this.handlecod(amount)
		} else {
			this.handleOnlineOrder(amount)
		}
	};
	handleOnlineOrder = async (amount: number) => {
		if (firebase.auth().currentUser) {
			this.props.showSpinner()
			const callBackUrl = Linking.makeUrl("/checkout");
			const randomNum = Math.random() * 1000;
			// const {
			// 	data: { url }
			// } = await urlShortenApi.get(
			// 	`?key=e8c82042651ff550cbb9170d9e949080&short=${callBackUrl}`
			// );

			const query = {
				amount: amount.toString(),
				purpose: "TEST",
				buyer_name: "TEST" + randomNum,
				phone: "8727880227",
				email: "adeee621@gmail.com",
				// redirect_url: url.shortLink
			};

			const { data } = await instamojoApi.post("/payment-requests/", query);
			this.setState({ requestId: data.payment_request.id })

			const result = await WebBrowser.openBrowserAsync(data.payment_request.longurl);

			if (result.type === "cancel") {
				Alert.alert("Sorry", "Try again")
			}
		} else {
			this.props.navigation.navigate("LoginModal")
		}
		this.props.hideSpinner()
	};
	calcTotal = (items?: Product[]) => {
		if (items) {
			let total = items.reduce((acc, val) => {
				return acc + val.product_count * val.product_mrp;
			}, 0);

			return total;
		}
		return 0;
	};

	render() {
		const { cartItems, navigation, cartProducts } = this.props;
		const discount = 50;
		const charges = 29;
		if (!cartItems || Object.keys(cartItems).length === 0) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}>
					<Image source={grave} style={{ width: 100, height: 100 }} />
					<Text style={{ marginBottom: 30 }}>
						Oops, It seems your cart is Empty
					</Text>
					<Button onPress={() => navigation.navigate("Home")}>
						Start Shopping
					</Button>
				</View>
			);
		}

		let total = this.calcTotal(cartProducts);

		const discountedPrice = total - discount;
		const cartTotal = discountedPrice > 0 ? discountedPrice : total;
		const totalWithCharges = cartTotal + charges;

		return (
			<View style={styles.screen}>
				<View style={{ flex: 1 }}>
					<ScrollView
						bounces
						alwaysBounceVertical
						contentContainerStyle={{ paddingVertical: 20 }}>
						<View style={{ backgroundColor: "#fff" }}>
							{_.map(cartItems, key => {
								return (
									<CartItemComponent
										productId={key}
										key={key}
									/>
								);
							})}
						</View>
						<View style={styles.totaling} key="totaling">
							<View style={{ padding: 15 }}>
								<View style={styles.row}>
									<Text style={styles.rowTextStyle}>
										M.R.P
									</Text>
									<Text style={styles.rowTextStyle}>
										Rs {total}
									</Text>
								</View>
								{discountedPrice > 0 ? (
									<View style={styles.row}>
										<Text style={styles.rowTextStyle}>
											Discount
										</Text>
										<Text
											style={[
												styles.rowTextStyle,
												{
													color:
														"rgba(135, 211, 124, 1)"
												}
											]}>
											- Rs {discount}
										</Text>
									</View>
								) : null}
								<View style={styles.row}>
									<Text style={styles.rowTextStyle}>
										Delivery Charges
									</Text>
									<Text
										style={[
											styles.rowTextStyle,
											{ color: "rgba(135, 211, 124, 1)" }
										]}>
										+ Rs {charges}
									</Text>
								</View>
							</View>
							<View key="subtotal" style={styles.subtotal}>
								<View style={{ paddingHorizontal: 15 }}>
									<View style={styles.row}>
										<Text style={styles.subtotalTextStyle}>
											Sub Total
										</Text>
										<Text style={styles.subtotalTextStyle}>
											Rs {totalWithCharges}
										</Text>
									</View>
								</View>
							</View>
						</View>
						<DNRow onPress={() => { this.setState({ cod: !this.state.cod }) }} leftIcon={<Checkbox status={this.state.cod ? "checked" : "unchecked"} uncheckedColor={Colors.blueGrey900} onPress={() => { this.setState({ cod: !this.state.cod }) }} />}>Cash on Delivery</DNRow>

					</ScrollView>
				</View>
				<View style={styles.checkoutViewStyle}>
					<View style={{ padding: 20, alignItems: "flex-start" }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "bold",
								marginRight: 10
							}}>
							Total :
						</Text>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: "rgba(135, 211, 124, 1)"
							}}>
							Rs {totalWithCharges}
						</Text>
					</View>
					<Button
						onPress={() => this.handleCheckout(totalWithCharges)}
						containerStyle={{
							paddingHorizontal: 60,
							borderRadius: 50
						}}
						textStyle={{ textTransform: "uppercase", fontSize: 16 }}>
						Checkout
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: "#efefef" },
	totaling: {
		backgroundColor: "#fff",
		marginTop: 10,
		borderWidth: 1,
		borderColor: "#ebebeb"
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10
	},
	rowTextStyle: { fontSize: 12, color: "rgba(0,0,0,0.5)" },
	subtotal: {
		borderTopWidth: 1,
		paddingVertical: 10,
		borderColor: "rgba(0,0,0,0.1)"
	},
	subtotalTextStyle: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#333"
	},
	checkoutViewStyle: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row"
	}
});


const mapStateToProps = (state: Store) => {
	return {
		cartItems: state.cart.list,
		cartProducts: state.cart.list.map(id => {
			return state.products.fetchProducts.listById[id];
		})
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		emptyCart: (produceIds: string[]) => dispatch(emptyCart(produceIds))
	}
}

export default addSpinner(connect(mapStateToProps, mapDispatchToProps)(CartScreen));
