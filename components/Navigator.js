import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemSaleScreen from '../screens/ItemSaleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CardScreen from '../screens/CardScreen';
import ChatListScreen from '../screens/ChatListScreen';

// LOGIN Related Pages
import SignUpScreen from '../screens/login/SignUpScreen';
import CreateAccountEmailScreen from '../screens/login/CreateAccountEmailScreen';
import LoginWithEmailScreen from '../screens/login/LoginWithEmailScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';

import { TabNavigator, StackNavigator } from 'react-navigation';


export const MainNavigator = TabNavigator ({
  welcome: { screen: WelcomeScreen },
  signup: { screen: SignUpScreen },
  createAccount: { screen: CreateAccountEmailScreen },
  loginWithEmail: { screen: LoginWithEmailScreen },
  forgotEmail: { screen: ForgotPasswordScreen },
  itemSale: { screen: ItemSaleScreen },
  card: { screen: CardScreen },
  main: {
      screen: TabNavigator({
        home: { screen: HomeScreen },
        settings: { screen: SettingsScreen },
        chatList: { screen: ChatListScreen }
      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true,
});
