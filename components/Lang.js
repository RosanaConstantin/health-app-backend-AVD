
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Overlay from 'react-native-modal-overlay';

export default class Lang extends React.Component {
    state = {
        modalVisible: true,
        language:'english'
      };

    render() {
        return (
            <Overlay visible={this.state.modalVisible}
                closeOnTouchOutside animationType="zoomIn"
                containerStyle={{ backgroundColor: 'rgba(37, 8, 10, 0.78)' }}
                childrenWrapperStyle={{ backgroundColor: '#eee' }}
                animationDuration={500}>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </Overlay>
        )
    }
}