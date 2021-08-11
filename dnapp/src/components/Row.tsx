import React from 'react';
import { View, StyleSheet } from 'react-native';

class Row extends React.PureComponent<any,any> {
  render() {
    return <View style={[styles.row, this.props.style]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export { Row };
