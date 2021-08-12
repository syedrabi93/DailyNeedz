import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback as TW, StyleSheet } from 'react-native';
import { IncDec as Add } from './Buttons/IncDec';
import { connect } from 'react-redux';
import { Store, Product } from '../types';
import { cartActions, incDecActions } from '../actions';
import { Dispatch } from 'redux';

export interface CardItemProps {
   productId: string;
   onPress?: () => void;
}

class CartItem extends React.PureComponent<CardItemProps & PropsFromState & PropsFromDispatch> {
   handleIncrement = () => {
      if (this.props.product.product_count === 0) {
         this.props.addToCart(this.props.productId);
      } else {
         this.props.incrementCartItem(this.props.productId);
      }
   };
   handleDecrement = () => {
      if (this.props.product.product_count === 1) {
         this.props.removeFromCart(this.props.productId);
      } else {
         this.props.decrementCartItem(this.props.productId);
      }
   };

   render() {
      const {
         product_brand_name = 'Navi',
         product_name = 'MyItem',
         product_size,
         product_image = {url: ''},
         product_mrp,
      } = this.props.product;
      const { onPress = () => {}, count = 0 } = this.props;
      return (
         <TW onPress={onPress}>
            <View style={styles.cardItemContainer}>
               <View key="image">
                  <Image
                     source={{ uri: product_image.url, cache: 'force-cache' }}
                     style={styles.imageStyle}
                  />
               </View>
               <View key="info" style={styles.infoContainer}>
                  <Text style={styles.titleStyle}>
                     {product_brand_name} - {product_name}
                  </Text>
                  <View style={styles.cardItemBodyContainer}>
                     <View style={{ alignItems: 'flex-start' }}>
                        <Text style={styles.sizeStyle}>{product_size}</Text>
                        <Text style={styles.priceStyle}>Rs {product_mrp}</Text>
                     </View>
                     <View>
                        <Add
                           count={count}
                           onInc={this.handleIncrement}
                           onDec={this.handleDecrement}
                        />
                     </View>
                  </View>
               </View>
            </View>
         </TW>
      );
   }
}

const styles = StyleSheet.create({
   cardItemContainer: {
      padding: 10,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#d9d9d9',
      backgroundColor: '#fff',
   },
   titleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   cardItemBodyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
   },
   sizeStyle: {
      color: '#333',
      fontWeight: '300',
      marginBottom: 5,
   },
   priceStyle: {
      color: 'rgba(107, 185, 240, 1)',
      fontWeight: 'bold',
   },
   infoContainer: { flex: 1, padding: 10 },
   imageStyle: { width: 100, height: 100 },
});

interface PropsFromState {
   product: Product;
   count: number;
}

interface PropsFromDispatch {
   incrementCartItem: (productId: string) => void;
   decrementCartItem: (productId: string) => void;
   addToCart: (productId: string) => void;
   removeFromCart: (productId: string) => void;
}

const mapStateToProps = (state: Store, ownProps: CardItemProps): PropsFromState => {
   let product = state.products.fetchProducts.listById[ownProps.productId];
 
   return {
      product: product,
      count: product.product_count,
   };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
   return {
      incrementCartItem: (productId: string) => {
         dispatch(incDecActions.incrementCartItem(productId));
      },
      decrementCartItem: (productId: string) => {
         dispatch(incDecActions.decrementCartItem(productId));
      },
      addToCart: (productId: string) => {
         dispatch(cartActions.addToCart(productId));
      },
      removeFromCart: (productId: string) => {
         dispatch(cartActions.removeFromCart(productId));
      },
   };
};

let ConnectedComponent = connect(
   mapStateToProps,
   mapDispatchToProps
)(CartItem);

export { ConnectedComponent as CartItemComponent };
