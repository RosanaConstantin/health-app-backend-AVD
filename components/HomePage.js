import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert,Keyboard } from 'react-native';


export default class HomePage extends React.Component {

    render() {
      return (
        <View style={styles.container}>
            <Image style={styles.imageHeader}
            source={require('../assets/homeHeader.png')}/>

        </View>
      )
  }
}