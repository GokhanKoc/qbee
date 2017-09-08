'use strict';
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    View
} from 'react-native';

import ChatHeader from './ChatHeader';

var moment = require('moment');
import Avatar from './Avatar'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'


import Message from './Message'
import SystemMessage from './SystemMessage'
import * as firebase from 'firebase';


class ChatScreen extends Component {

  firebaseDatabase = firebase.database();

    constructor(props){
        super(props);
        this.state = {
            userName: null,
            messageText: null,
            avatar: null,
        }
    }

    componentDidMount(){

        this.firebaseDatabase.ref('messages/')
            .child(this.props.cardKey)
            .child(this.props.auth.uid)
            .child('messages')
            .on('child_added', this.addMessage.bind(this));

        if (this.props.auth.uid === this.props.card.user){
            this.firebaseDatabase.ref('messages/')
                .child(this.props.cardKey)
                .child(this.props.auth.uid)
                .child('viewedByOwner')
                .set(true);
        }
        if (this.props.auth.uid === this.props.auth.uid) {
            this.firebaseDatabase.ref('messages/')
                .child(this.props.cardKey)
                .child(this.props.auth.uid)
                .child('messages')
                .once('value', chatSnapshot => {
                    if(chatSnapshot.val()) this.firebaseDatabase.ref('messages/')
                        .child(this.props.cardKey)
                        .child(this.props.auth.uid)
                        .child('viewedByUser')
                        .set(true);
                })
        }
    }

    componentWillUnmount(){
        this.firebaseDatabase.ref('messages/')
            .child(this.props.cardKey)
            .child(this.props.auth.uid)
            .child('messages')
            .off();
        this.props.clearChat(this.props.cardKey);
    }

    addMessage(snapshot) {


        if (this.props.auth.uid === this.props.card.user){
            this.firebaseDatabase.ref('messages/')
                .child(this.props.cardKey)
                .child(this.props.auth.uid)
                .child('viewedByOwner')
                .set(true);
        } else {
            this.firebaseDatabase.ref('messages/')
                .child(this.props.cardKey)
                .child(this.props.auth.uid)
                .child('viewedByUser')
                .set(true);
        }
        if (snapshot.val().sender !== this.props.auth.uid){
            this.firebaseDatabase.ref('messages/').child(this.props.cardKey).child(this.props.auth.uid).child('messages').child(snapshot.key).child('viewed').set(true);
        }
        this.props.addMessage({
            cardKey: this.props.cardKey,
            message: snapshot.val()
        })
    }

    textChange(text){
        this.setState({messageText: text});
    }

    send(){
        if(!this.state.messageText) return;
        var newMessage = {
            text: this.state.messageText,
            sentAt: moment().format('X'),
            sender: this.props.auth.uid,
            viewed: false
        };
        if (this.props.auth.uid === this.props.auth.uid) {
            this.firebaseDatabase.ref('messages/').child(this.props.cardKey).child(this.props.auth.uid).child('viewedByOwner').set(false);
            this.firebaseDatabase.ref('users/').child(this.props.auth.uid).child('chats').child(this.props.cardKey).set(true);
        }
        if (this.props.auth.uid === this.props.card.user) {
            this.firebaseDatabase.ref('messages/').child(this.props.cardKey).child(this.props.auth.uid).child('viewedByUser').set(false);
        }
        this.firebaseDatabase.ref('messages/').child(this.props.cardKey).child(this.props.auth.uid).child('messages').push(newMessage);
        this.setState({messageText: null});
    }


    render() {

        return (
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerRow}>
                  <Image source={{uri: this.props.card.cardPhoto}} style={styles.photo}/>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{this.props.card.description}</Text>
                    <TouchableOpacity onPress={this.props.onHeaderPress} style={styles.flipIconCircle}>
                      <Image
                        source={require('../images/iconset_flip.png')}
                        style={styles.flipIconImage}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.headerRow, {borderBottomWidth: 1}]}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      image={this.state.avatar}
                      userName={this.state.userName}
                      radius={20}/>
                  </View>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{this.state.userName}</Text>
                  </View>
                </View>

              </View>
              <ScrollView
                ref='scrollView'
                contentContainerStyle={styles.scrollViewContent}
                style={styles.messagesContainer}>
                {this.props.chats[this.props.cardKey] ? this.props.chats[this.props.cardKey].messages.map((message, i) => {
                  return <Message
                    key={i}
                    message={message}
                    auth={this.props.auth}/>
                }) : null}
              </ScrollView>
              <View style={styles.newMessageContainer}>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.messageInput}
                    value={this.state.messageText ? this.state.messageText : ''}
                    onChangeText={this.textChange.bind(this)}
                    multiline={true}
                    placeholder="Message..."
                    numberOfLines={4}/>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={this.send.bind(this)} style={styles.sendButton}><Text style={styles.sendText}>SEND</Text></TouchableOpacity>
                </View>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 50
    },
    header: {
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    photo: {
        width: 60,
        height: 60
    },
    descriptionContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 1
    },
    userNameContainer: {
        flex: 1,
        alignItems: 'flex-start',
        height: 60
    },
    userName: {
        fontSize: 20,
        padding: 10
    },
    description: {
        height: 60,
        fontSize: 15,
        padding: 10
    },
    avatarContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
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
    messagesContainer: {
        flex: 4,
        paddingTop: 10,
        paddingBottom: 10
    },
    scrollViewContent: {
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    newMessageContainer: {
        height: 80,
        flexDirection: 'row'
    },
    messageInput: {
        alignSelf: 'stretch',
        backgroundColor: '#EEE',
        height: 60,
        padding: 10
    },
    sendButton: {
        backgroundColor: '#29ABE2',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendText: {
        fontSize: 13
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 4,
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipIconCircle: {
        width: 60,
        height: 60,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipIconImage: {
        width: 32,
        height: 32
    },
    backIcon: {
        position: 'absolute',
        left: -15,
        top: 15,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#29ABE2',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
      chats: state.chats
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
