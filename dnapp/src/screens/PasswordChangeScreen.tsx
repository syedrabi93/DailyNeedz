import React from 'react';
import { Screen, DNRowHeader, Button } from '../components';
import DNInput from '../components/InputComponent';
import {
   View,
   KeyboardAvoidingView,
   ScrollView,
   Keyboard,
   EmitterSubscription,
} from 'react-native';
import { Header } from 'react-navigation';

class PasswordChangeScreen extends React.PureComponent {
   static navigationOptions = {};
   scrollView: ScrollView | null = null;
   keyboardWillShowSub: EmitterSubscription | null = null;
   keyboardWillHideSub: EmitterSubscription | null = null;
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
   }

   componentWillUnmount() {
      this.keyboardWillShowSub!.remove();
      this.keyboardWillHideSub!.remove();
   }
   keyboardWillShow = () => {
      setTimeout(() => {
         this.scrollView!.scrollToEnd({ animated: true });
      }, 50);
   };
   keyboardWillHide = () => {};
   render() {
      return (
         <Screen>
            <DNRowHeader>Update your Password</DNRowHeader>
            <KeyboardAvoidingView
               behavior="padding"
               keyboardVerticalOffset={Header.HEIGHT + 34}
               style={{ flex: 1 }}>
               <ScrollView
                  showsVerticalScrollIndicator={false}
                  ref={ref => {
                     this.scrollView = ref;
                  }}
                  keyboardShouldPersistTaps="always">
                  <View style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 20 }}>
                     <DNInput label="Old Password" secureTextEntry returnKeyType="next" />
                     <DNInput label="New Password" returnKeyType="next" secureTextEntry />
                     <DNInput label="Confirm Password" returnKeyType="done" secureTextEntry />
                     <Button
                        upperCase
                        textStyle={{ letterSpacing: 1 }}
                        containerStyle={{ marginTop: 20, alignItems: 'center' }}>
                        Update Password
                     </Button>
                  </View>
               </ScrollView>
            </KeyboardAvoidingView>
         </Screen>
      );
   }
}

export default PasswordChangeScreen;
