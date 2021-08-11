import React from 'react';
import { View, Text } from 'react-native';
import { DrawerItem } from '../components/Drawer/TouchableRow';
import { MaterialIcons } from '@expo/vector-icons';

import SearchInput from './SearchInputComponent';
import { connect } from 'react-redux';
import { Store } from '../types';
import { NavigationScreenProps } from 'react-navigation';

export interface SearchScreenProps extends NavigationScreenProps, PropsFromState {}

class SearchScreen extends React.PureComponent<SearchScreenProps> {
   static navigationOptions = {
      headerTitle: <SearchInput />,
      headerRight: null,
   };

   render() {
      const { searchResults, navigation } = this.props;

      return (
         <View>
            <View key="popular searches">
               <Text style={{ color: '#333', padding: 10, fontSize: 12, fontWeight: 'bold' }}>
                  Popular Searches
               </Text>
               {searchResults.map(title => {
                  return (
                     <DrawerItem
                        onPress={() => {
                           navigation.navigate('SearchResult', { query: title.split(" ")[0] });
                        }}
                        key={title}
                        text={title}
                        leftIcon={<MaterialIcons name="search" size={24} color="#333" />}
                        underline
                     />
                  );
               })}
            </View>
         </View>
      );
   }
}

const defaultResults = ['Potatoes', 'Onions'];

type PropsFromState = {
   searchResults: string[];
};

const mapStateToProps = (state: Store): PropsFromState => {
   return {
      searchResults:
         state.products.algoliaResults.length > 0 ? state.products.algoliaResults : defaultResults,
   };
};

export default connect(mapStateToProps)(SearchScreen);

