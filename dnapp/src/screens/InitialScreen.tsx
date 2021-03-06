import React from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity as TO,
    SafeAreaView,
    Alert,
} from "react-native";

import * as Google from "expo-google-app-auth";
import * as Facebook  from "expo-facebook";
import { connect } from "react-redux";

import firebase from "firebase";
import logo from "../../assets/logowhite.png";
import { LoginButton } from "../components";
import { Store } from "../types/StoreState";
import { authActions } from "../actions";
import { Dispatch } from "redux";
import { NavigationScreenProps } from "react-navigation";
import { addSpinner, AddSpinnerProps } from "../newScreens/Spinner/addSpinner";
import Constants from "expo-constants";
const facebookId = "567272988036419";

export interface Props extends NavigationScreenProps {}

interface ImapDispatchToProps {
    signInUser: (user: Store["user"]) => void;
}

class InitialScreen extends React.Component<
    Props & ImapDispatchToProps & AddSpinnerProps
> {
    static navigationOptions = () => ({ header: null });

    handleGoogleAuth = async () => {
        //will handle
        this.props.showSpinner();
        try {
            // if (firebase.auth().currentUser) {
            //    firebase.auth().signOut();
            // }
            const result = await Google.logInAsync({
                iosClientId: `120704999861-b42hkt888dhp7610f2r1f0k90riflk9f.apps.googleusercontent.com`,
                androidClientId: `120704999861-aouk835dh74p54jbfku8g5ugqroqoijp.apps.googleusercontent.com`,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    result.idToken
                );
                const { user } = await firebase
                    .auth()
                    .signInWithCredential(credential);
                if (user) {
                    this.props.signInUser({
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        phone: user.phoneNumber,
                        loggedIn: true,
                    });
                }
                return this.props.navigation.navigate("Home");
            } else {
                return result;
            }
        } catch (e) {
            console.log(e.message);
            return e;
        } finally {
            this.props.hideSpinner();
        }
    };

    handleFacebookLogin = async () => {
        this.props.showSpinner();
        try {
            await Facebook.initializeAsync({
                appId: facebookId,
              });
              const {
                type,
                //@ts-ignore
                token
              } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
              });
            if (type === "success") {
                const credential =
                    firebase.auth.FacebookAuthProvider.credential(token!);

                let { user } = await firebase
                    .auth()
                    .signInWithCredential(credential!);
                if (user) {
                    this.props.signInUser({
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        phone: user.phoneNumber,
                        loggedIn: true,
                    });
                }

                this.props.navigation.navigate("Home");
            } else {
                //show a toast show some error occured try different methhod
                Alert.alert("Sorry", "Please try Again");
            }
        } catch (e) {
            //some error occurred while loggin in
            Alert.alert("Sorry", "There was an error at out end");
            console.warn(e);
        }finally {
            this.props.hideSpinner();
        }
      
    };

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.screen}>
                <View style={styles.screenUpper}>
                    <Image
                        source={logo}
                        style={{
                            width: 260,
                            height: 260,
                        }}
                    />
                    <View
                        style={{
                            width: 300,
                        }}
                    >
                        <LoginButton
                            onPress={this.handleGoogleAuth}
                            iconName="google-"
                            color="#db3236"
                        >
                            Google
                        </LoginButton>
                        <LoginButton
                            onPress={this.handleFacebookLogin}
                            iconName="facebook"
                            color="#3b5998"
                        >
                            FaceBook
                        </LoginButton>
                    </View>
                </View>
                <SafeAreaView
                    style={{
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        position: "absolute",
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={[
                            styles.bottomTextStyles,
                            { color: "rgba(0,0,0,0.4)" },
                        ]}
                    >
                        By signing in you agree to our terms and conditions.
                    </Text>
                    <TO
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                    >
                        <Text
                            style={[
                                styles.bottomTextStyles,
                                {
                                    color: "#3a85f7",
                                    borderBottomStartRadius: 1,
                                },
                            ]}
                        >
                            Sign in Later
                        </Text>
                    </TO>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    screenUpper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 50,
        backgroundColor: "#3a85f7",
        paddingTop: Constants.statusBarHeight,
    },

    bottomTextStyles: {
        fontSize: 12,
        fontFamily: "opr",
        marginTop: 10,
    },
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signInUser: (user: Store["user"]) => {
            dispatch(authActions.signInUser(user));
        },
    };
};

export default addSpinner(connect(null, mapDispatchToProps)(InitialScreen));
