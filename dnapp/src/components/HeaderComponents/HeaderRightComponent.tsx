import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButton } from '../HeaderButton';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { Store } from '../../types';
import { connect } from 'react-redux';
import { Reg } from '../StyledText/Reg';

export interface HeaderRightComponentProps extends NavigationScreenProps {

}

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

class HeaderRightComponent extends React.PureComponent<HeaderRightComponentProps & PropsFromRedux> {
	render() {
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 10
				}}>
				<HeaderButton onPress={() => { this.props.navigation.navigate('Search') }}>
					<MaterialIcons name="search" size={24} color="#fff" />
				</HeaderButton>
				<HeaderButton onPress={() => { this.props.navigation.navigate("Cart") }}>

					<MaterialCommunityIcons
						name="cart-outline"
						color="#fff"
						size={20}
					/>
					{this.props.cartCount !== 0 && <View style={{
						position: "absolute",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#009ddc", height: 15, width: 15, top: 5, right: 5, borderRadius: 15, zIndex: 100
					}}>
						<Reg style={{ color: "#fff", fontSize: 10 }}>{this.props.cartCount}</Reg>
					</View>}
				</HeaderButton>
			</View>
		);
	}
}

const mapStateToProps = (state: Store) => {

	return {
		cartCount: state.cart.list.reduce((acc,id) => {
			return state.products.fetchProducts.listById[id].product_count + acc
		}, 0)
	}
}

export default connect(mapStateToProps)(withNavigation(HeaderRightComponent));
