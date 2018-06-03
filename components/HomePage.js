import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
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
       // BluetoothManager.pairing();
       Actions.scanner();
    }
    // componentDidMount() {
    //     // inizializzo il modulo bluetooth una volta per tutte
    //     BluetoothManager.initialize();
    //     // richiesta permessi localizzazione
    //     if (Platform.OS === 'android' && Platform.Version >= 23) {
    //         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
    //             if (result) {
    //                 console.log("Permission is OK");
    //             } else {
    //                 PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
    //                     if (result) {
    //                         Alert.alert("User accept");
    //                     } else {
    //                         Alert.alert("User refuse");
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }

    render() {
      return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', marginTop:10}}>
                <Icon
                   onPress={this.connectBluetooth}
                    name='md-bluetooth'
                    size={24}
                    style={{ marginLeft:40, marginRight:20}}/>
                <Text>Make sure that yout bluetooth is connected!</Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <TouchableOpacity
                    style={{width:220, height:40, backgroundColor:"#fff", alignSelf:"center", justifyContent:'center', borderRadius:20}}
                   onPress={this.connectToWatch}
                >
                    <Text style={{textAlign:'center'}}>Connect to your smart watch!</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.imageHeader}
            source={require('../assets/homeHeader.png')}/>

            <Text style={styles.text}>Make your life better!</Text>
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
                                <Text style={styles.buttonText}> Sleep </Text>
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
                                <Text style={styles.buttonText}> Steps </Text>
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
                                <Text style={styles.buttonText}> Heart Rate </Text>
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
                                <Text style={styles.buttonText}> Location </Text>
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
                                <Text style={styles.buttonText}> Body temperature </Text>
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
                                <Text style={styles.buttonText}> Fall detection </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      )
  }
}