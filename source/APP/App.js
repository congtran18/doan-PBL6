import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import Login from './screens/LoginScreen';
import SignUp from './screens/SignUpScreen';
import CartScreen from './screens/CartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import HeaderScreen from './screens/HeaderScreen';
export default function App()  {
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator   /*screenOptions={{
    headerShown: false}}*/>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
