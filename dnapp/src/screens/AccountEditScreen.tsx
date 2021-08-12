import React from 'react';
import { Screen, DNRowHeader, Button } from '../components';
import DNInput from '../components/InputComponent';
import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Keyboard,
	EmitterSubscription,
	TextInput,
	Alert,
} from 'react-native';
import {  NavigationScreenProps } from 'react-navigation';
import firebase from "firebase"
import { addSpinner, AddSpinnerProps } from '../newScreens/Spinner/addSpinner';

import { dbapi } from '../axios';
interface AccountEditScreenState {
	email: string | null,
	fullName: string,
	phone: string,
	dob: string,
	address: string;
}

export interface UserDBData {
	email: string,
	fullName: string,
	phone: string,
	dob: string,
	address: string;
}

class AccountEditScreen extends React.PureComponent<NavigationScreenProps & AddSpinnerProps, AccountEditScreenState> {
	static navigationOptions = {};
	scrollView: ScrollView | null = null;
	keyboardWillShowSub: EmitterSubscription | null = null;
	keyboardWillHideSub: EmitterSubscription | null = null;
	componentWillMount() {
		this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
		this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
	}

	componentWillUnmount() {
		this.keyboardWillShowSub!.remove();
		this.keyboardWillHideSub!.remove();
	}
	keyboardWillShow = () => {
		setTimeout(() => {
			if (this.fullNameInput!.isFocused() || this.emailInput!.isFocused()) {
			} else {
				this.scrollView!.scrollToEnd({ animated: true });
			}
		}, 50);
	};
	keyboardWillHide = () => { };
	fullNameInput: TextInput | null = null;
	emailInput: TextInput | null = null;

	state = {
		email: "",
		fullName: "",
		phone: "",
		dob: "",
		address: ""
	}

	handleChange = (name: keyof AccountEditScreenState) => (text: string) => {
		this.setState({ [name as "email"]: text });
	}

	saveUserInfo = async () => {
		this.props.showSpinner()
		try {
			const user = firebase.auth().currentUser;
			if (user) {
				const result = await dbapi.patch("/users/" + user.uid + ".json",this.state);
				if(result.status === 200){
					Alert.alert("Success", "Saved information");
				}
			} else {
				Alert.alert("You have Logged out");
				this.props.navigation.navigate("Home");
			}
		}
		catch (e) {
			Alert.alert("Sorry", "Something Bad Happened");
		}
		this.props.hideSpinner()
	}

	async componentDidMount() {
		this.props.showSpinner()
		try {

			const user = firebase.auth().currentUser;
			if (user) {
				const { data }: {data: UserDBData} = await dbapi.get("/users/" + user.uid + ".json");
				console.log(data, "data")
				if (data) {
					
					this.setState(data)
				}else {
					  await dbapi.put("/users/" + user.uid + ".json", {email: user.email});
					  this.setState({email: user.email})
				}
			} else {
				Alert.alert("You have Logged out");
				this.props.navigation.navigate("Home");
			}
		}
		catch (e) {
			console.log(e.message);
			Alert.alert("Sorry", "Something Bad Happened");
		}
		this.props.hideSpinner()
	}

	render() {
		return (
			<Screen>
				<DNRowHeader>Update Account Info</DNRowHeader>
				<View style={{ flexGrow: 1, display: "flex",  paddingHorizontal: 30, paddingVertical: 20 }}>
							<DNInput
								onChangeText={this.handleChange("email")}
								label="Email"
								value={this.state.email}
								keyboardType="email-address"
								returnKeyType="next"
								setRef={ref => (this.emailInput = ref)}
							/>
							<DNInput
								onChangeText={this.handleChange("fullName")}
								value={this.state.fullName}
								containerStyle={{ marginTop: 10 }}
								label="Full Name"
								returnKeyType="next"
								setRef={ref => (this.fullNameInput = ref)}
							/>
							<DNInput
								onChangeText={this.handleChange("phone")}
								value={this.state.phone}
								label="Mobile" showLeftIcon keyboardType="number-pad" returnKeyType="next" />
							<DNInput
								onChangeText={this.handleChange("dob")}
								value={this.state.dob}
								label="DOB" returnKeyType="next" />
							<DNInput
								onChangeText={this.handleChange("address")}
								value={this.state.address}
								label="Address" returnKeyType="next" />
							<Button
								onPress={this.saveUserInfo}
								containerStyle={{ marginTop: 20, alignItems: 'center' }}>
								Save
                     </Button>
						</View>

			</Screen>
		);
	}
}

export default addSpinner(AccountEditScreen);
