import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {View,Text,StyleSheet,Button} from 'react-native';
import FinalLift from './components/FinalLift';
import SignIn from './components/SignIn';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import uuid from 'react-native-uuid';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';



const Stack = createStackNavigator();
/* Main Core */
const App = () =>{
  return(
  <NavigationContainer styles={styles.container}>
    <Stack.Navigator initialRouteName="SignInPage">

      <Stack.Screen name="FinalLift" component={FinalLift} />
      <Stack.Screen
       name="SignInPage"
       options={{ headerShown: false }}
       component={SignIn} 
       />
       

      
    </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop: 0,
    backgroundColor: "#155E63",
  },
})
export default App;