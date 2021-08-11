import React from 'react';
import { Screen, DNRowHeader, DNExpandableRow } from '../components';
import { Text, ScrollView } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';

class HelpScreen extends React.PureComponent {
   static navigationOptions: NavigationScreenOptions = {
      headerTitle: 'Need Help?',
   };

   render() {
      return (
         <Screen style={{ backgroundColor: '#f9f9f9' }}>
            <ScrollView>
               <DNRowHeader>Placing An Order</DNRowHeader>
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 14,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNRowHeader>Delivery Related Queries</DNRowHeader>
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNRowHeader>Cancellation And Returns</DNRowHeader>
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
               <DNExpandableRow
                  elevated
                  title="How can i be sure that the fruits and vegetables I order are of good quality?"
                  hiddenComp={
                     <Text
                        style={{
                           fontFamily: 'opr',
                           color: '#444',
                           fontSize: 12,
                           paddingHorizontal: 20,
                           paddingBottom: 20,
                        }}>
                        Our fruits and vegetables vendors have a quality check process in place to
                        ensure quality of the items of delivered in upto the mark. Do let us know in
                        24 hours if you're not happy with the quality of Product received.
                     </Text>
                  }
               />
            </ScrollView>
         </Screen>
      );
   }
}

export default HelpScreen;
