import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback as TW } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export interface IncDecProps {
   count: number;
   onInc: () => void;
   onDec: () => void;
}

interface IncDecState {
   count: number;
}

class IncDec extends Component<IncDecProps, IncDecState> {

   handleIncrement = () => {
		this.props.onInc()
		
   };
   handleDecrement = () => {
		this.props.onDec()
   };

   render() {
      const { count } = this.props;
		const hitSlop = { top: 4, left: 4, right: 4, bottom: 4 };
      if (count === 0) {
         return (
            <TW onPress={this.handleIncrement} hitSlop={hitSlop}>
               <View
                  style={{
                     borderRadius: 3,
                     backgroundColor: '#29353a',
                     alignItems: 'center',
                     width: 85,
                     height: 33,
                     justifyContent: 'center',
                  }}>
                  <Text style={{ color: '#fff' }}>Add</Text>
               </View>
            </TW>
         );
      }

      return (
         <View style={[styles.incDecContainer, { width: 100, height: 33 }]}>
            <TW onPress={this.handleDecrement} hitSlop={hitSlop}>
               <View style={[styles.plus]}>
                  <Entypo name="minus" size={12} color="#29353a" />
               </View>
            </TW>
            <View style={{ justifyContent: 'center' }}>
               <Text style={{ fontSize: 14 }}>{count}</Text>
            </View>
            <TW onPress={this.handleIncrement} hitSlop={hitSlop}>
               <View style={[styles.plus]}>
                  <Entypo name="plus" size={12} color="#29353a" />
               </View>
            </TW>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   incDecContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      // borderWidth: 2,
      borderColor: '#29353a',
      // borderRadius: 3,
   },
   plus: {
      padding: 3,
      paddingHorizontal: 7,
      borderRadius: 3,
      justifyContent: 'center',
      borderWidth: 2,
   },
});

export { IncDec };
