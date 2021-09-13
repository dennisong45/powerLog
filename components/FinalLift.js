import React, {useState, useEffect } from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import {ImageBackground,View,Text,StyleSheet,Button,TextInput,Picker,TouchableOpacity,Image} from 'react-native';
import ListItem from './ListItem';
import AddItem from './AddItem';
import SignIn from './SignIn';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker'
import InputSpinner from "react-native-input-spinner";
import myLogo from './logo.png';
const image = { uri: "https://reactjs.org/logo-og.png" };


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

Icon.loadFont();
/* Start of Homescreen */

const FinalLift= ({route,navigation}) =>{
    const { userName, userEmail } = route.params;
    const [ todo, setTodo ] = useState(); // Single Element
    const [ todos, setTodos ] = useState(); // N Element List
    const [ repsets, setRepsets] = useState();
    const [datecompo,setDatecompo] = useState(new Date());
    const [ date, setDate] = useState(getTodayDate());
    const [opendatemodal, setOpendatemodal] = useState(false)
    const options = ["Squat", "Bench", "Deadlift"];

    const colref =  firestore().collection('todos').doc(userEmail).get();
    const ref = firestore().collection('todos'  ).doc(userEmail).collection(date);
    const [ loading, setLoading ] = useState(true);
    const [exercise,setExercise] = useState('');

    console.log(date);

    /* When Component First Mount */
    useEffect(() => {
        
         ref.onSnapshot((querySnapshot) => {
          const list = [];

            querySnapshot.forEach(doc => {
                const {title,type,rep} = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    type,
                    rep,
                })
            });
          setTodos(list);
          
          if(loading){
              setLoading(false);
          }


        });
    }, [date]);

    //Today Date
    function getTodayDate(){
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
   
        return(month + '-' + date + '-' + year);
    }
 

    // *** Add Data To FireBase ***
    async function addExercise() {
        if(todo != 0 && exercise != '' && repsets != ""){
            await ref.add({title: todo,type:exercise,rep:repsets});
            setTodo();
            setExercise('');
            setRepsets('');
        }   
    }
    
    async function deleteItem(id){

        await ref.doc(id).delete()

    }


    async function changeDateRender(){
        setOpendatemodal(true)
    }


    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('./logo.png')} resizeMode="contain" style={styles.image}>
            <View style={styles.row}>
                <View>
                    <SelectPicker style={styles.pickerStyle} placeholder="Exercise"
                        onValueChange={(value) => {
                            setExercise(value);
                        }}
                        selected={exercise}
                        fontSize={20}
                    > 
                
                    {Object.values(options).map((val, index) => (
                        <SelectPicker.Item label={val} value={val} key={index} />
                    ))} 
                    </SelectPicker>
                </View>

                <View style={styles.box} >
                    <TouchableOpacity onPress={changeDateRender}  activeOpacity={0.5}>
                    <Icon  name="calendar" size={30} />
                    </TouchableOpacity>
                </View>
                
 

                <View style={styles.box} >
                <TextInput style={styles.inputBoxInner}
                onChangeText={setRepsets}
                placeholder="10x3"
                value={repsets}
                />
                </View>

            </View>

            <View>
                <Text style={styles.welcome}> Welcome {userName} {date}</Text>
                
            </View>

            <DatePicker
                    modal
                    open={opendatemodal}
                    date={datecompo}
                    onConfirm={(datecompo) => {
                    setOpendatemodal(false)
                    setDatecompo(datecompo)
                    var y = datecompo.getFullYear();
                    var m = datecompo.getMonth()+1;
                    var d = datecompo.getDate();
                    setDate(m+"-"+d+"-"+y);

                    }}
                    mode="date"
                    locale="US"
                    onCancel={() => {
                    setOpendatemodal(false)
                    }}
                />



            <FlatList
                style={{flex: 1}}
                data={todos}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.ListItemView}>
                            <Text style={styles.ListItemText}>{ item.title } </Text>
                            <Text style={styles.ListItemText}>{ item.type } </Text>
                            <Text style={styles.ListItemText}>{ item.rep } </Text>
                            <Text style={styles.ListItemText}
                            onPress={() =>  {
                                deleteItem(item.id); 
                            }}
                            > X </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

                <View style={styles.row}>
                    <View  style={[styles.box, { margin: 30 }]} >
                        <InputSpinner
                            max={1000}
                            
                            min={0}
                            step={1}
                            speed={9}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            accelerationDelay={500}
                            value={todo}
                            skin="modern"
                            onChange={(todo) => {
                                setTodo(todo)
                            }}
                        />
                    </View>
                    <View  style={[styles.box, { margin: 30 }]} >
                    <Button title="Log!" onPress={() =>  addExercise() }></Button>
                    </View>
                </View>
                </ImageBackground>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    welcome:{
        fontSize: 24,
        textAlign: 'center', // <-- the magic
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#55BCF6',
        borderWidth: 1,
        width: 250,
      },
    inputBoxInner:{
        height:40,

        borderWidth: 0.3,
        padding: 10,
    },
    container: {
     flex: 1,
     paddingTop: 22,
     backgroundColor: '#E8EAED'
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    row: {
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
      },
    listItem: {
        padding:15,
       
        paddingBottom: 30,
        backgroundColor: '#f8f8f8',
        borderWidth: 0.2,
        borderColor: '#5e7e85',
        borderRadius: 30,
        marginBottom: 20,
      },
      textInputBox:{
          height:50,
          width:100
      },
      box: {
        height: 50,
      },
      input: {
        borderWidth: 0.5,

      },
    
    ListItemText:{
        paddingTop: 10,
        fontSize: 20,
    },
    ListItemView:{
       
        flexDirection: 'row',
        justifyContent: 'space-between',

        backgroundColor: '#f8f8f8',
        borderColor: '#eee',
    },
    image: {
        flex: 1,
        justifyContent: "center",
            
      },


  });


export default FinalLift;