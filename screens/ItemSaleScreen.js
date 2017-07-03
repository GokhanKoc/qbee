'use strict';
import React, { Component } from 'react';
import  {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    NativeModules,
    Image,
    ScrollView,
    Picker,
    Dimensions,
    View
} from 'react-native';


import * as firebase from 'firebase';

export default class ItemSaleScreen extends Component {

  firebaseDatabase = firebase.database();

    constructor(props){
        super(props);
        if(this.props.card){
            this.state = this.props.card;
            this.state.dueDateInterval = 'days';
            this.state.dueDateCount = null;
        } else {
            this.state = {
                currentGeo : null,
                countryCoordinates: null,
                cardCoordinates: null,
                cardPhoto: null,
                shippingDate: null,
                itemsCount: null,
                offers: [],
                description: null,
                price: null,
                type: 'Sell',
                dueDateCount: 72,
                dueDateInterval: 'days',
                dueDate: null
            }
        }

    }


    getCurrentLocation(){
    }

    pickLocation(data) {
    }

    pickPhoto = async () => {
    };

    descriptionChange = (description) => {
        this.setState({description});
    }

    priceChange = (price) =>{
        this.setState({price});
    }

    onCountChange = (itemsCount) =>{
        this.setState({itemsCount});
    }

    pickDate = (shippingDate) =>{
        this.setState({shippingDate});
    }

    setDueDateCount = (dueDateCount) => {
        this.setState({dueDateCount})
    }

    validateCardForm = () => {
        return true;
    }

    submitCard = () => {
      var card = this.state;
      if(this.validateCardForm){
          card.itemsCount = +card.itemsCount;
          card.price = +card.price;
          card.user = "Gokhan";
          var newCard = {};
          if(this.props.cardKey){
              this.firebaseDatabase.ref('cards/').child(this.props.cardKey).set(card);
              newCard[this.props.cardKey] = card;
              this.props.addCard(newCard);
          } else {
              var newCardRef = this.firebaseDatabase.ref('cards/').push();
              newCardRef.set(card);
              this.firebaseDatabase.ref('users/').child("1234").child('cards').child(newCardRef.key).set(true);
          }
          this.props.navigation.navigate('home')
      }
    }

    deleteCard(){
    }

    getDeleteButton = () => {
    }

    render() {
        return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.from}> Last Day: {this.state.dueDate}</Text>

              <View style={styles.descriptionInputWrapper}>
                <TextInput style={styles.description}
                  onChangeText={this.descriptionChange}
                  multiline={true}
                  value={this.state.description ? this.state.description : ''}
                  placeholder="item description..."
                  placeholderTextColor="black"
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  numberOfLines={4}/>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.price}
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  value={this.state.price ? '' + this.state.price : ''}
                  onChangeText={this.priceChange}
                  keyboardType="numeric"
                  placeholder="Price"/>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.itemsCount}
                  value={this.state.itemsCount ? '' + this.state.itemsCount : ''}
                  onChangeText={this.onCountChange}
                  keyboardType="numeric"
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  placeholder="Items count"/>
              </View>
              <Text style={styles.cardOwner}>by Gokhan Koc </Text>
              <Text style={styles.from}>From City: Ankara</Text>
              <Text style={styles.from}>To City: new york</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={this.getCurrentLocation} style={styles.Button}>
                <Text style={styles.text}>USE CURRENT LOCATION</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.pickPhoto} style={styles.Button}>
                <Text style={styles.text}>ADD PHOTO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerCenter}>
              <TouchableOpacity onPress={this.submitCard} style={[styles.submitButton, this.props.type === 'sell' ? styles.sellButtonColor : styles.requestButtonColor]}>
                <Text style={styles.text}>
                  {this.props.type}
                </Text>
              </TouchableOpacity>
              {this.getDeleteButton}
            </View>
          </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white'
    },
    mainContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
        margin: 10,
        marginBottom: 25,
    },
    formContainer: {
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    description: {
        height: 130,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        fontSize: 20,
        padding: 5
    },
    price: {
        height: 38,
        fontSize: 30,
        padding: 0,
        margin: 0,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        fontWeight: 'bold'
    },
    itemsCount: {
        height: 40,
        fontSize: 20,
        padding: 0,
        margin: 0
    },
    inputWrapper: {
        alignSelf: 'stretch',
        height: 38,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    descriptionInputWrapper: {
        alignSelf: 'stretch',
        height: 130,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    timeSpan: {
        height: 40,
        fontSize: 25,
        padding: 5
    },
    cardOwner: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20
    },
    from: {
        fontSize: 20
    },
    buttonGroup: {
        alignItems: "stretch",
        justifyContent: 'space-around',
        marginLeft: 15,
        marginRight: 15,
    },
    Button: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 10,
        margin: 5
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    shippingDate: {
        height: 40,
        fontSize: 20,
        padding: 5
    },
    containerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardPhoto: {
        width: 100,
        height: 100
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    col1: {
        margin: 5,
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        flexDirection: 'row'
    },
    dueDateCount: {
        flex: 1,
        height: 50,
        fontSize: 20
    },
    submitButton: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#FFFFFF",
        marginBottom: 40
    },
    deleteButton: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 + 20,
        top: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: "#FFFFFF",
        backgroundColor: "red",
        marginBottom: 40
    },
    sellButtonColor: {
        backgroundColor: "#FF9800"
    },
    requestButtonColor: {
        backgroundColor: "#2196F3"
    }
});
