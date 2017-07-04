import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ItemSaleScreen from './screens/ItemSaleScreen';
import SettingsScreen from './screens/SettingsScreen';



// LOGIN Related Pages
import SignUpScreen from './screens/login/SignUpScreen';
import CreateAccountEmailScreen from './screens/login/CreateAccountEmailScreen';
import LoginWithEmailScreen from './screens/login/LoginWithEmailScreen';
import ForgotPasswordScreen from './screens/login/ForgotPasswordScreen';


//Firebase Related
import * as firebase from 'firebase';
import firebaseConfig from './constants/firebaseConstants';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {

    const MainNavigator = TabNavigator ({
      welcome: { screen: WelcomeScreen },
      signup: { screen: SignUpScreen },
      createAccount: { screen: CreateAccountEmailScreen },
      loginWithEmail: { screen: LoginWithEmailScreen },
      forgotEmail: { screen: ForgotPasswordScreen },
      itemSale: { screen: ItemSaleScreen },
      settings: { screen: SettingsScreen },
      home: { screen: HomeScreen }
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
