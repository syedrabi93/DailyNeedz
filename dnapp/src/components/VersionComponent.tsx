import React from 'react';
import { View, Text } from 'react-native';

class VersionComponent extends React.PureComponent {
   render() {
      return (
         <View
            style={{
               flex: 1,
               borderTopWidth: 1,
               borderColor: '#eeeef0',
               alignItems: 'center',
					paddingTop: 30,
					paddingBottom: 40
            }}>
            <View style={{ width: 280,}}>
               <Text style={{ color: '#848c8f', fontSize:12,fontFamily: 'opr', textAlign: "center" }}>
						<Text style={{fontFamily: 'ops'}}>DailyNeedz v0.1.1</Text> was crafted with love in Mohali and all across the planet Earth
               </Text>
            </View>
         </View>
      );
   }
}

export default VersionComponent;
