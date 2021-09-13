import React from 'react';
import {View,Text,StyleSheet, ProgressViewIOSComponent} from 'react-native';

const Header = ({title}) =>{
    return(
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

Header.defaultProps= {
    title: "LIFT HEAVY STFU",
}

const styles = StyleSheet.create({
    header:{
      height:60,
      padding: 15,
      backgroundColor:"grey",
    },
    title:{
        fontSize: 23,
        textAlign:'center',
        color: 'black',
    }

  })

export default Header;