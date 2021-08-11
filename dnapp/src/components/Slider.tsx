import React from 'react';
import {
   View,
   ViewPagerAndroid,
   ScrollView,
   Dimensions,
   Platform,
   Image,
   StyleSheet,
} from 'react-native';
const isIOS = Platform.OS === 'ios';



export interface SliderProps {
   slides:string[];
}

const sw = Dimensions.get('window').width;

class Slider extends React.PureComponent<SliderProps> {
   render() {
      const { slides } = this.props;
      return (
         <View style={styles.sliderContainer}>
            {isIOS ? (
               <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
                  {slides.map((slide,key) => {
                     return (
                        <View key={key} style={styles.slide}>
                           <View style={styles.sliderItem}>
                              <Image
                                 source={{
                                    uri: slide,
                                    cache: "default",
                                 }}
                                 style={{
                                    height: 250,
                                    width: sw,
                                 }}
                              />
                           </View>
                        </View>
                     );
                  })}
               </ScrollView>
            ) : (
               <ViewPagerAndroid style={{ flex: 1 }}>
                  {slides.map((slide, id) => {
                     return (
                        <View style={[styles.viewslide]} key={id}>
                           <View style={[styles.viewsliderItem]}>
                              <Image
                                 source={{
												cache:"force-cache",
                                    uri: slide,
                                    height: 300,
                                    width: sw - 40,
                                 }}
                              />
                           </View>
                        </View>
                     );
                  })}
               </ViewPagerAndroid>
            )}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   sliderContainer: {
      height: 300,
      // backgroundColor: '#fff',
   },
   viewsliderItem: {
      flex: 1,
      borderRadius: 4,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
      elevation: 2,
   },
   viewslide: {
      flex: 1,
   },
   sliderItem: {
      flex: 1,
      borderRadius: 4,
      overflow: 'hidden',
      height: 250,
      elevation: 2,
      shadowOffset: { height: 2, width: 2 },
      shadowColor: '#d9d9d9',
      shadowOpacity: 0.4,
      shadowRadius: 4,
   },
   slide: {
      width: sw,
      padding: 20,
   },
} as StyleSheet.NamedStyles<any>);

export { Slider };
