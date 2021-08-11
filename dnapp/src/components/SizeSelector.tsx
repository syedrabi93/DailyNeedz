import React, { Component } from 'react';
import { View, Text, TouchableOpacity as TO } from 'react-native';
import { Product } from '../types';
export interface SizeSelectorProps {
   size: Product['product_size'];
   price: number;
}

export class SizeSelector extends Component<SizeSelectorProps> {
   handleChange = (selectedSize: number) => {
      this.setState({ selectedSize });
   };
   render() {
      const { size, price } = this.props;
      return (
         <View style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'wrap' }}>
            <TO onPressOut={() => {}} key={size}>
               <View
                  style={[
                     {
                        padding: 10,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderColor: '#3a85f7',
                        borderRadius: 2,
                        marginRight: 8,
                        marginBottom: 8,
                     },
                  ]}>
                  <Text
                     style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginBottom: 4,
                        color: '#3a3a3a',
                     }}>
                     {size}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9b9b9b' }}>Rs {price}</Text>
               </View>
            </TO>
         </View>
      );
   }
}
