import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, TextInput } from 'react-native';

import Overlay from 'react-native-modal-overlay';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    homeButton: {
      paddingTop: 10,
      width: 100,
      height: 30,
      paddingBottom: 10,
      backgroundColor: '#000000',
  },
  homeButtonText: {
      color: '#ffffff',
      textAlign: 'center'
  }
    })

export default class FeedBack extends React.Component {
    state = {
        modalVisible: true,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <Overlay visible={this.state.modalVisible}
                closeOnTouchOutside animationType="zoomIn"
                containerStyle={{ backgroundColor: 'rgba(37, 8, 10, 0.78)' }}
                childrenWrapperStyle={{ backgroundColor: '#eee' }}
                animationDuration={500}>
                <TextInput
                    style={{ height: 100, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom:50 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableHighlight
                    overlay="transparent"
                    style={styles.homeButton}
                    onPress={() => { Actions.dashboard(); this.setModalVisible(!this.state.modalVisible); }}>
                    <Text style={styles.homeButtonText}>Send feedback</Text>
                </TouchableHighlight>
            </Overlay>
        );
    }
}