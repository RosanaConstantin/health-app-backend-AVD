import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, TextInput } from 'react-native';

import Overlay from 'react-native-modal-overlay';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    homeButton: {
      paddingTop: 10,
      width: 150,
      height: 50,
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

    saveFeedback() {
        fetch(global.ip + 'api-rating-save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify({
                rating: {
                    message: this.state.text
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while saving the feedback message');
                } else {
                    alert(response.result);
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done()
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
                    onPress={() => { Actions.dashboard(); this.setModalVisible(!this.state.modalVisible); this.saveFeedback();}}>
                    <Text style={styles.homeButtonText}>Send feedback and go back to Home</Text>
                </TouchableHighlight>
            </Overlay>
        );
    }
}