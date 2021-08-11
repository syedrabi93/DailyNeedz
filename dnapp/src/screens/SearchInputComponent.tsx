import React from 'react';
import { View, TextInput, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import algoliasearch from 'algoliasearch';
import { connect } from 'react-redux';
import { algoliaSearchActions } from '../actions';
import { Dispatch } from 'redux';

const client = algoliasearch('VALHRVQ1S5', '4a498ef02dbdac71bcf95412b243a970');
const index = client.initIndex('products_index');
interface State {
   search: string;
   searchList: string[];
}

export interface SearchInputProps extends ReturnType<typeof mapDispatchToProps> {}

class SearchInput extends React.PureComponent<SearchInputProps, State> {
   state: Readonly<State> = {
      search: '',
      searchList: [],
	};
	
	
   handleText = (text: string) => {
      index.search(
         { query: text, hitsPerPage: 5, attributesToRetrieve: ['id', 'acf'] },
         (err, content) => {
            if (err) throw err;
            let productList = content.hits.map(elm => {
               return elm.acf.product_name;
            });
            this.props.addSuggestions(productList);
         }
      );
      LayoutAnimation.configureNext(LayoutAnimation.create(100, 'linear', 'opacity'));
      this.setState({ search: text });
   };
   render() {
      return (
         <View
            style={{
					backgroundColor: 'rgba(255,255,255,0.2)',
					position:"absolute",
               flex: 1,
               height: 36,
               borderRadius: 30,
               paddingHorizontal: 25,
               justifyContent: 'center',
					left: -20, right: -30,
            }}>
            <TextInput
               style={{ color: '#fff', fontFamily: 'opr', fontSize: 14, flex: 1 }}
               placeholderTextColor="#fff"
               returnKeyType="search"
               placeholder="Search"
               onChangeText={this.handleText}
               value={this.state.search}
               autoFocus
            />
            {this.state.search ? (
               <TouchableWithoutFeedback
                  onPress={() => {
                     LayoutAnimation.configureNext(
                        LayoutAnimation.create(100, 'linear', 'opacity')
                     );
                     this.setState({ search: '' });
                  }}
                  hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}>
                  <View
                     style={{
                        position: 'absolute',
                        height: 18,
                        width: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 10,
                        borderRadius: 20,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                     }}>
                     <MaterialIcons name="close" color="rgba(0,0,0,0.6)" size={14} />
                  </View>
               </TouchableWithoutFeedback>
            ) : null}
         </View>
      );
   }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
   addSuggestions: (suggestions: string[]) => {
      dispatch(algoliaSearchActions.addSearchSuggetions(suggestions));
   },
});

export default connect(
   null,
   mapDispatchToProps
)(SearchInput);
