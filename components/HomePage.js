import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon  from 'react-native-vector-icons'
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#9aefdc"
    },
    imageHeader:{
        width:'100%',
        height:'30%',
        borderRadius:25,
        marginBottom:20,
        marginTop: 20
    },
    text :{
        fontSize:20,
        color: "#0c6e68",
        textAlign:"center"
    },
    firstRow: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    button:{
        borderRadius:20,
        width:'40%',
        height:'75%',
        backgroundColor:'#68c9ef'

    },
    wrap:{
        flexDirection:'column'
    },
    buttonText: {
        fontSize: 15,
        textAlign:'center'
    },
    image:{
        width:'45%',
        height:'75%',
        marginLeft:'30%'
    },
    secondRow: {
        flex:1,
        flexDirection:'row',
        display: 'flex',
        justifyContent: 'center',
    },
    bigWrapper:{
        margin:15,
        flex:1
    }
});

export default class HomePage extends React.Component {

    getSteps = () => { Actions.steps()}
    getSleep = () => { Actions.sleep()}
    getTemperature = () => { Actions.temperature()}
    getHeartRate = () => { Actions.heartRate()}
    getFall = () => {Actions.fall()}
    getLocation = () => {Actions.location()}

    render() {
      return (
        <View style={styles.container}>
            <Image style={styles.imageHeader}
            source={require('../assets/homeHeader.png')}/>
            <Text style={styles.text}>Make your life better!</Text>
            <View style={styles.bigWrapper}>
            <View style={styles.firstRow}>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getSleep}
                        underlayColor='#042417'

                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/sleep.png')}
                            />
                            <Text style={styles.buttonText}> Sleep </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getSteps}
                        underlayColor='#042417'

                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/steps.png')}
                            />
                            <Text style={styles.buttonText}> Steps </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.firstRow}>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getHeartRate}
                        underlayColor='#042417'
                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/heartRate.png')}
                            />
                            <Text style={styles.buttonText}> Heart Rate </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getLocation()}
                        underlayColor='#042417'

                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/location.png')}
                            />
                            <Text style={styles.buttonText}> Location </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.firstRow}>

                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getTemperature()}
                        underlayColor='#042417'

                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/temperature.png')}
                            />
                            <Text style={styles.buttonText}> Body temperature </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.button}>
                    <TouchableHighlight
                        onPress ={this.getFall()}
                        underlayColor='#042417'

                    >
                        <View  style={styles.wrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/fall.png')}
                            />
                            <Text style={styles.buttonText}> Fall detection </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            </View>
        </View>
      )
  }
}