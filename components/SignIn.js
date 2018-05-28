import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Modal } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

import FormSign from './FormSign'

  export default class SignIn extends React.Component {
  
    render() {
    return (<FormSign/>);
    }
  }
