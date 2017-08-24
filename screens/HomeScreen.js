'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform,
    View,
    Image
} from 'react-native';
import Card from '../components/Card'
import { Icon } from 'react-native-elements';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

// FIREBASE RELATED ITEMS
import firebase from '../components/Firebase';
import { _ } from 'lodash';

class HomeScreen extends Component {

  firebaseDatabase = firebase.database();

  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/iconset_dots.png')}
        style={[styles.dots, {tintColor: tintColor}]}
      />
    )
  }

    constructor(props){
        super(props);
    }

    componentDidMount() {
      this.getAllCards();
    }

    getAllCards() {

      var cards = [];

      // Find all cards
      // Only cards related to user locations
      // For example for Istanbul only istanbul related cards
      var ref = this.firebaseDatabase.ref('cards/');
      ref.once('value', cardsSnapshot => {

        cardsSnapshot.forEach( childSnapshot => {

          var child = childSnapshot.val();
          // if (child.user != this.props.auth.uid ) {
          //   cards.push(child);
          // }
          child = Object.assign({child},{key: childSnapshot.key})
          //cards[childSnapshot.key]=child;
          cards.push(child);
        });
        this.props.initCards(cards);
      },
      errorObject => {
           console.log("Card Loading Failed: The read failed: " + errorObject.code);
      })
    }


    renderCards() {

      if(!_.isEmpty(this.props.cards)) {
        return this.props.cards.map((item, i) => {

          return (
            <Card
              key={item.key}
              card={item.child}
              cardKey={item.key}
              navigator={this.props.navigation}
            >
            </Card>
          );
        }).reverse();
      }
    }


    componentWillReceiveProps() {

      this.render();
    }

    render() {

        return (
            <View style={styles.container}>

              <ScrollView style={styles.scrollView}>
                <View style={styles.cardsList}>
                  { this.renderCards()}
                </View>
              </ScrollView>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('itemSale') } style={styles.sellButton}>
                <Text style={styles.sellText}>Sell</Text>
              </TouchableOpacity>

            </View>
        );
    }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cards: state.cards
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

var platformOffset = Platform.OS === 'ios' ? 0 : 10;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginBottom: 50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    sellButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: 70,
        width: 70,
        left: Dimensions.get('window').width / 2 - 35,
        top: Dimensions.get('window').height / 2 - 35 - 25 - platformOffset,
        backgroundColor: "#FF9800",
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#FFFFFF"
    },
    sellText: {
        color: '#FFFFFf',
        fontWeight: 'bold',
        fontSize: 20
    },
    cardsList: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    dots: {
        width: 40,
        height: 40
    }
});
