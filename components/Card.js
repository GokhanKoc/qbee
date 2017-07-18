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
        // var today = moment();
        // var dueDate = moment(this.props.card.dueDate, 'X');
        // var hoursLeft = dueDate.diff(today, 'hours');
        // if(hoursLeft < 24) return <Text style={styles.warningText}>Last Day</Text>;
        // if(this.props.card.itemsCount === 1) return <Text style={styles.warningText}>Last Item!</Text>;
        return null;
    }

    render(){

        return (

          // <Button
          //   backgroundColor='#03A9F4'
          //   buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          //   style={styles.container}>
          //   <Card
          //     title='HELLO WORLD'
          //     image={{uri: this.props.card.cardPhoto}}>
          //     <Text style={{marginBottom: 10}}>
          //       The idea with React Native Elements is more about component structure than actual design.
          //     </Text>
          //   </Card>
          // </Button>



            <TouchableOpacity onPress={this.onPress} style={styles.container}>
              <Image style={styles.backgroundImage}
                source={{uri: this.props.card.cardPhoto}}>
              </Image>
              <View style={styles.infoLabel}>
                <View style={styles.warningLabel}>
                  {this.getInfoLabel}
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
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningText : {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white', margin: 5
    }
});
