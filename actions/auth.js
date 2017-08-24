import { AsyncStorage } from 'react-native';
import * as asyncStorageConstants from '../constants/asyncStorageConstants'
import * as firebase from 'firebase';
import { Facebook, Google } from 'expo';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  USER_LOGOUT
} from './types';


export const facebookLogin = () => async dispatch => {
    doFacebookLogin(dispatch);
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('106342363328221', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).then((user) => {

      firebase.database().ref('users/').child(user.uid).update({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })

      return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: user });

    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    });

  }


};


export const googleLogin = () => async dispatch => {
    doGoogleLogin(dispatch);
};


const doGoogleLogin = async dispatch => {

  try {

    const result = await Google.logInAsync({
           androidClientId: '672453373918-7p5q8m628oiqmqjlg1k60h9e9g5itf12.apps.googleusercontent.com',
           iosClientId: '672453373918-vbbu7fk0ovu2vsn0pj54mkl2o9a0nj59.apps.googleusercontent.com',
           scopes: ['profile', 'email'],
         });

    if (result.type != 'success') {
      return dispatch({ type: GOOGLE_LOGIN_FAIL });
    }


    if (result.type === 'success') {
      // Build Firebase credential with the Google access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);

      // Sign in with credential from the Google user.
      let user = await firebase.auth().signInWithCredential(credential);

      let userInfos= await firebase.database().ref('users/').child(user.uid).once('value');

      if(!userInfos.val() && !userInfos.val().registered) {
      //if(!checkUserIfRegister(user.uid)) {
        firebase.database().ref('users/').child(user.uid).set({
            registered: false,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
      }
      return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: user });

    }



  } catch(error) {
    console.log(error);
    return dispatch({ type: GOOGLE_LOGIN_FAIL });

  }

}



export const createAccountWithEmail = (email,password) => {

  return async (dispatch) => {
    let token = await AsyncStorage.getItem(asyncStorageConstants.EMAIL_TOKEN)
    if (token) {
      //dispatch Email login is already done
      dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: token });
    } else {
      // login process
      createAccount(email,password,dispatch);
    }
  }
}

const createAccount = async (email,password,dispatch) => {

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password) ;
    console.log('successfully logged in');

  } catch (error) {
    console.log("Login Failed!", error.code,error.message);
    return dispatch({ type: EMAIL_LOGIN_FAIL });
  }


  let user = firebase.auth().currentUser;
  console.log("USERRRR"+user);
  //await AsyncStorage.setItem(asyncStorageConstants.EMAIL_TOKEN,user );
  dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: user });


}



export const emailLogin = (email,password) => async dispatch => {

  let authData = await AsyncStorage.getItem(asyncStorageConstants.AUTH_DATA);
  if(authData) {
    dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: token });
  } else {

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password) ;
      console.log('successfully logged in');

    } catch (error) {
      console.log("Login Failed!", error.code,error.message);
      return dispatch({ type: EMAIL_LOGIN_FAIL });
    }


    let user = firebase.auth().currentUser;
    console.log("USER"+user);
    //await AsyncStorage.setItem(asyncStorageConstants.EMAIL_TOKEN,user );
    dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: user });

  }
}



const doEmailLogin = async (email,password,dispatch) => {

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password) ;
    console.log('successfully logged in');

  } catch (error) {
    console.log("Login Failed!", error.code,error.message);
    return dispatch({ type: EMAIL_LOGIN_FAIL });
  }


  let user = firebase.auth().currentUser;
  console.log("USERRRR"+user);
  //await AsyncStorage.setItem(asyncStorageConstants.EMAIL_TOKEN,user );
  dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: user });

}


export const dispatchLogOut = () => (dispatch) => {
  dispatch({type: USER_LOGOUT})
}
