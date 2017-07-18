'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    View
} from 'react-native';

var moment = require('moment');
import { Card, Button } from 'react-native-elements'

export default class extends Component {


  constructor(props){
      super(props);
  }

      onPress = () => {

          this.props.navigator.navigate('card', {card: this.props.card, key: this.props.cardKey});
      }

    getInfoLabel = () => {
         var today = moment();
         var dueDateTime = moment(this.props.card.dueDateTime, "YYYY-MM-DD HH:mm");
         var hoursLeft = dueDateTime.diff(today, 'hours');
         if(hoursLeft < 24) {
            if(this.props.card.itemsCount === 1) {
              return <Text style={styles.warningText}>Last Day & Last Item</Text>;
            } else {
              return <Text style={styles.warningText}>Last Day</Text>;
            }
         } else {
           if(this.props.card.itemsCount === 1) {
             return <Text style={styles.warningText}>Last Item!</Text>;
           }
         }
        return null;
    }

    render(){

        return (

            <TouchableOpacity onPress={this.onPress} style={styles.container}>
              <Image style={styles.backgroundImage}
                source={{uri: this.props.card.cardPhoto}}>
              </Image>
              <View style={styles.infoLabel}>
                <View style={styles.warningLabel}>
                  {this.getInfoLabel()}
                </View>
                <Text style={styles.priceText}>{this.props.card.price}$</Text>
              </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        width: Dimensions.get('window').width / 2 - 10,
        height: 150
    },
    backgroundImage: {
        flex: 1
    },
    infoLabel: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        bottom: 10, right: 10,
        backgroundColor: 'white'
    },
    warningLabel: {
        backgroundColor: 'red',
    },
    priceText: {
        margin: 5,
        fontSize: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningText : {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white', margin: 5
    }
});
