import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
// import { Constants } from 'expo';
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

  
  // The stylesheet is here, and then below it I have:
 export default class InitialPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.title}>
                HealthApp
              </Animatable.Text>
      
              <Text style={styles.paragraph}>
                Fii în contact cu sănătatea ta
              </Text>
      
              <Image
                source={require('../assets/pulse.png')}
                style={{ height: 140, width: 410 }}
              />
      
              <View style={{ marginTop: 50, height: 50, width: 200 }} >
                <Button style={styles.singIn}
                  title="Loghează-te"
                  color="#292D36"
                  onPress={() => Actions.signIn()}
                />
              </View>
      
              <View style={{ marginTop: 20, width: 200 }} >
                <Button style={styles.joinIn}
                  title="Înregistrează-te"
                  color="#292D36"
                  onPress={() => Actions.joinIn()}
                />
              </View>
            </View>
            
          );
      }
  }


const styles = StyleSheet.create({
    root: {
      backgroundColor: '#56C4BE'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
      backgroundColor: '#56C4BE',
    },
    title: {
      fontSize: 50,
      fontWeight: '500',
      textAlign: 'center',
      color: '#FFFFFF',
    },
    paragraph: {
      fontWeight: '300',
      color: '#FFFFFF',
      fontSize: 13,
      marginTop: 20,
      textAlign: 'center'
    },
    singIn: {
      backgroundColor: '#47525E',
      width: 100,
      margin: 100,
      padding: 10
    },
    joinIn: {
      backgroundColor: '#47525E',
      width: 100,
      margin: 100,
      padding: 10
    }
  });
