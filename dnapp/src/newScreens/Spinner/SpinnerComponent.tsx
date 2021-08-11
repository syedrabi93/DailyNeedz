import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Store } from "../../types";
import { Portal } from "react-native-paper";

export interface WithLoaderProps {
	loading: boolean;
	showSpinner: () => void;
	hideSpinner: () => void;
}

class SpinnerComponent extends React.PureComponent<ReturnType<typeof mapStateToProps>>{

	render() {

		return <Portal>
			{this.props.loading && <View style={{
				...StyleSheet.absoluteFillObject,
				backgroundColor: "rgba(0,0,0,0.1)",
				alignItems: "center", justifyContent: "center"
			}}>
				<View style={{ width: 150, height: 150, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
					<ActivityIndicator size="large" color="#009ddc" />
				</View>
			</View>}
		</Portal>
	}
}

const mapStateToProps = (state: Store) => {
	return {
		loading: state.loader
	}
}


export default connect(mapStateToProps)(SpinnerComponent);