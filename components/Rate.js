import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Overlay from 'react-native-modal-overlay';
import StarRatingForm from './StarRating'

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

export default class Rate extends React.Component {
    state = {
        modalVisible: true,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      saveRatingNumber() {

          fetch(global.ip + 'api-rating-save', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                  'X-Parse-Session-Token': global.sessionToken
              },
              body: JSON.stringify({
                  rating: {
                      stars: global.stars
                  }
              })
          })
              .then((response) => response.json())
              .then((response) => {
                  if (response.error) {
                      alert(response.error + ' Error while saving the starts');
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
            containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
            childrenWrapperStyle={{backgroundColor: '#eee'}}
            animationDuration={500}>
            <Text style = {{marginBottom:10}}>Rate our app: </Text>
          <StarRatingForm style = {{marginBottom:10, marginBottom:20}}/> 
          <TouchableHighlight
              style={styles.homeButton}
              overlay="transparent"
                onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); this.saveRatingNumber();}}>
                <Text style={styles.homeButtonText}>Send and go back to Home</Text>
              </TouchableHighlight>
      </Overlay>
        );
      }
}