import React from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from "react-redux";
import { UIManager, StatusBar } from "react-native";
import firebase from "firebase";
import Router from "./src/Router";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/store";

import SpinnerComponent from "./src/newScreens/Spinner/SpinnerComponent";
import { cacheImages } from "./cacheImages";
import { cacheFonts } from "./cacheFonts";
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        SplashScreen.preventAutoHideAsync();
        this.state = {
            isReady: false,
        };
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require("./assets/google.png"),
            require("./assets/logowhite.png"),
            require("./assets/logoblue.png"),
            require("./assets/grave.png"),
            require("./assets/pluger.png"),
        ]);
        StatusBar.setBarStyle("light-content");
        const fonts = [
            { opb: require("./assets/Lato-Bold.ttf") },
            { opl: require("./assets/Lato-Light.ttf") },
            { ops: require("./assets/Lato-Bold.ttf") },
            { opr: require("./assets/Lato-Regular.ttf") },
        ];
        const wait = (ms: number) =>
            new Promise((res) => {
                setTimeout(() => res(ms), ms);
            });

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const fontAssets = cacheFonts(fonts);
        await Promise.all([...fontAssets,...imageAssets, wait(3000)]);
    }

    async componentDidMount() {
        var config = {
            apiKey: "AIzaSyAZ3GDqDQgCNQcAI0zhEaJidqRksFkThQo",
    authDomain: "dailyneedz-a743e.firebaseapp.com",
    databaseURL: "https://dailyneedz-a743e.firebaseio.com",
    projectId: "dailyneedz-a743e",
    storageBucket: "dailyneedz-a743e.appspot.com",
    messagingSenderId: "120704999861",
    appId: "1:120704999861:web:543f2eb55b08174fcbf9fc"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        await this._loadAssetsAsync();
        setTimeout(() => SplashScreen.hideAsync(), 2000);
        this.setState({ isReady: true });
    }

    render() {
        const { isReady } = this.state;

        if (!isReady) {
            return null;
        }

        return (
            <Provider store={store}>
                <PaperProvider>
                    <SpinnerComponent />
                    <Router />
                </PaperProvider>
            </Provider>
        );
    }
}
