import { AsyncStorage } from 'react-native';
import * as asyncStorageConstants from '../constants/asyncStorageConstants'
import * as firebase from 'firebase';
import { Facebook } from 'expo';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  USER_LOGOUT
} from './types';


/**
Redux thunk sayesinde action fonksiyonlarını aşağıdaki gibi yazabiliriz.
export const logout = (my_params) => (dispatch) => {
  dispatch({type: ‘APP_LOGOUT_STARTED’});
  // do your async stuff (ie: network calls)
  // in some callback, you can keep dispatching:
  dispatch({type: ‘APP_LOGOUT_ENDED’})
}
*/



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

      return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: user });

    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    });

  }


};


export const googleLogin = () => {

  return async (dispatch) => {
    let token = await AsyncStorage.getItem(asyncStorageConstants.GOOGLE_TOKEN)
    if (token) {
      //dispatch Google login is already done
      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token });
    } else {
      // startup Google login process
      doFacebookLogin(dispatch);
    }
  }
}

const doGoogleLogin = async dispatch => {


  if (type === 'cancel') {
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  }

  await AsyncStorage.setItem(asyncStorageConstants.GOOGLE_TOKEN, token);
  dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token });
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
