import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export interface ScreenProps {
	style?: ViewStyle
	children:React.ReactNode
}

class Screen extends React.PureComponent<ScreenProps> {
   render() {
      return <SafeAreaView><View style={[styles.screen, this.props.style]}>{this.props.children}</View></SafeAreaView>;
   }
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
   },
});

export { Screen };
