import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { searchPlaces } from "./reducer/searchAddressReducer";

class AddressSearch extends React.PureComponent<
  ReturnType<typeof mapDispatchToProps>
> {
  state = {
    query: "",
  };

  handleSearch = (query: string) => {
    this.setState({ query });
    this.props.fetchPlaces(query);
  };
  render() {
    return (
      <View style={styles.addressSearch}>
        <TextInput
          onChangeText={this.handleSearch}
          value={this.state.query}
          placeholder="Search for Nearby landmark, locality"
          placeholderTextColor="rgba(255,255,255,0.3)"
          style={styles.input}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlaces: (query: string) => {
      dispatch(searchPlaces(query));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddressSearch);

const styles = StyleSheet.create({
  addressSearch: {
    position: "absolute",
    paddingVertical: 10,
    left: -20,
    right: -30,
  },
  input: {
    color: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderColor: "rgba(0,0,0,0.1)",
    flex: 1,
    height: 35,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "opr",
  },
});
