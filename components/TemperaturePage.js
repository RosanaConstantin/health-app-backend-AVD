import React, { Component } from 'react';
import {Text,View, Image, ImageBackground, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
       // justifyContent:"space-around",
        backgroundColor:"#ffe0d9"
    },
    thermometer: {
       width:114,
       height:500,
       justifyContent:"flex-start",
        marginLeft:6
    },
    thermometerContainer: {
        width: 120,
        marginLeft: 50,
        height:500,
        marginTop:100,
          backgroundColor:"#fff"
    },
    anotherContainer:{
      marginLeft:-50
    },
    CircleShapeView: {
        width:68,
        height:68,
        borderRadius:34,
        backgroundColor:"#f90e0f",
        marginTop:425,
        marginLeft:3
    },
    gradeO: {
        fontSize:30,
        marginTop:50,

    },
    gradeT: {
        fontSize:30,
        marginTop:160,
        //marginLeft:50

    },
    gradeTr:{
        fontSize:30,
        marginTop:160
    }
});


export default class TemperaturePage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.thermometerContainer}>
                    <ImageBackground
                        source={require('../assets/empty-thermometer.png')}
                        style={styles.thermometer}
                    >
                      <View style={styles.CircleShapeView}></View>

                    </ImageBackground>


                </View>
                <View style={styles.anotherContainer}>
                    <Text style={styles.gradeO}>50</Text>
                    <Text style={styles.gradeT}>0</Text>
                    <Text style={styles.gradeTr}>-50</Text>
                </View>
            </View>
        );
    }
}