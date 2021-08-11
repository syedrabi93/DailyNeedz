import React from 'react';
import { View } from 'react-native';
export interface VegProps {
	color?: string;
	pos?: {
		top?: number;
		left?: number;
		right?: number;
		bottom?: number;
	};
	isVeg?: boolean;
}
export class Veg extends React.PureComponent<VegProps> {
	render() {
		let { isVeg = true, pos = { top: 0, left: 0 }, color = 'green' } = this.props;
		if (!isVeg) {
			color = 'red';
		}
		return (<View style={{
			position: 'absolute',
			width: 20,
			height: 20,
			borderWidth: 1,
			borderColor: color,
			alignItems: 'center',
			justifyContent: 'center',
			...pos,
		}}>
			<View style={{
				borderRadius: 10,
				width: 10,
				height: 10,
				backgroundColor: color,
			}} />
		</View>);
	}
}
