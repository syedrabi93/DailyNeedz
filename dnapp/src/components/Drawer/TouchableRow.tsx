import React from 'react';
import {
   View,
   Text,
   TouchableHighlight as TH,
   TouchableNativeFeedback as TN,
   Platform,
   StyleSheet,
} from 'react-native';

const isIos = Platform.OS === 'ios' ? true : false;

interface DrawerItemProps {
   onPress?: () => void;
   leftIcon: any;
   rightIcon?: any;
   text: string;
   disabled?: boolean;
   underline?: boolean;
}
export class DrawerItem extends React.PureComponent<DrawerItemProps> {
   renderInnerComponent() {
      const { disabled = false, underline = false, leftIcon, rightIcon, text } = this.props;
      const extraStyles = disabled ? styles.disabledText : {};
      const underLineStyles = underline ? styles.underLineStyles : {};
      return (
         <View style={[styles.drawerItem, underLineStyles]}>
            <View style={styles.left}>{leftIcon}</View>
            <View style={{ flex: 10, justifyContent: 'center' }}>
               <Text style={[styles.middleText, extraStyles]}>{text}</Text>
            </View>
            <View style={styles.left}>{rightIcon ? rightIcon : null}</View>
         </View>
      );
   }

   render() {
      const { onPress = () => {}, disabled = false } = this.props;

      if (isIos) {
         return (
            <TH underlayColor="rgba(0,0,0,0.04)" onPress={onPress} disabled={disabled}>
               {this.renderInnerComponent()}
            </TH>
         );
      } else {
         return (
            <TN onPress={onPress} delayPressOut={100} disabled={disabled}>
               {this.renderInnerComponent()}
            </TN>
         );
      }
   }
}

const styles = StyleSheet.create({
   drawerItem: {
      flexDirection: 'row',
      paddingVertical: 20,
      alignItems: 'stretch',
   },
   left: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   middleText: {
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.7)',
      fontSize: 12,
      flexDirection: 'row',
      alignItems: 'center',
   },
   underLineStyles: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ebebeb' },
   disabledText: {
      color: 'rgba(0,0,0,0.2)',
   },
});
