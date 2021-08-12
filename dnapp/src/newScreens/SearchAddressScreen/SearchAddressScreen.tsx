import React from "react";
import { NavigationScreenProps, NavigationScreenOptions } from "react-navigation";

import { Screen } from "../../components";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { Dimensions, Alert } from "react-native";
import { DrawerItem } from "../../components/Drawer/TouchableRow";
import AddressSearch from "./AddressSearch";
import { Store } from "../../types";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { addAddress } from "./reducer/addressReducer";
import { Dispatch } from "redux";
import { addSpinner, AddSpinnerProps } from "../Spinner/addSpinner";
export const SCREENWIDTH = Dimensions.get("window").width;


export interface SearchAddressScreenProps extends NavigationScreenProps, AddSpinnerProps {

}

class SearchAddressScreen extends React.PureComponent<SearchAddressScreenProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>{
	static navigationOptions: NavigationScreenOptions = {
		headerTitle: <AddressSearch />,
		headerRight: null
	}

	handleDetect = async () => {
		try {
			const result = await Location.hasServicesEnabledAsync();
			if (result === true) {
				const permissionStatus = await Permissions.getAsync(Permissions.LOCATION)
				if (permissionStatus.status === "granted") {
					this.getLocation()
				} else {
					// ask For permissions and then get Location;
					const permissionStatus = await Permissions.askAsync(Permissions.LOCATION);
					if (permissionStatus.status !== "granted") {
						Alert.alert("Sorry", "You need to provide permission to access Location");
					} else {
						this.getLocation()
					}
				}
			} else {
				Alert.alert("Location not detected", "Location services are turned off on your device. Please go to setting and enable location service to use this feature");
			}
		} catch (e) {
			Alert.alert("Sorry", "Something Unexpected Happened");
		}
	}

	getLocation = async () => {
		this.props.showSpinner();
		try {

			const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
			const [location] = await Location.reverseGeocodeAsync(coords);
			const locatonString = location.name + " " + location.city + " " + location.region + ", " + location.postalCode;
			this.props.addAddress(locatonString);

			this.props.navigation.navigate("Home");
			this.props.hideSpinner()
		} catch (e) {
			this.props.hideSpinner()
			Alert.alert("Sorry", "Something Unexpected Happened");
		}
	}

	render() {
		const { results } = this.props;
		return <Screen style={{ backgroundColor: "f9f9f9" }}>
			<DrawerItem
				onPress={this.handleDetect}
				text="Detect my Location"
				leftIcon={<EvilIcons name="location" size={18} />}
				underline
			/>
			{results && results.predictions.map((item) => {
				return <DrawerItem
					onPress={() => {

					}}
					text={item.structured_formatting.main_text}
					leftIcon={<AntDesign name="home" size={18} />}
					underline
				/>
			})}
		</Screen>
	}
}

type MapResult = {
	predictions: { description: string; structured_formatting: { main_text: string; } }[]
}

const mapStateToProps = (state: Store) => {
	return {
		results: state.searchAddresses as MapResult | null,
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		addAddress: (location: string) => { dispatch(addAddress(location)) }
	}
}

export default addSpinner(connect(mapStateToProps, mapDispatchToProps)(SearchAddressScreen));