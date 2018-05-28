import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,StyleSheet} from 'react-native';

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
export default class TermsPolicies extends React.Component {
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
          Terms of use agreement

This Terms of Use Agreement (this “Agreement”) is entered into by and between iMedicalApps LLC (the “Author”) and “you,” the user of this web blog, also known as the “iMedicalApps (the “Site”). Access to, use of and/or browsing of the Site is provided subject to the terms and conditions set forth herein. By accessing, using and/or browsing the Site, you hereby agree to these terms and conditions.
          </Text>
          <TouchableHighlight
                  style={styles.homeButton}
                    onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); }}>
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                  </TouchableHighlight>
      </Overlay>
        );
      }
}