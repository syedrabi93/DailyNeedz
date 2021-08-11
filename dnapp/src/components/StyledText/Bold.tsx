import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface BoldProps {
	style?: TextStyle
}

class Bold extends React.PureComponent<BoldProps> {
  render() {
    return <Text style={[styles.bold, this.props.style]}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'opb',
  },
});

export { Bold };
