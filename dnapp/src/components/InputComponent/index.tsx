import React from 'react';
import {
   View,
   Text,
   TextInput,
   ViewStyle,
   StyleProp,
   TextStyle,
   TextInputProps,
   StyleSheet,
} from 'react-native';

export interface DNInputProps {
	enabled?: TextInputProps['editable'];
   label?: string;
   containerStyle?: ViewStyle;
   inputContainerStyle?: ViewStyle;
   inputTextStyle?: StyleProp<TextStyle>;
   onChangeText?: (text: string) => void;
   textInputProps?: TextInputProps;
   leftIcon?: React.ReactElement;
   value?: string;
   labelStyle?: TextStyle;
   showLeftIcon?: boolean;
   autoFocus?: boolean;
   keyboardType?: TextInputProps['keyboardType'];
   returnKeyType?: TextInputProps['returnKeyType'];
   onSubmitEditing?: TextInputProps['onSubmitEditing'];
   secureTextEntry?: TextInputProps['secureTextEntry'];
   setRef?: (ref: TextInput | null) => void;
}

export default class DNInput extends React.PureComponent<DNInputProps> {
   render() {
      const {
         containerStyle,
         inputContainerStyle,
         inputTextStyle,
         label,
			labelStyle,
			enabled= true,
         leftIcon,
         onChangeText,
         textInputProps,
         value,
         showLeftIcon = false,
         autoFocus = false,
         keyboardType,
         returnKeyType,
         onSubmitEditing,
         secureTextEntry,
      } = this.props;

      return (
         <View style={[styles.containerStyle, containerStyle]}>
            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
            <View style={[styles.inputStyle, inputContainerStyle]}>
               {!showLeftIcon ? null : leftIcon ? (
                  leftIcon
               ) : (
                  <Text style={[styles.inputTextStyle, inputTextStyle]}>+91</Text>
               )}
               <TextInput
                  style={[styles.inputTextStyle, { flex: 1 }, inputTextStyle]}
                  onChangeText={onChangeText}
                  value={value}
                  autoFocus={autoFocus}
                  keyboardType={keyboardType}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={onSubmitEditing}
                  ref={this.props.setRef}
						secureTextEntry={secureTextEntry}
						editable={enabled}
                  {...textInputProps}
                  hitSlop={{ left: 10, top: 30, right: 10 }}
               />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   labelStyle: { fontFamily: 'ops', fontSize: 12, color: 'rgba(0,0,0,0.5)', marginBottom: 5 },
   inputStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: '#efefef',
      paddingBottom: 5,
   },
   inputTextStyle: { fontFamily: 'opr', fontSize: 16, color: '#444' },
   containerStyle: {
      marginTop: 10,
   },
});
