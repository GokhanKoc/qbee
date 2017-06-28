import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity } from 'react-native';


class SignUpScreen extends Component {

  facebookLogin = () => {
    // FACEBOOK LOGIN
    console.log("FACEBOOK LOGIN");
  }


  googleLogin = () => {
    // GOOGLE LOGIN
    console.log("GOOGLE LOGIN");
  }


  createAccountWithEmail = () => {
    // EMAIL REGISTER
    console.log("EMAIL REGISTER");
    this.props.navigation.navigate('createAccount');
  }


  loginWithEmail = () => {
    // LOGIN WITH EMAIL
    console.log("LOGIN WITH EMAIL");
    this.props.navigation.navigate('loginWithEmail');

  }


  render() {
      return (
          <View style={styles.wrapper}>
            <Image
              source={require('../../images/sign-up-bg.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.container}>
                <View style={styles.bottom}>
                  <TouchableOpacity style={[styles.facebookButton, styles.button]} onPress={this.facebookLogin} >
                    <Text style={styles.facebookButtonText}>CONTINUE WITH FACEBOOK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.facebookButton, styles.button]} onPress={this.googleLogin}>
                    <Text style={styles.facebookButtonText}>CONTINUE WITH GOOGLE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button]} onPress={this.createAccountWithEmail}>
                    <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
                  </TouchableOpacity>
                  <View style={styles.separationContainer}>
                    <View style={styles.divider}/>
                    <View style={styles.dividerCenter}>
                      <Text style={styles.dividerText}>OR</Text>
                    </View>
                    <View style={styles.divider}/>
                  </View>
                  <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={this.loginWithEmail} >
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Image>
          </View>
      );
  }
}

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
    facebookButtonText: {
        fontSize: 20,
        color: "#3b5998",
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10
    },
    signUpButtonText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10
    },
    loginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10
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
    },
    termsOfServiceText: {
        margin: 10,
        fontSize: 10,
        fontWeight: 'bold'
    }
});

export default SignUpScreen;
