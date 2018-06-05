import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#ffdcd2",
        flex:1
    },
    containerDetails: {
        backgroundColor: "#ff9378",
        marginTop: "10%",
        alignSelf:"center",
        borderRadius: 20,
        marginBottom:20,
        width: "95%",
        flexDirection: 'column'
    },
    bpm: {
        flexDirection: 'row',
       alignItems:"center",
        height:150,
        justifyContent:"space-around"
    },
    image: {
        width: 80,
        height: 80
    },
    text: {
        fontSize: 50,
        color: "#ffffff",
        fontWeight: "500",
        fontFamily: "Cochin"
    },
    keys:{
        flexDirection:"column"
    },
    keysText:{
        fontSize: 25,
        color:"#fff",
        fontWeight:"200",
        fontFamily:"Cochin"
    },
    keysTextSec:{
        fontSize: 15,
        color:"#858585",
        fontWeight:"100",
        fontFamily:"Cochin"
    },
    title:{
        fontSize:30,
        color:"#3a3a3a",
        textAlign:"center",
        marginTop:80,

    },
    indicate: {
        fontSize:20,
        color:"#858585",
        textAlign:"center",
        marginTop:15,
    }
})

export default class HeartRatePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oxigenSaturation: 20,
            heartRate: 50,
            lastUpdated: 'a minute ago'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Take care of your care!</Text>
                </View>

                <View style={styles.containerDetails}>
                    <Text style={styles.indicate}>Heart rate</Text>
                    <View style={styles.bpm}>
                        <Image
                            style={styles.image}
                            source={require('../assets/heartRate.png')}/>
                        <Text style={styles.text}>{this.state.heartRate}</Text>
                        <View style={styles.keys}>
                            <Text style={styles.keysText}>
                                bmp
                            </Text>
                            <Text style={styles.keysTextSec}>
                                {"Taken " + this.state.lastUpdated}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: "98%",
                            alignSelf: "center"
                        }}
                    />
                    <Text  style={styles.indicate}>Oxygen saturation</Text>
                    <View style={styles.bpm}>

                        <Image
                            style={styles.image}
                            source={require('../assets/spo2.png')}/>
                        <Text style={styles.text}>{this.state.oxigenSaturation}</Text>
                        <View style={styles.keys}>
                            <Text style={styles.keysText}>
                               %
                            </Text>
                            <Text style={styles.keysTextSec}>
                                {"Taken " + this.state.lastUpdated}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={require("../assets/pulseOrange.png")} style={{width:"100%", height:140}}/>
                </View>
            </View>
        );
    }
}