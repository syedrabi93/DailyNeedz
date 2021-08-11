import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Button } from '../Button';
import { StyleSheet } from 'react-native';

const LoginButton = ({
   children = 'Phone',
   color = '#333',
   iconName = 'phone',
   onPress = () => {},
}) => (
   <Button
      onPress={onPress}
      containerStyle={styles.buttonStyles}
      textStyle={{
         color,
         fontSize: 16,
         fontWeight: 'bold',
      }}
      icon={<Entypo name={iconName} style={{ marginRight: 15 }} color={color} size={16} />}>
      {children}
   </Button>
);

const styles = StyleSheet.create({
   buttonStyles: {
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      backgroundColor: '#fff',
      shadowColor: '#333',
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 1,
      shadowOpacity: 0.2,
      marginBottom: 20,
   },
});
export { LoginButton };
