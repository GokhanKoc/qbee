import React, { Component } from 'react';
import { SocialIcon, Button } from 'react-native-elements';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

// FIREBASE RELATED ITEMS
import firebase from '../../components/Firebase';


class SignUpScreen extends Component {


  facebookLogin = () => {

    if (firebase.auth().currentUser) {
        // User is signed in.
        console.log("ALREADY LOGGEDIN");
        this.props.navigation.navigate('home');

    } else {
        // No user is signed in.
        console.log("FACEBOOK LOGIN");
        this.props.facebookLogin();

    }

  }

  //TODO Google login halledilmeli
  googleLogin = async () => {

    if (firebase.auth().currentUser) {
        // User is signed in.
        console.log("ALREADY LOGGEDIN");
        this.props.navigation.navigate('home');
    } else {
        // No user is signed in.
        console.log("GOOGLE LOGIN");
        this.props.googleLogin();
    }

  }


  createAccountWithEmail = () => {
    // EMAIL REGISTER
    console.log("EMAIL REGISTER");
    this.props.navigation.navigate('createAccount');
  }


  loginWithEmail = () => {

    if (firebase.auth().currentUser) {
        // User is signed in.
        console.log("ALREADY LOGGEDIN");
        this.props.navigation.navigate('home');

    } else {
        // No user is signed in.
        console.log("LOGIN WITH EMAIL");
        this.props.navigation.navigate('loginWithEmail');
    }

  }



  logOut = () => {

    // LOGIN WITH EMAIL
    console.log("LOGOUT");

    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
      this.props.dispatchLogOut();

    }, function(error) {
      console.log("Logout Failed!", error);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete (props) {
    if (props.auth.uid) {
      this.props.navigation.navigate('home');
    }
  }


  render() {
      return (
          <View style={styles.wrapper}>
            <Image
              source={require('../../images/sign-up-bg.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.container}>
                <View style={styles.bottom}>

                  <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={this.facebookLogin}
                    buttonStyle= { styles.facebookButton }
                  />
                  <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google-plus-official'
                    onPress={this.googleLogin}
                    buttonStyle= { styles.facebookButton }
                  />
                  <Button
                    buttonStyle={{backgroundColor: 'red', borderRadius: 20}}
                    textStyle={{textAlign: 'center'}}
                    title={`CREATE ACCOUNT`}
                    onPress={this.createAccountWithEmail}
                  />

                  <View style={styles.separationContainer}>
                    <View style={styles.divider}/>
                    <View style={styles.dividerCenter}>
                      <Text style={styles.dividerText}>OR</Text>
                    </View>
                    <View style={styles.divider}/>
                  </View>

                  <Button
                    buttonStyle={[styles.button, styles.loginButton]}
                    textStyle={{textAlign: 'center'}}
                    title={`LOGIN`}
                    onPress={this.loginWithEmail}
                  />
                  <Button
                    buttonStyle={[styles.button, styles.loginButton]}
                    textStyle={{textAlign: 'center'}}
                    title={`LOGOUT`}
                    onPress={this.logOut}
                  />
                </View>
              </View>
            </Image>
          </View>
      );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        flexDirection: "column"
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        margin: 20,
        marginBottom: 80
    },
    input: {
        fontSize: 20,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        backgroundColor: "#EEE",
        borderRadius: 5
    },
    loginButton: {
        backgroundColor: "#FFC107",
        borderWidth: 0
    },
    facebookButton: {
        borderColor: "#3b5998"
    },
    button: {
        justifyContent: 'center',
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10
    },
    separationContainer: {
        flexDirection: 'row',
        height: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        height: 1,
        width: 30,
        borderBottomWidth: 1
    },
    dividerCenter: {
        marginLeft: 5,
        marginRight: 5
    },
    dividerText: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
