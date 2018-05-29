import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Overlay from 'react-native-modal-overlay';

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

export default class AboutUs extends React.Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
        <Overlay visible={this.state.modalVisible}
        closeOnTouchOutside animationType="zoomIn"
        containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
        childrenWrapperStyle={{backgroundColor: '#eee'}}
        animationDuration={500}>
      <Text>
        Version 1.22.2
        Commit 3aeede733d9a3098f7b4bdc1f66b63b0f48c1ef9
        Date 2018-04-12T17:28:16.777Z
        Shell 1.7.12
        Renderer 58.0.3029.110
        Node 7.9.0
        Architecture ia32
      </Text>
      <TouchableHighlight
              style={styles.homeButton}
              overlay="transparent"
                onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); }}>
                <Text style={styles.homeButtonText}>Back to Home</Text>
              </TouchableHighlight>
  </Overlay>
    );
  }
}