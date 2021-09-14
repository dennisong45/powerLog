import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,Button, ProgressViewIOSComponent, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';

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
    
      
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce,email } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign the user in with the credential
    //alert(identityToken + "email :" + email);
    return auth().signInWithCredential(appleCredential);
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
         source={require('./powerlog2.png')}
          style={{ justifyContent: 'center' }}
        />



            <Text> Lets Go!</Text>

            <GoogleSigninButton
                style={{width: 192, height: 48,borderRadius:25}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => onGoogleButtonPress().then(() => 
                  navigation.navigate('Power Log',{
                    userName: user.displayName,
                    userEmail: user.email,
                  }))}
              />

        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => onAppleButtonPress().then(() => 
            navigation.navigate('Power Log',{
              userName: user.displayName,
              userEmail: user.email,
            }))}
        />

        </View>
    );
  };
  const styles = StyleSheet.create({
    container:{
      backgroundColor: "#BD202F",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },


  })
  export default SignIn;