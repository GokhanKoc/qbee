import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Dimensions
} from 'react-native';
import { FormInput, Button } from 'react-native-elements';


export default class extends Component {

  static navigationOptions = {
    title: 'Forgot Password',
  };

    constructor(props){
        super(props);
        this.state = {
            email: "",
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


    sendPasswordRequest = () => {
        this.props.navigation.navigate('loginWithEmail')
    }

    render() {
        var error = this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null;
        return (
            <View style={styles.container}>
              <Image
                source={require('../../images/bg-forgot.jpg')}
                style={styles.backgroundImage}>
                <View style={styles.content}>
                  {error}
                  <FormInput
                    ref='forminput'
                    textInputRef='email'
                    style={styles.input}
                    onChangeText={this.onMailChange}
                    onFocus={this.onItemFocus}
                    value={this.state.email}
                    placeholder="email"
                  />
                  <Button
                    buttonStyle={styles.submitButton}
                    textStyle={{textAlign: 'center'}}
                    title={`SEND ME`}
                    onPress={this.sendPasswordRequest}
                  />

                </View>
              </Image>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    content: {
        flex: 1,
        margin: 20,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        paddingBottom: 50
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
    input: {
        height: 60,
        fontSize: 20,
        borderColor: 'gray',
        margin: 10,
        backgroundColor: "#EEE",
        padding: 10,
        borderRadius: 5
    },
    submitButton: {
        backgroundColor: "#FFC107",
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,
        margin: 10,
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
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
