import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {View,Text,StyleSheet,Button} from 'react-native';
import ListItem from './components/ListItem';
import FinalLift from './components/FinalLift';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import SignIn from './components/SignIn';
import HomeScreen from './components/HomeScreen'
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
      <Stack.Screen name="Lift" component={HomeScreen} />
      <Stack.Screen name="FinalLift" component={FinalLift} />
      <Stack.Screen
       name="SignInPage"
       options={{ headerShown: false }}
       component={SignIn} 
       />
       
      <Stack.Screen
       name="ItemList" 
       component={ItemList} 
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