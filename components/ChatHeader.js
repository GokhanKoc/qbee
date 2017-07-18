'use strict';
import React, { Component } from 'react';

import {
    TouchableOpacity,
    View
} from 'react-native';

export default class ChatHeader extends Component {

    render() {
        return this.props.onPress ?
            <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity> :
            <View style={this.props.style}>
              {this.props.children}
            </View>
    }
}
