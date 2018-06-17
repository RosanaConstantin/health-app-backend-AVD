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
        Versiunea 1.22.2
        Ultima commit 3aeede733d9a3098f7b4bdc1f66b63b0f48c1ef9
        Data 2018-04-12T17:28:16.777Z
        Node 7.9.0
      </Text>
      <TouchableHighlight
              style={styles.homeButton}
              overlay="transparent"
                onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); }}>
                <Text style={styles.homeButtonText}>Acasă</Text>
              </TouchableHighlight>
  </Overlay>
    );
  }
}