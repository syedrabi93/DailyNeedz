import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Reg } from './StyledText/Reg';

export interface CategoryContainerComponentProps {
   categories: string[];
}

class CategoryContainerComponent extends React.PureComponent<CategoryContainerComponentProps> {
   render() {
      const { categories } = this.props;

      return (
         <View
            style={{
               flexDirection: 'row',
               padding: 20,
               flexWrap: 'wrap',
               justifyContent: 'space-around',
            }}>
            {categories.map(val => {
               return (
                  <View
                     key={val}
                     style={{
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        paddingLeft: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: '#d9d9d9',
                        borderRadius: 2,
                        flexDirection: 'row',
                        marginBottom: 20,
                        width: 160,
                        height: 70,
                     }}>
                     <View style={{ width: 20, marginRight: 10 }}>
                        <MaterialCommunityIcons name="google" size={18} />
                     </View>
                     <View style={{ flex: 1 }}>
                        <Reg>{val}</Reg>
                     </View>
                  </View>
               );
            })}
         </View>
      );
   }
}

export { CategoryContainerComponent };
