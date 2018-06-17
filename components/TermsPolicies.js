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

              Termenii și condițiile de utilizare

              Acest Acord de Termeni și Utilizare (acest "Contract") este încheiat de către HealthApp ("Autorul") și "Dumneavoastră", utilizatorul acestei aplicații, cunoscut și ca "HealthApp" ("Site"). Accesul la, utilizarea și / sau navigarea Site-ului este furnizat în condițiile și termenii stabiliți aici. Prin accesarea, utilizarea și / sau navigarea pe site, sunteți de acord cu acești termeni și condiții </Text>
          <TouchableHighlight
              overlay="transparent"
                  style={styles.homeButton}
                    onPress={() => {Actions.dashboard();this.setModalVisible(!this.state.modalVisible); }}>
                    <Text style={styles.homeButtonText}>Acasă</Text>
                  </TouchableHighlight>
      </Overlay>
        );
      }
}