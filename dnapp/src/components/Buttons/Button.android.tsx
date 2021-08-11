import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  outline?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: any;
  disabled?: boolean;
}

const Button = ({
  onPress = () => {},
  children = 'Hello',
  outline = false,
  containerStyle = {},
  textStyle = {},
  icon = null,
  disabled = false,
}: ButtonProps) => {
  let buttonStyles = outline ? outlinedStyles : styles;
  buttonStyles = disabled ? disabledStyles : buttonStyles;
  return (
    <TouchableNativeFeedback
      delayPressOut={50}
      disabled={disabled}
      style={{ flex: 1 }}
      onPressOut={onPress}>
      <View style={[buttonStyles.buttonContainer, containerStyle]}>
        {icon}
        <Text style={[buttonStyles.buttonTextStyle, textStyle]}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 2,
    backgroundColor: 'rgba(41,53,58,1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTextStyle: {
    color: '#fff',
  },
});

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
  },
});

export default Button;
