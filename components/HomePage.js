import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux';
import BluetoothManager from './BluetoothManager'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#9aefdc",
    },
    imageHeader:{
        width:'100%',
        height:'30%',
        borderRadius:25,
        marginBottom:20,
        marginTop: 10
    },
    text :{
        fontSize:20,
        color: "#0c6e68",
        textAlign:"center"
    },
    firstRow: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',

        marginLeft:20,
        marginRight:20
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

        marginLeft:20,
        marginRight:20
    },
    bigWrapper:{
        margin:15,
        flex:1,
        marginBottom:30
    }
});

export default class HomePage extends React.Component {

    getSteps = () => { Actions.steps()}
    getSleep = () => { Actions.sleep()}
    getTemperature = () => { Actions.temperature()}
    getHeartRate = () => { Actions.heartRate()}
    getFall = () => {Actions.fall()}
    getLocation = () => {Actions.location()}

    connectBluetooth = () => {
        BluetoothManager.connect();
    }

    connectToWatch = () => {
        Actions.scanner();
    }


    render() {
      return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', marginTop:10}}>
                <Icon
                   onPress={this.connectBluetooth}
                    name='md-bluetooth'
                    size={24}
                    style={{ marginLeft:40, marginRight:40}}/>
                <Text>Fii sigur că bluetooth-ul tău este activat!</Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <TouchableOpacity
                    style={{width:220, height:40, backgroundColor:"#fff", alignSelf:"center", justifyContent:'center', borderRadius:20}}
                   onPress={this.connectToWatch}
                >
                    <Text style={{textAlign:'center'}}>Conectează-te la dispozitiv!</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.imageHeader}
            source={require('../assets/homeHeader.png')}/>

            <Text style={styles.text}>Fă-ți viața mai bună!</Text>
            <View style={styles.bigWrapper}>
                <View style={styles.firstRow}>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getSleep}
                            underlayColor='#042417'
    
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/sleep.png')}
                                />
                                <Text style={styles.buttonText}> Somn </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getSteps}
                            underlayColor='#042417'
    
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/steps.png')}
                                />
                                <Text style={styles.buttonText}> Pași </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.firstRow}>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getHeartRate}
                            underlayColor='#042417'
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/heartRate.png')}
                                />
                                <Text style={styles.buttonText}>  Bătăile inimii </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getLocation}
                            underlayColor='#042417'
    
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/location.png')}
                                />
                                <Text style={styles.buttonText}> Localizare </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.firstRow}>
    
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getTemperature}
                            underlayColor='#042417'
    
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/temperature.png')}
                                />
                                <Text style={styles.buttonText}> Temperatură </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress ={this.getFall}
                            underlayColor='#042417'
    
                        >
                            <View  style={styles.wrap}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/fall.png')}
                                />
                                <Text style={styles.buttonText}> Detecția căderii </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      )
  }
}