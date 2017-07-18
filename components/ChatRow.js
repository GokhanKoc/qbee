
'use strict';
import React, { Component } from 'react';
import  {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    View
} from 'react-native';



class ChatRow extends Component {

    getCardTypeIcon(){
        var style;
        var text;
        switch (this.props.cardType){
            case 'sell':
                style = styles.sellIcon;
                text = 'S';
                break;
            case 'want':
                style = styles.wantIcon;
                text = 'W';
                break;
            case 'buy':
                style = styles.buyIcon;
                text = 'B';
                break;
            case 'none':
                return null;
                break;
        }
        return <View style={style}><Text style={styles.iconTypeText}>{text}</Text></View>
    }

    handlePress(){
        if(this.props.auth.uid === this.props.card.user){
            this.props.navigator.push({
                name: 'card-view',
                card: this.props.card,
                key: this.props.cardKey,
                flipped: true
            })
        } else {
            this.props.navigator.push(
                {
                    name: 'chat',
                    card: this.props.card,
                    key: this.props.cardKey,
                    chatWith: this.props.chatWith.uid,
                }
            )
        }
    }

    render() {
        return(
            <View style={styles.messageRow}>
              <TouchableOpacity onPress={this.handlePress.bind(this)} style={styles.row} >
                <View style={styles.cardPhotoContainer}>
                  <Image
                    source={{uri: this.props.image}}
                    style={styles.cardImage}>
                  </Image>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{this.props.description}</Text>
                  {this.props.newMessagesCount ? <View style={styles.messagesCount}><Text style={styles.newMsgCount}>{this.props.newMessagesCount}</Text></View> : null}
                    </View>
                    {this.getCardTypeIcon.bind(this)()}
                </TouchableOpacity>
            </View>
        )
    }
}
