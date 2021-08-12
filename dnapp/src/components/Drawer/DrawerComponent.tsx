import React, { PureComponent } from "react";

import {
    Entypo,
    EvilIcons,
    FontAwesome,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";

import { View, Text, StyleSheet, ScrollView, Share, Alert } from "react-native";
import WebBrowser from "expo-web-browser";
import { DrawerItemsProps } from "react-navigation";
import { Store } from "../../types";
import { connect } from "react-redux";
import { DrawerItem } from "./TouchableRow";
import { PRIMARY_COLOR } from "../../constants";
import _ from "lodash";
import Constants from "expo-constants";

import { ModalComponent } from "../ModalComponent";
import { Portal } from "react-native-paper";
interface State {
    modalVisible: boolean;
}

type DrawerComponentProps = DrawerItemsProps &
    ReturnType<typeof mapStateToProps>;

class DrawerComponent extends PureComponent<DrawerComponentProps, State> {
    state: Readonly<State> = {
        modalVisible: false,
    };

    handleShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Download the dailyneedz App at https://dailyneedz.nextbout.com",
            });
            if (result.action === Share.sharedAction) {
                Alert.alert("Shared");
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (e) {}
    };

    openModal = () => {
        this.setState({ modalVisible: true });
    };

    closeModal = () => {
        this.setState({ modalVisible: false });
    };
    render() {
        const { navigation, loggedIn, name } = this.props;
        
        return (
            <View style={styles.drawerContainer}>
                <Portal>
                    <ModalComponent
                        open={this.state.modalVisible}
                        onClose={this.closeModal}
                        width={300}
                        height={220}
                    />
                </Portal>
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerHeaderText}>
                            Welcome{name ? ", " + name : ""}
                        </Text>
                    </View>
                    {loggedIn ? (
                        <DrawerItem
                            onPress={() => {
                                navigation.navigate("Account");
                            }}
                            text="My Account"
                            leftIcon={
                                <FontAwesome
                                    name="user-o"
                                    color="rgba(0,0,0,0.7)"
                                    size={14}
                                />
                            }
                        />
                    ) : (
                        <DrawerItem
                            onPress={() => {
                                navigation.navigate("LoginModal");
                            }}
                            text="Login"
                            leftIcon={
                                <FontAwesome
                                    name="user-o"
                                    color="rgba(0,0,0,0.7)"
                                    size={14}
                                />
                            }
                        />
                    )}
                    <DrawerItem
                        onPress={() => {
                            navigation.navigate("Orders");
                        }}
                        leftIcon={
                            <Entypo
                                name="list"
                                color="rgba(0,0,0,0.2)"
                                size={14}
                            />
                        }
                        text="My Orders"
                    />
                    <DrawerItem
                        leftIcon={
                            <MaterialCommunityIcons
                                name="cart-outline"
                                color="rgba(0,0,0,0.7)"
                                size={16}
                            />
                        }
                        onPress={() => {
                            navigation.navigate("Cart");
                        }}
                        rightIcon={
                            this.props.cartCount !== 0 ? (
                                <View
                                    key="badge"
                                    style={{
                                        backgroundColor: "#009ddc",
                                        width: 25,
                                        height: 25,
                                        borderRadius: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: 10,
                                        }}
                                    >
                                        {this.props.cartCount}
                                    </Text>
                                </View>
                            ) : null
                        }
                        text="My Cart"
                    />
                    <DrawerItem
                        text="Need Help?"
                        onPress={() => {
                            navigation.navigate("Help");
                        }}
                        leftIcon={
                            <MaterialCommunityIcons
                                name="lifebuoy"
                                color="rgba(0,0,0,0.6)"
                                size={14}
                            />
                        }
                    />
                    <DrawerItem
                        leftIcon={
                            <MaterialCommunityIcons
                                name="star-outline"
                                color="rgba(0,0,0,0.6)"
                                size={18}
                            />
                        }
                        onPress={() => {
                            navigation.closeDrawer();
                            this.openModal();
                        }}
                        text="Rate Us"
                    />

                    <DrawerItem
                        leftIcon={
                            <MaterialCommunityIcons
                                name="share-outline"
                                color="rgba(0,0,0,0.6)"
                                size={18}
                            />
                        }
                        onPress={this.handleShare}
                        text="Share"
                    />
                </ScrollView>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: PRIMARY_COLOR,
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    drawerHeader: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "rgba(0,0,0,0.04)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0,0,0,0.2)",
    },
    drawerHeaderText: { fontWeight: "bold", color: "#333", fontSize: 12 },
});

const mapStateToProps = (state: Store) => {
    return {
        loggedIn: state.user.loggedIn,

        name: state.user.name,
        cartCount: state.cart.list.reduce((acc, id) => {
            return (
                state.products.fetchProducts.listById[id].product_count + acc
            );
        }, 0),
    };
};

const connected = connect(mapStateToProps)(DrawerComponent);

export { connected as DrawerComponent };
