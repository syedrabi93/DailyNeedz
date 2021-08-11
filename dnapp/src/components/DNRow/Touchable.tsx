import React from 'react';
import { View, TouchableNativeFeedback as TN, TouchableHighlight as TH } from 'react-native';
import { isIos } from '../../constants';

export interface TouchableProps {
   onPress?: () => void;
}
export const Touchable = <P extends object>(Component: React.ComponentType<P>) => {
   return class withTouch extends React.PureComponent<P & TouchableProps> {
      render() {
         const {
            onPress = () => {
               console.log('hello');
            },
            ...props
         } = this.props;
         if (isIos) {
            return (
					<TH onPress={onPress} delayPressOut={200} underlayColor="rgba(0,0,0,0.5)">
                  <View style={{ backgroundColor: '#fff' }}>
                     <Component {...props as P} />
                  </View>
               </TH>
            );
         } else {
            return (
               <TN useForeground onPress={onPress} delayPressOut={200}>
                  <View>
                     <Component {...props as P} />
                  </View>
               </TN>
            );
         }
      }
   };
};
