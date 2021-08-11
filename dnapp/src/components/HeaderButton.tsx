import React from 'react';

import {
   View,
   TouchableOpacity as TO,
   TouchableNativeFeedback as TN,
   StyleSheet,
} from 'react-native';
import { isIos } from '../constants';

export interface HeaderButtonProps {
	onPress?: () => void
}

class HeaderButton extends React.PureComponent<HeaderButtonProps> {
   render() {
      if (isIos) {
         return (
            <View style={styles.containerStyles}>
               <TO
						hitSlop={{right: 10, bottom: 20, left: 10, top: 10}}
						activeOpacity={0.6}
                  onPress={this.props.onPress}>
                  <View style={styles.innerButtonStyles}>{this.props.children}</View>
               </TO>
            </View>
         );
      } else {
         return (
            <View style={styles.containerStyles}>
               <TN
                  background={TN.Ripple('rgba(255,255,255,0.2)', true)}
                  useForeground={true}
                  delayPressOut={200}
						onPress={this.props.onPress}>
                  <View style={styles.innerButtonStyles}>{this.props.children}</View>
               </TN>
            </View>
         );
      }
   }
}

const styles = StyleSheet.create({
   containerStyles: { alignItems: 'center', justifyContent: 'center', width: 50 },
   innerButtonStyles: {
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { HeaderButton };
