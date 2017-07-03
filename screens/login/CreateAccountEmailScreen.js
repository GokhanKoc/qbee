import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import { FormInput, Button } from 'react-native-elements';


class CreateAccountEmailScreen extends Component {


  constructor(props) {
      super(props);
      this.state = {
          email: ""
      }
  }


  onEmailNameChange = (text) => {
    console.log("onEmailNameChange");
    this.setState({email: text});
  }

  onFirstPassChange = (text) => {
    console.log("onFirstPassChange");
    this.setState({firstPass: text});
  }


  onSecondPassChange = (text) => {
    console.log("onSecondPassChange");
    this.setState({secondPass: text});
  }

  validateForm() {
    //Validation works
    return true;
  }

  registerUserByEmailAndPassword() {
    //CALL REGISTER USER BY EMAIL
    this.props.createAccountWithEmail(this.state.email, this.state.firstPass);

  }

  handleSubmit = () => {

      if (this.validateForm()) {
          console.log("Email ile login olma başlasın.....");
          this.registerUserByEmailAndPassword();
      }
  }

  render() {
      return (
          <View style={styles.container}>
            <Image
              source={require('../../images/bg-email.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.bottom}>

                <FormInput
                  ref='forminput'
                  textInputRef='email'
                  onChangeText={this.onEmailNameChange}
                  style={styles.input}
                  placeholder="email address"
                />
                <FormInput
                  ref='forminput'
                  textInputRef='password'
                  onChangeText={this.onFirstPassChange}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="password"
                />
                <FormInput
                  ref='forminput'
                  textInputRef='passwordAgain'
                  onChangeText={this.onSecondPassChange}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="password again"
                />
                <Button
                  buttonStyle={styles.button}
                  textStyle={{textAlign: 'center'}}
                  title={`CREATE`}
                  onPress={this.handleSubmit}
                />


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
  return { token: auth.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountEmailScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: "column"
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    submitButtonText: {
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
        margin: 20
    },
    input: {
        fontSize: 20,
        height: 60,
        borderColor: 'gray',
        margin: 10,
        backgroundColor: "#EEE",
        borderRadius: 5,
        padding: 10
    },
    button: {
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,
        backgroundColor: "#CDDC39",
        margin: 10
    },
    errorText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "red",
        margin: 10
    }
});
