'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    Easing,
    ScrollView,
    View
} from 'react-native';

import FlipView from 'react-native-flip-view'

// FIREBASE RELATED ITEMS
import firebase from '../components/Firebase';

import ChatListScreen from './ChatListScreen'
import Chat from '../components/Chat'
import Avatar from '../components/Avatar'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

var moment = require('moment');

class CardScreen extends Component {

  firebaseDatabase = firebase.database();

    constructor(props){


        super(props);
        var flipped = this.props.flipped;
        var card = this.props.navigation.state.params.card;
        var cardKey = this.props.navigation.state.params.key;

        this.state = {
            avatar: null,
            userName: null,
            paypal: null,
            locality: null,
            flipped,
            card,
            cardKey,
            backSideOpacity: flipped ? 1 : 0
        }
    }


    componentDidMount(){

        var user = this.state.card.user
        console.log("USER" + user)
        if(this.state.card.user === this.props.auth.uid) {

            this.setState({
                userName: this.props.auth.firstName + this.props.auth.lastName,
                avatar: this.props.auth.avatar
            })
        } else {

          this.firebaseDatabase.ref('users/').child(this.state.card.user).once('value', snapshot => {
            this.setState({
                userName: user.firstName + ' ' + user.lastName,
                avatar: user.avatar,
                paypal: user.paypal
            })
          })
        }
    }

    backView = () => {
        if(this.state.card.user === this.props.auth.uid) return (
            <View style={{backgroundColor: 'white', flex: 1, opacity: this.state.backSideOpacity}}>
              <ChatListScreen
                flip={this.flip}
                getUserByUid={this.props.getUserByUid}
                getCardByUid={this.props.getCardByUid}
                card={this.state.card}
                navigation={this.props.navigation}
                auth={this.props.auth}
                cardKey={this.state.cardKey} />
            </View>
                );
        return(
            <View style={{backgroundColor: 'white', flex: 1, opacity: this.state.backSideOpacity}}>
              <Chat
                onHeaderPress={this.flip}
                auth={this.props.auth}
                card={this.state.card}
                cardKey={this.state.cardKey}
                chatWith={this.props.auth.uid}
                onHeadPress={this.flip}
                getUserByUid={this.props.getUserByUid}
                navigation={this.props.navigation}/>
            </View>
        )
    }

    flip = () => {
        this.setState({flipped: !this.state.flipped})
    }


    getCardButton() {
        var cardStyle;
        var buttonText;
        var onPress = () => {};
        if (this.state.card.type === 'request'){
            cardStyle = styles.requestButton;
            buttonText = 'Sell';
        } else {
            cardStyle = styles.buyButton;
            buttonText = 'Buy';
        }
        if(this.state.card.user === this.props.auth.uid){
            cardStyle = styles.editButton;
            buttonText = 'Edit';
            onPress = () => {
                this.props.navigator.push({name: this.state.card.type, editCard: this.state.card, key: this.state.cardKey})
            };
        }
        return(
            <TouchableOpacity onPress={onPress} style={[styles.cardButton, cardStyle]}>
                <Text style={styles.sellText}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }

    frontView = () => {

        return (
            <View style={styles.container}>
              <Image style={styles.cardView} source={{uri: this.state.card.cardPhoto}}>
                <TouchableOpacity onPress={this.flip} style={styles.flipIconCircle}>
                  <Image
                    style={styles.flipIconImage}
                    source={require('../images/iconset_flip.png')}>
                  </Image>
                </TouchableOpacity>
              </Image>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                style={styles.cardInfo}>
                <View style={styles.cardInfoContainer}>
                  <Text style={styles.price}>{this.state.card.price}$</Text>
                  <View style={styles.row}>
                    <Text style={styles.itemsCount}>{this.state.card.itemsCount} left. </Text>
                    <Text style={styles.paymentDueDate}>Expires {moment(this.state.card.dueDate, 'X').fromNow()}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <View style={styles.avatarCol}>
                      <TouchableOpacity onPress={this.flip}>
                        {this.props.auth.uid !== this.state.card.user ?
                          <Image source={require('../images/iconset_asktoseller.png')}
                            style={styles.askToSeller}
                          /> : null}
                        <Avatar
                          bardered
                          userName={this.state.userName}
                          image={this.state.avatar}
                          radius={20}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.description}>
                        Description: {this.state.card.description}
                      </Text>
                      <Text style={styles.seller}>
                        {this.state.card.type === 'request' ? 'Request by' : 'By'} {this.state.email}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              {this.getCardButton.bind(this)()}
            </View>
        );
    }

    render() {

        return (
            <FlipView style={{flex: 1}}
              front={this.frontView()}
              back={this.backView()}
              isFlipped={this.state.flipped}
              onFlip={() => this.setState({backSideOpacity: this.state.flipped ? 1 : 0})}
              flipAxis="y"
              flipEasing={Easing.out(Easing.ease)}
              flipDuration={500}
              perspective={1000}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    cardView: {
        backgroundColor: 'grey',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2
    },
    cardImage: {
        flex: 1
    },
    cardInfo: {
        flex: 1,
        paddingTop: 50
    },
    cardInfoContainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatarCol: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 10
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    avatarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEE'
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    flexRow: {
        margin: 20,
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row'
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    sellText: {
        color: '#FFFFFf',
        fontWeight: 'bold',
        fontSize: 20
    },
    cardButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: 70,
        width: 70,
        left: Dimensions.get('window').width / 2 - 35,
        top: Dimensions.get('window').height / 2 - 35,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#FFFFFF"
    },
    requestButton: {
        backgroundColor: "#FF9800"
    },
    editButton: {
        backgroundColor: "#FF9800"
    },
    buyButton: {
        backgroundColor: "#8CC63F"
    },
    price: {
        fontSize: 25
    },
    itemsCount: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    paymentDueDate: {
        fontSize: 20
    },
    description: {
        fontSize: 15
    },
    seller: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    locality: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    shippingDate: {
        fontSize: 15
    },
    backView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    askToSeller: {
        width: 40,
        height: 40
    },
    flipIconCircle: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        top: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        left: Dimensions.get('window').width / 2 - 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipIconImage: {
        width: 32,
        height: 32
    }
});
