import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   ViewStyle,
   TextStyle,
   TouchableNativeFeedback,
} from 'react-native';
import { isIos } from '../constants';

export interface ButtonProps {
   onPress?: () => void;
   children: string;
   outline?: boolean;
   containerStyle?: ViewStyle;
   textStyle?: TextStyle;
   icon?: React.ReactElement;
   disabled?: boolean;
   upperCase?: boolean;
}

class Button extends React.PureComponent<ButtonProps> {
   renderInnerPart() {
      const {
         outline = false,
         disabled = false,
         children = 'Hello',
         containerStyle = {},
         textStyle = {},
         icon = null,
         upperCase,
      } = this.props;

      let buttonStyles = outline ? outlinedStyles : styles;
      buttonStyles = disabled ? disabledStyles : buttonStyles;
      return (
         <View style={[buttonStyles.buttonContainer, containerStyle]}>
            {icon}
            <Text style={[buttonStyles.buttonTextStyle, textStyle]}>
               {upperCase ? children.toUpperCase() : children}
            </Text>
         </View>
      );
   }

   render() {
      const { onPress, disabled = false } = this.props;

      if (!isIos) {
         return (
            <TouchableNativeFeedback
               delayPressOut={200}
               disabled={disabled}
               background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.2)')}
               style={{ flex: 1 }}
               onPressOut={onPress}>
               {this.renderInnerPart()}
            </TouchableNativeFeedback>
         );
      } else {
         return (
            <TouchableOpacity onPress={onPress} disabled={disabled}>
               {this.renderInnerPart()}
            </TouchableOpacity>
         );
      }
   }
}

const outlinedStyles = StyleSheet.create({
   buttonContainer: {
      borderWidth: 1,
      borderColor: '#29353a',
      borderRadius: 2,
      backgroundColor: 'transparent',
      paddingHorizontal: 20,
      paddingVertical: 10,
   },
   buttonTextStyle: {
      color: '#29353a',
      fontSize: 12,
   },
});

const styles = StyleSheet.create({
   buttonContainer: {
      borderRadius: 2,
      backgroundColor: '#29353a',
      paddingHorizontal: 20,
      paddingVertical: 10,
   },
   buttonTextStyle: {
      color: '#fff',
      fontSize: 12,
   },
});
const disabledStyles = StyleSheet.create({
   buttonContainer: {
      borderRadius: 2,
      backgroundColor: 'rgba(41,53,58,0.4)',
      paddingHorizontal: 20,
      paddingVertical: 10,
   },
   buttonTextStyle: {
      color: '#fff',
      fontSize: 12,
   },
});

export { Button };
