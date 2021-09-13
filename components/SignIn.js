import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,Button, ProgressViewIOSComponent, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import myLogo from './logo.png';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

 /** Google Sign In Configuration */
GoogleSignin.configure({
    webClientId: "661078123260-2mi9n4d43nl2gr8hh0omueregpgg11vs.apps.googleusercontent.com",
})



const SignIn = ({route,navigation}) =>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    /** Google Sign In Function */
    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    //After signed in 
    function onAuthStateChanged(user) {
        setUser(user);
 
        if (initializing) setInitializing(false);
    }


    return(
        <View style={styles.container}>

        <Image
         style={{width: 50, height: 50}}
         source={require('./logo.png')}
          style={{ justifyContent: 'center' }}
        />



            <Text> Lets Go!</Text>

            <GoogleSigninButton
                style={{width: 192, height: 48,borderRadius:25}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => onGoogleButtonPress().then(() => 
                  navigation.navigate('FinalLift',{
                    userName: user.displayName,
                    userEmail: user.email,
                  }))}
              />



        </View>
    );
  };
  const styles = StyleSheet.create({
    container:{
      backgroundColor: "#155E63",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },


  })
  export default SignIn;