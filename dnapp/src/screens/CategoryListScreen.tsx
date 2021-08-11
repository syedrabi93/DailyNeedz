import React from 'react';
import { Screen, DNRowHeader, DNExpandableRow } from '../components';
import { ScrollView, ActivityIndicator } from 'react-native';
import { wpapi } from '../axios';
import _ from 'lodash';
import { NavigationScreenProps } from 'react-navigation';

interface Category {
   id: number;
   name: string;
   parent: number;
   child?: number[];
}

interface CategoryList {
   [x: string]: Category;
}

interface State {
   categories: CategoryList;
   isReady: boolean;
}

class CategoryListScreen extends React.PureComponent<NavigationScreenProps, State> {
   state: Readonly<State> = {
      categories: {},
      isReady: false,
   };

   static navigationOptions = {
      headerTitle: 'Daily Needz',
   };

   async componentWillMount() {
      try {
         const { data } = await wpapi.get('/categories');
         let categories: CategoryList = {};
         (data as Array<any>).forEach(({ id, name, parent }: Category) => {
            categories[id] = { id, name, parent };
         });

         this.setState({ categories, isReady: true });
      } catch (e) {
      }
   }

   render() {
      const { navigation } = this.props;
      const { categories, isReady } = this.state;
      if (!isReady)
         return (
            <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
               <ActivityIndicator size="large" color="#009ddc" />
            </Screen>
         );
      return (
         <Screen>
            <ScrollView>
               <DNRowHeader
                  style={{ fontSize: 18, color: '#333' }}
                  containerStyle={{
                     paddingVertical: 15,
                     borderBottomWidth: 0,
                  }}>
                  Shop By Category
               </DNRowHeader>

               {_.map(categories, (category, key) => {
                  return (
                     <DNExpandableRow
                        key={key}
                        title={category.name}
                        onPress={() => {
                           navigation.navigate('SearchResult', { category });
                        }}
                     />
                  );
               })}
            </ScrollView>
         </Screen>
      );
   }
}

export default CategoryListScreen;
