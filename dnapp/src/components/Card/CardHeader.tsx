import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
class CardHeader extends Component<any, any>  {
  render() {
    return <View style={styles.cardHeader}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  cardHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
  },
});

export {CardHeader};
