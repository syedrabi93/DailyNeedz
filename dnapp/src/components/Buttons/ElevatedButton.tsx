import React from 'react';
import { Card } from 'react-native-paper';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Reg } from '../StyledText/Reg';

export interface ElevatedButtonProps {
	children: string;
	onPress: () => void;
	disable?: boolean;
}

class ElevatedButton extends React.PureComponent<ElevatedButtonProps> {
	render() {
		return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
				<Card
					elevation={2}
					style={{
						alignSelf: 'stretch',
						alignItems: 'center',
						marginTop: 10,
						backgroundColor: '#29353a',
					}}>
					<View
						style={{
							paddingHorizontal: 25,
							paddingVertical: 15,
						}}>
						<Reg style={{ color: '#fff', fontSize: 14 }}>{this.props.children.toUpperCase()}</Reg>
					</View>
				</Card>
			</TouchableWithoutFeedback>
		);
	}
}

export { ElevatedButton };
