import React from 'react';
import { Screen, DNRowHeader, Bold, Reg, Light } from '../components';
import { View, ActivityIndicator } from 'react-native';
import { Product } from '../types';
import _ from "lodash";
import { NavigationScreenOptions, ScrollView } from 'react-navigation';
import { SomethingBadHappened } from './CartScreen';
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-paper';
import Axios from 'axios';
function getWeekDay(date: Date) {
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	return days[date.getDay()];
}

function getMonth(date: Date) {
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	return monthNames[date.getMonth()];
}

export interface Order {
	orderedItems: Product[];
	subTotal: number;
	orderDate: string;
	delivered: "Placed" | "Completed" | "Preparing";
}

class OrderListScreen extends React.PureComponent {
	state = {
		isReady: false,
		orders: null as Order[] | null
	}

	async componentDidMount() {
		try {
			const user = firebase.auth().currentUser;
			if (user) {
				const result = await Axios.get("https://dailyneedz-a743e.firebaseio.com/orders/" + user.uid + ".json");
				if (result.status === 200) {
					const orders = (_.map(result.data, (value) => {
						return value;
					}) as Order[])
					orders.sort((a, b)=> {
						var dateA =  Date.parse(a.orderDate), dateB =  Date.parse(b.orderDate);
						return dateB - dateA
					})
					this.setState({ isReady: true, orders });
				} else {
					SomethingBadHappened()
				}
			} else {
				SomethingBadHappened()
			}
		} catch (e) {
			SomethingBadHappened()
		}
	}

	static navigationOptions: NavigationScreenOptions = {
		headerTitle: "My Orders"
	}

	renderIcon = (order: Order) => {
		if (order.delivered === "Completed") {
			return <AntDesign name="checkcircleo" size={40} color={Colors.green100} />
		} else if (order.delivered === "Placed") {
			return <AntDesign name="clockcircleo" size={40} />
		} else {
			return <AntDesign name="clockcircleo" size={40} color={Colors.red100} />
		}
	}

	render() {

		if (!this.state.isReady) {
			// return loading screen
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#009ddc" />
				</View>
			);
		}

		return (
			<Screen>
				<DNRowHeader>
					My Orders
				</DNRowHeader>
				<View style={{ flex: 1 }}>
					<ScrollView>
						{this.state.orders && this.state.orders.map(order => {
							const orderDate = new Date(order.orderDate);
							return <View key={order.orderDate} style={{ flexDirection: "row", paddingVertical: 10 }}>
								<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
									{this.renderIcon(order)}
								</View>
								<View style={{ flex: 3, padding: 10, }}>
									<View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4, backgroundColor: "rgba(0,0,0,0.05)" }}>
										<View style={{ marginVertical: 5 }}><Bold>{getWeekDay(orderDate)} {orderDate.getDate()} {getMonth(orderDate)} {orderDate.getMonth()}</Bold></View>
										<View style={{ marginVertical: 5 }}><Reg>Rs {order.subTotal}</Reg></View>
										<View style={{ marginVertical: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
											<Light>{order.orderedItems.length} Items</Light>
											<Light>{order.delivered}</Light>
										</View>
									</View>
								</View>
							</View>
						})}
					</ScrollView>
				</View>
			</Screen>
		);
	}
}

export default OrderListScreen;
