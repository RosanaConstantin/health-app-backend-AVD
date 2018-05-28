import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Overlay from 'react-native-modal-overlay';
import StarRatingForm from './StarRating'

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

export default class Rate extends React.Component {
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
            <Text style = {{marginBottom:10}}>Rate our app: </Text>
          <StarRatingForm style = {{marginBottom:10, marginBottom:20}}/> 
          <TouchableHighlight
              style={styles.homeButton}
                onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); }}>
                <Text style={styles.homeButtonText}>Back to Home</Text>
              </TouchableHighlight>
      </Overlay>
        );
      }
}