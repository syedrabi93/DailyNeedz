import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface SemiProps {
	style?: TextStyle
}

class Semi extends React.PureComponent<SemiProps> {
  render() {
    return <Text style={[styles.semi, this.props.style]}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  semi: {
    fontFamily: 'ops',
  },
});

export { Semi };
