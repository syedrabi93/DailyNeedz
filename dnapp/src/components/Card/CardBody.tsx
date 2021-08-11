import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
class CardBody extends Component<any, any>  {
  render() {
    return <View style={styles.cardBody}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  cardBody: {
    padding: 10,
  },
});

export { CardBody };
