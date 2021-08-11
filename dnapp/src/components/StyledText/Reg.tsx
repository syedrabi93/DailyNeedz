import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface RegProps{
	style?: TextStyle
}

class Reg extends React.PureComponent<RegProps> {
  render() {
    return <Text style={[styles.reg, this.props.style]}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  reg: {
    fontFamily: 'opr',
  },
});

export { Reg };
