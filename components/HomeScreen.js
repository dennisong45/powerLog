import React, {useState, useEffect } from 'react';
import {FlatList} from 'react-native';
import {View,Text,StyleSheet,Button} from 'react-native';
import ListItem from './ListItem';
import AddItem from './AddItem';
import SignIn from './SignIn';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import uuid from 'react-native-uuid';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

Icon.loadFont();
/* Start of Homescreen */
const HomeScreen= ({route,navigation}) =>{
  const { userName, userEmail } = route.params;
  
  var resetDisplay = false;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  var final = (mm + '|' + dd + '|' + yyyy);


  const [liftz, setLiftz] = useState([]); // Initial empty array of users
  useEffect(() => {
      const subscriber = firestore()
        .collection('dennisongwenghan@gmail.com')

        .onSnapshot(querySnapshot => {
          const users = [];
    
          querySnapshot.forEach(documentSnapshot => { 
              if(documentSnapshot.id == final){
                                  
                liftz.push({
                      ...documentSnapshot.data(),
                      
                  });
              }
          });
    
          setLiftz(liftz);

        });
    
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);




  const [lifts,setLifts] = useState([
    {id:uuid.v4(),numb:240,exercise:"Squat"},
    {id:uuid.v4(),numb:265,exercise:"Bench Press"},
    {id:uuid.v4(),numb:350,exercise:"Deadlift"},    
    ]);

    const deleteItem = id => {
      setLifts(prevLifts=>{
        return prevLifts.filter(lifts => lifts.id !== id);
      });
    };


    const addItemFunction = async (numb,exercise) =>{

    
     /* For Preview Mode 
     setLifts(prevLifts=>{
      return [{id:uuid.v4(),numb,exercise}, ...prevLifts];
    });*/
    
   
       firestore().collection(userEmail).get().then((snap) =>{
         if(!snap.empty){

           var finalID = uuid.v4();
            //If this date does not exist, you have to use method add
            // If exist you use method add.
           firestore().collection(userEmail).doc(final).update({
              [finalID]:{
                  id: [finalID],
                exercise:[exercise],
                number:[numb],
              }
            }).then(() =>{
              
              const list =  firestore().collection(userEmail).doc(final).onSnapshot(doc=>{
                console.log('user_added');
              }) // To do list foreach key and push
              resetDisplay = true;
            });
         }else{
           console.log("emptyy");
         }
       })
    }
  
  


    
   
   
 /*
     async function getData() => {
      try{
        const docuSnapshot = await firebase.firestore().collection(userEmail).doc('9|1|2021').get();
        console.log("document" + docuSnapshot);
      } catch(e){
        console.log(e);
      }
    }
*/

const finalData = [];
    
for (var key in liftz[0]) {
    finalData.push(<View ><Text>Exercise:  {liftz[0][key]["exercise"]} +  {liftz[0][key]["number"]}</Text></View>)
}

  return(
    <View style=  {styles.container}>
      <Text style={styles.textMiddle}>
        Welcome back {userName}
      </Text>
  
      {finalData}
        <AddItem  addItemFunction={addItemFunction}/>

    </View>
  );
};


const styles = StyleSheet.create({
    container:{
      paddingTop: 0,
    },
    textMiddle:{
      textAlign: 'center',
    }
  })
export default HomeScreen;
/* End of Homescreen */