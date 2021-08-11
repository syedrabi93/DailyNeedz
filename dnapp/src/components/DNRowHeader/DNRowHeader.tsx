import React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';

export interface DNRowHeaderProps {
   children: string;
   style?: TextStyle;
   containerStyle?: ViewStyle;
   upperCase?: boolean;
}

class DNRowHeader extends React.PureComponent<DNRowHeaderProps> {
   render() {
      const { containerStyle, style, children, upperCase = false } = this.props;
      return (
         <View
            style={[
               {
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderColor: '#eeeef0',
                  backgroundColor: '#f9f9f9',
                  borderTopWidth: 1,
               },
               containerStyle,
            ]}>
            <Text style={[{ fontFamily: 'ops', color: '#848c8f' }, style]}>
               {upperCase ? children.toUpperCase() : children}
            </Text>
         </View>
      );
   }
}

export { DNRowHeader };
