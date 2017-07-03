'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform,
    View
} from 'react-native';
import Card from '../components/Card'

//Firebase Related
import * as firebase from 'firebase';

export default class HomeScreen extends Component {

  firebaseDatabase = firebase.database();

    constructor(props){
        super(props);
    }

    componentDidMount() {

      let cards = [];

      // Find all cards
      // Only cards related to user locations
      // For example for Istanbul only istanbul related cards
      var ref = this.firebaseDatabase.ref('cards/');
      ref.once('value', cardsSnapshot => {
        cardsSnapshot.forEach( childSnapshot => {

          var child = childSnapshot.val();
          if (child.user != this.props.authData.uid ) {
            cards.push(child);
          }
        });
        this.props.initCards(cards);
      },
      errorObject => {
           console.log("Card Loading Failed: The read failed: " + errorObject.code);
      })

      this.checkChatsCards();
    }


    // checkChatsCards(){
    //     var userChats = this.props.authData.chats;
    //     if(!userChats) return;
    //     for(var cardKey in userChats){
    //         this.firebaseDatabase.ref('cards/').child(cardKey).once('value', (card) => {
    //                 if(!card.val()){
    //                     this.firebaseDatabase.ref('users').child(this.props.authData.uid)
    //                         .child('chats')
    //                         .child(cardKey)
    //                         .remove();
    //                 }
    //             })
    //     }
    // }
    //
    //
    // updateCard(snapshot, prevKey){
    //     var card = {};
    //     card[snapshot.key] = snapshot.val();
    //     this.props.addCard(card);
    // }


    render() {
        return (
            <View style={styles.container}>

              <ScrollView style={styles.scrollView}>
                <View style={styles.cardsList}>
                  {/* // Card list gelmeli buraya */}
                </View>
              </ScrollView>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('itemSale') } style={styles.sellButton}>
                <Text style={styles.sellText}>Sell</Text>
              </TouchableOpacity>

            </View>
        );
    }

}

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
    bottom: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    product: {
        flex: 1,
        margin: 5,
        backgroundColor: "red"
    },
    row: {
        height: 150,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'stretch'
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
    iWantButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: 60,
        width: 60,
        left: Dimensions.get('window').width / 2 - 30 + 62,
        top: Dimensions.get('window').height / 2 - 30 - 25 - platformOffset,
        backgroundColor: "#2196F3",
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#FFFFFF"
    },
    sellText: {
        color: '#FFFFFf',
        fontWeight: 'bold',
        fontSize: 20
    },
    iWantText: {
        color: '#FFFFFf',
        fontWeight: 'bold',
        fontSize: 15
    },
    cardsList: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    }
});
