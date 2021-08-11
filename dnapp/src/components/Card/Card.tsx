import React, { Component } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
class Card extends Component<any, any>  {
  render() {
    return (
      <View style={styles.cardContainer}>{this.props.children ? this.props.children : null}</View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    elevation: 1,
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
  },
});

export { Card };
