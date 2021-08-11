import * as React from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-paper';
import { Semi, Bold } from '../components';



export interface AddToCartButtonProps {
	count: number,
	onInc: () => void;
	onDec: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ count, onDec, onInc }) => {
	if (count === 0) {
		return <View style={{ flex: 1, paddingLeft: 5 }}>
			<TouchableWithoutFeedback onPress={onInc}>
				<Card elevation={2}>
					<View style={{
						height: 50,
						backgroundColor: '#f6846a',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 2,
					}}>
						<Semi style={{ color: '#fff' }}>{'Add To Cart'.toUpperCase()}</Semi>
					</View>
				</Card>
			</TouchableWithoutFeedback>
		</View>;
	}
	else {
		return <View style={{
			flex: 1, paddingLeft: 5,
			flexDirection: "row", justifyContent: "space-between"
		}}>
			<Card elevation={2}>
				<TouchableWithoutFeedback onPress={onDec}>
					<View style={{
						width: 50,
						height: 50,
						backgroundColor: '#f6846a',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 2,
					}}>
						<Bold style={{ color: '#fff', fontSize: 24 }}>-</Bold>
					</View>
				</TouchableWithoutFeedback>
			</Card>
			<Semi style={{ alignSelf: "center", color: "#fff", fontSize: 18 }}>{count}</Semi>
			<Card elevation={2}>
				<TouchableWithoutFeedback onPress={onInc}>
					<View style={{
						width: 50,
						height: 50,
						backgroundColor: '#f6846a',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 2,
					}}>
						<Bold style={{ color: '#fff', fontSize: 24 }}>+</Bold>
					</View>
				</TouchableWithoutFeedback>
			</Card>
		</View>;
	}
};

