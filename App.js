import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';

// LOGIN Related Pages
import AuthScreen from './screens/login/AuthScreen';
import SignUpScreen from './screens/login/SignUpScreen';
import CreateAccountEmailScreen from './screens/login/CreateAccountEmailScreen';
import LoginWithEmailScreen from './screens/login/LoginWithEmailScreen';
import ForgotPasswordScreen from './screens/login/ForgotPasswordScreen';


export default class App extends React.Component {
  render() {

    const MainNavigator = TabNavigator ({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      signup: { screen: SignUpScreen },
      createAccount: { screen: CreateAccountEmailScreen },
      loginWithEmail: { screen: LoginWithEmailScreen },
      forgotEmail: { screen: ForgotPasswordScreen },
      main: {
        screen: StackNavigator ({
          home: { screen: HomeScreen }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
    });


    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
