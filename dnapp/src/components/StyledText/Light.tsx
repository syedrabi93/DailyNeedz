import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface LightProps {
	style?: TextStyle
}

class Light extends React.PureComponent<LightProps> {
  render() {
    return <Text style={[styles.light, this.props.style]}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  light: {
    fontFamily: 'opl',
  },
});

export { Light };
