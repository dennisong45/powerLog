import React, {useState} from 'react';
import SelectPicker from 'react-native-form-select-picker';
import {View,Text,StyleSheet, ProgressViewIOSComponent, TouchableOpacity,TextInput, Button} from 'react-native';

const AddItem = ({addItemFunction}) =>{
    const [text, setText] = useState('');
    const [exercise,setExercise] = useState('');
    const options = ["Squat", "Bench", "Deadlift"];
    const onChange = textValue => {
        setText(textValue);
    }

    const setSelected = textValue => {
        setExercise(textValue);
    }
    return(
        <View >
            <TextInput onChangeText={onChange} value={text} style={styles.input} placeholder="Add Item..." />
           
            <SelectPicker style={styles.pickerStyle} placeholder="Exercise"
            		onValueChange={(value) => {
                        // Do anything you want with the value. 
                        // For example, save in state.
                        setSelected(value);
                    }}
                    selected={exercise}
                    
            
            > 
            
			{Object.values(options).map((val, index) => (
				<SelectPicker.Item label={val} value={val} key={index} />
			))} 
            </SelectPicker>
           
            <TouchableOpacity 
            style={styles.btn} 
            onPress={() =>  {

                addItemFunction(text,exercise); 
                setText('');
            }}
            
            >
            
                <Text style={styles.btnText}>
                    ADD ITEM
                </Text>
            
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        margin: 5,
      },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
      },
    btnText: {
        color: 'darkslateblue',
        fontSize: 30,
        textAlign: 'center',
      },
    placeHolderStyle:{
        fontSize: 25,
        color:'#757575'
    },



})


export default AddItem;