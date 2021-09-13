import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import {View,Text,StyleSheet, ProgressViewIOSComponent, TouchableOpacity, Button, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ItemList = () =>{
    const [users, setUsers] = useState([]); // Initial empty array of users
    useEffect(() => {
        const subscriber = firestore()
          .collection('dennisongwenghan@gmail.com')

          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => { 
                if(documentSnapshot.id == "9|9|2021"){
                                    
                    users.push({
                        ...documentSnapshot.data(),
                        
                    });
                }
            });
      
            setUsers(users);

          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
    


    const myData = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [list, setList] = useState([]); // Initial empty array of users
    
    const finalData = [];
    
    for (var key in users[0]) {
        finalData.push(<View ><Text>Exercise:  {users[0][key]["exercise"]} +  {users[0][key]["number"]}</Text></View>)
    }



    return(
        <View>
            
            {finalData}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default ItemList;