'use strict';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Platform,
  Dimensions
} from 'react-native';
import { FormInput, Button } from 'react-native-elements';


class LoginWithEmailScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: null
        }
    }

    onMailChange = (text) => {
        this.setState({
            email: text,
            errorMessage: null
        })
    }

    onItemFocus = () => {
        this.setState({
            errorMessage: null
        })
    }

    onPasswordChange = (text) => {
        this.setState({
            password: text,
            errorMessage: null
        })
    }

    validateForm() {
        return this.state.password && this.state.email
    }

    loginWithEmail = () => {

      if(!this.validateForm){
          this.setState({errorMessage: "Please fill in all the fields"});
          return;
      }

      this.props.emailLogin(this.state.email, this.state.password);
      this.props.navigation.navigate('home')
    }

    render() {
        return (
            <View style={styles.container}>
              <Image
                source={require('../../images/bg-login.jpg')}
                style={styles.backgroundImage}>
                <View style={styles.bottom}>
                  <View style={styles.form}>

                    <FormInput
                      ref='forminput'
                      textInputRef='email'
                      style={styles.input}
                      onChangeText={this.onMailChange}
                      onFocus={this.onItemFocus}
                      value={this.state.email}
                      keyboardType="email-address"
                      placeholder="email"
                    />
                    <FormInput
                      ref='forminput'
                      textInputRef='email'
                      style={styles.input}
                      onChangeText={this.onPasswordChange}
                      onFocus={this.onItemFocus}
                      value={this.state.password}
                      placeholder="password"
                      secureTextEntry={true}
                    />
                    <Button
                      buttonStyle={styles.submitButton}
                      textStyle={{textAlign: 'center'}}
                      title={`SIGN IN`}
                      onPress={this.loginWithEmail}
                    />
                    <Button
                      buttonStyle={styles.forgotPasswordButton}
                      textStyle={{textAlign: 'center'}}
                      title={`FORGOT PASSWORD?`}
                      onPress={() => this.props.navigation.navigate('forgotEmail')}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmailScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    form: {
        marginBottom: 50
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        height: Dimensions.get('window').height / 2,
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        height: 60,
        fontSize: 20,
        borderColor: 'gray',
        margin: 10,
        backgroundColor: "#EEE",
        padding: 10,
        borderRadius: 5
    },
    errorText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "red",
        margin: 10
    },
    submitButton: {
        backgroundColor: "#FFC107",
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,
        margin: 10,
    },
    backIconTouch: {
        position: 'absolute',
        left: 10,
        top: 15,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backIconImage: {
        width: 32,
        height: 32
    },
    forgotPasswordButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 5,
        margin: 10
    },
    forgotPasswordText: {
        fontSize: 12,
        fontWeight: 'bold'
    }
});
