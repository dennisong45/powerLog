import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {View,Text,StyleSheet, ProgressViewIOSComponent, TouchableOpacity} from 'react-native';

const ListItem = ({
    item,
    deleteItem,
    }) =>{
    return(
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.ListItemView}>
                <Text style={styles.ListItemText}> {item.numb} </Text>
                <Text style={styles.ListItemText}> {item.exercise} </Text> 
                <Icon  style={styles.iconView} color="firebrick" name="trash" size={20} 
                    onPress={() =>  {

                        deleteItem(item.id); 

                    }}
                />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
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
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 20,
      },

  })

export default ListItem;