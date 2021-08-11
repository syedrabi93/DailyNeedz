import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
  onPress,
  disabled = false,
  children = 'Hello',
  outline = false,
  containerStyle = {},
  textStyle = {},
  icon =null,
}: ButtonProps) => {
  let buttonStyles = outline ? outlinedStyles : styles;
  buttonStyles = disabled ? disabledStyles : buttonStyles;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[buttonStyles.buttonContainer, containerStyle]}>
        {icon}
        <Text style={[buttonStyles.buttonTextStyle, textStyle]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const outlinedStyles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
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

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    borderRadius: 2,
    backgroundColor: '#29353a',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTextStyle: {
    color: '#fff',
    // borderWidth: 1,
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
