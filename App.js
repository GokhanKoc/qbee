import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import { MainNavigator } from './components/Navigator';

//Firebase Related
// import * as firebase from 'firebase';
// import firebaseConfig from './constants/firebaseConstants';
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {

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
