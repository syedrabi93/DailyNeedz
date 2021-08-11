import React from 'react';
import {
   View,
   Text,
   Platform,
} from 'react-native';
import { Touchable } from './Touchable';

export interface DNRowProps {
   leftIcon: React.ReactElement;
   rightIcon?: React.ReactElement;
   children: React.ReactNode;
   isFirst?: boolean;
   isLast?: boolean;
}

class DNRow extends React.PureComponent<DNRowProps> {
   render() {
      const { children, leftIcon, isLast = false } = this.props;
      return (
         <View
            style={{
               paddingLeft: 15,
               backgroundColor: '#fff',
               flexDirection: 'row',
               alignItems: 'stretch',
               borderColor: '#eeeef0',
            }}>
            <View
               style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
               }}>
               {leftIcon}
            </View>
            <View
               style={{
                  flex: 9,
                  justifyContent: 'center',
                  borderBottomWidth: isLast ? 0 : 1,
                  borderColor: '#eeeef0',
                  ...Platform.select({
                     ios: { paddingVertical: 15 },
                     android: { paddingVertical: 18 },
                  }),
               }}>
               <Text style={{ fontFamily: 'opr', fontSize: 14 }}>{children}</Text>
            </View>
         </View>
      );
   }
}

let TouchableDNRow = Touchable(DNRow);

export { TouchableDNRow as DNRow };
