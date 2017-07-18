'use strict';
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';

export default class extends Component {

    render() {
        //console.log(this.props.auth, this.props.message.sender)
        return (
            <View>
              <View style={[styles.container, this.props.auth.uid === this.props.message.sender ? styles.sent : styles.received]}>
                <Text numberOfLines={100} style={styles.messageText}>{this.props.message.text}</Text>
              </View>
              <View style={this.props.auth.uid === this.props.message.sender ? styles.rowAlignRight : styles.rowAlignLeft}>
                {this.props.auth.uid === this.props.message.sender
                        ?
                          <Image style={styles.msgTriangle} source={require('../images/triangle-sent-message.png')}/>
                        :
                  <Image style={styles.msgTriangle} source={require('../images/triangle-received-message.png')}/>}
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    sent: {
        backgroundColor: '#29ABE2'
    },
    received: {
        backgroundColor: '#CCCCCC'
    },
    messageText: {
        fontSize: 15,
        margin: 10
    },
    rowAlignLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    rowAlignRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
    msgTriangle: {
        width: 15,
        height: 15,
        marginBottom: 10
    }
});
