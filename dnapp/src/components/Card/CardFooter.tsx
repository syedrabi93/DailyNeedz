import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
class CardFooter extends Component<any, any> {
  render() {
    return <View style={styles.cardFooter}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  cardFooter: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
  },
});

export { CardFooter };
