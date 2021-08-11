import React from 'react';
import { Reg } from './StyledText/Reg';
import { View, TouchableOpacity as TO, Image, ViewStyle, Share, Alert } from 'react-native';
import * as Linking from "expo-linking";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export interface ModalComponentProps {
	open: boolean;
	width: number;
	height: number;
	style?: ViewStyle;
	onClose: () => void;
}

export class ModalComponent extends React.PureComponent<ModalComponentProps> {

	handleFeedback = () => {
		this.props.onClose()
		Linking.openURL("mailto://support@dailyneedz.com?subject=Feedback");
	}

	handleShare = async () => {
		this.props.onClose()
		try {
			const result = await Share.share({
				message: "Download the dailyneedz App at https://dailyneedz.nextbout.com"
			})
			if (result.action === Share.sharedAction) {
				Alert.alert("Shared");
			} else if (result.action === Share.dismissedAction) {
				Alert.alert("Dismissed");
			}
		} catch (e) {

		}
	};

	render() {
		const { width, height, onClose, open } = this.props;
		return (
			<View style={{
				display: open ? "flex" : "none",
				flex: 1, alignItems: "center",
				justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)"
			}}>
				<View
					style={[
						{
							alignSelf: 'center',
							width,
							height,
							backgroundColor: '#fff',
							padding: 20,
						},
						this.props.style,
					]}>
					<View
						style={{
							marginBottom: 5,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Reg style={{ fontSize: 16 }}>Rate Us</Reg>
						<TO hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }} onPress={onClose}>
							<MaterialCommunityIcons name="close" color="#848c8f" size={15} />
						</TO>
					</View>
					<View style={{ marginBottom: 5 }}>
						<Reg style={{ fontSize: 13, color: '#848c8f' }}>
							How did you like shopping with Daily Needz?
               </Reg>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
						<TO onPress={this.handleShare}>
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								<Image
									source={{
										uri:
											'https://dailyneedz.nextbout.com/wp-content/uploads/2019/03/yay.png',
									}}
									style={{ width: 80, height: 80, marginVertical: 10 }}
								/>
								<Reg>Loved it</Reg>
							</View>
						</TO>
						<TO onPress={this.handleFeedback}>
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								<Image
									source={{
										uri:
											'https://dailyneedz.nextbout.com/wp-content/uploads/2019/03/angry.png',
									}}
									style={{ width: 80, height: 80, marginVertical: 10 }}
								/>
								<Reg>Hate it</Reg>
							</View>
						</TO>
					</View>
				</View>
			</View>
		);
	}
}
