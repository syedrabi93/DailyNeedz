import React from 'react';
import { DNRowHeader, DNRow, Screen } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VersionComponent from '../components/VersionComponent';
import { ScrollView, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { WebBrowser } from 'expo';
import firebase from "firebase";
import { Dispatch } from 'redux';
import { signOutUser } from '../actions/authActions';
import { connect } from 'react-redux';
export interface AccountScreenProps extends NavigationScreenProps { }

class AccountScreen extends React.PureComponent<AccountScreenProps & ReturnType<typeof mapDispatchToProps>> {
	static navigationOptions = {
		headerRight: null,
		headerTitle: 'My Account',
	};

	handleLogout = async () => {
		try {
			await firebase.auth().signOut();
			this.props.logout();
			this.props.navigation.navigate("Home");
			Alert.alert("You Have Signed Out");
		} catch (e) {
			Alert.alert("Something happened");
		}
	}

	render() {
		const { navigation } = this.props;
		return (
			<Screen style={{ backgroundColor: '#f9f9f9' }}>
				<ScrollView>
					<DNRowHeader>Account</DNRowHeader>
					<DNRow
						onPress={() => {
							navigation.navigate('AccountEdit');
						}}
						leftIcon={<MaterialCommunityIcons name="account-outline" size={18} />}>
						Edit Account Settings
               </DNRow>
					{/* <DNRow leftIcon={<MaterialCommunityIcons name="content-save-outline" size={18} />}>
						My Wish List
               </DNRow> */}
					{/* <DNRow
						onPress={() => {
							navigation.navigate('PasswordChange');
						}}
						leftIcon={<MaterialCommunityIcons name="lock-reset" size={18} />}>
						Change Password
               </DNRow> */}

					<DNRow onPress={this.handleLogout} leftIcon={<MaterialCommunityIcons name="logout" size={18} />} isLast>
						Log Out
               </DNRow>
					{/* <DNRowHeader>Notifications</DNRowHeader>
					<DNRow leftIcon={<Entypo name="notification" size={16} />} isLast>
						Your Notifications
               </DNRow> */}
					<DNRowHeader>Orders</DNRowHeader>
					<DNRow isLast onPress={()=>{navigation.navigate('Orders');}} leftIcon={<MaterialCommunityIcons name="format-list-bulleted" size={18} />}>
						My Orders
               </DNRow>
					<DNRowHeader>About</DNRowHeader>
					<DNRow
						onPress={() => {
							navigation.navigate('Help');
						}}
						leftIcon={<MaterialCommunityIcons name="help-circle-outline" size={16} />}>
						Help
               </DNRow>
					<DNRow onPress={() => {
						WebBrowser.openBrowserAsync("https://dailyneedz.nextbout.com/privacy-policy-2/")
					}} leftIcon={<MaterialCommunityIcons name="lock-outline" size={16} />}>
						Privacy
               </DNRow>
					<DNRow
						onPress={() => {
							WebBrowser.openBrowserAsync("https://dailyneedz.nextbout.com/terms-and-conditions/")
						}}
						isLast
						leftIcon={<MaterialCommunityIcons name="clipboard-outline" size={16} />}>
						Terms of Service
               </DNRow>
					<VersionComponent />
				</ScrollView>
			</Screen>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		logout: () => { dispatch(signOutUser()) }
	}
}

export default connect(null, mapDispatchToProps)(AccountScreen);
