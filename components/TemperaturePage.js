import React, { Component } from 'react';
import {Text,View, Image, ImageBackground, StyleSheet, Button, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-carousel';

const images = [
    {source: require('../assets/nose.png')},
    {source: require('../assets/sneezing.png')},
    {source: require('../assets/fatigue.png')},
    {source: require('../assets/cough.png')},
    {source: require('../assets/chills.png')},
    {source: require('../assets/sore.png')},
    {source: require('../assets/headache.png')},
    {source: require('../assets/fever.png')},
];

export default class TemperaturePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            temperature: 0,
            state:''
        }
    }

    componentWillMount(){
        this.setState({temperature: global.temperature})
        if(global.temperature > 36.1 && global.temperature < 37.2){
            this.setState({state: 'TEMPERATURĂ NORMALĂ'});
        } else if (global.temperature < 36.1){
            this.setState({state: 'TEMPERATURĂ SCĂZUTĂ'});
        } else {
            this.setState({state: 'TEMPERATURĂ RIDICATĂ'});
        }
    }

    render() {
        return (
            <View style={styles.container} >

                <View style={styles.anotherContainerForText}>
                    <View style={{borderStyle:"solid", borderRadius:5, borderWidth:1,  width:250, height:150, padding:1, alignSelf:"center"}}>
                        <Text style={{fontSize:60, color:"#000", textAlign:"center"}}> {this.state.temperature} °C</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginBottom:20

                            }}
                        />
                        <Text style={{fontSize:20, color:"#000", textAlign:"center", alignSelf:"center"}}>{this.state.state}</Text>
                    </View>

                </View>

                <View style={{flexDirection:"row"}}>
                    <View style={{width:"60%", marginLeft:15}}>

                        <Text style={{fontSize:20, color:"#000",marginTop:20,  textAlign:"center"}}> Limite normale   </Text>
                        <Text style={{fontSize:20, color:"#000",marginBottom:20,  textAlign:"center"}}> 36.1°C - 37.2°C.  </Text>
                        <Text style={{fontSize:20, color:"#000", textAlign:"center" }}>Dacă simți unul dintre</Text>
                        <Text style={{fontSize:20, color:"#000", textAlign:"center", marginBottom:20}}>următoarele simptome </Text>
                        <Carousel

                            style={{width:200}}
                            hideIndicators={true}
                            animate={true}
                            loop={true}
                        >
                            <View style={{width:"50%"}}>
                                <Image source={images[0].source} style={{resizeMode:'contain', width:200, maxHeight:300}} />
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[1].source} style={{resizeMode:'contain',width:200, maxHeight:300}}/>
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[2].source} style={{resizeMode:'contain', width:200, maxHeight:300}} />
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[3].source} style={{resizeMode:'contain', width:200, maxHeight:300}}/>
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[4].source}  style={{resizeMode:'contain', width:200, maxHeight:300}}/>
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[5].source}  style={{resizeMode:'contain', width:200, maxHeight:300}} />
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[6].source}  style={{resizeMode:'contain', width:200, maxHeight:300}}/>
                            </View>
                            <View style={{width:"50%"}}>
                                <Image source={images[7].source}  style={{resizeMode:'contain', width:200, maxHeight:300}} />
                            </View>
                        </Carousel>
                        <Text style={{fontSize:20, color:"#000", textAlign:"center", }}>contactează-ți doctorul!</Text>
                    </View>
                    <View style={styles.thermometerContainer}>
                        <ImageBackground
                            source={require('../assets/empty-thermometer.png')}
                            style={styles.thermometer}
                        >
                            <View style={styles.SquareVariabilShapeView}></View>
                            <View style={styles.SquareShapeView}></View>
                            <View style={styles.CircleShapeView}></View>
                        </ImageBackground>


                    </View>
                    <View style={styles.anotherContainer}>
                        <Text style={styles.gradeO}>50</Text>
                        <Text style={{fontSize:20, marginTop:10,}}>40</Text>
                        <Text style={{fontSize:20, marginTop:7,}}>30</Text>
                        <Text style={{fontSize:20, marginTop:7,}}>20</Text>
                        <Text style={{fontSize:20, marginTop:9,}}>10</Text>
                        <Text style={styles.gradeT}>0</Text>
                        <Text style={{fontSize:20, marginTop:10,}}>-10</Text>
                        <Text style={{fontSize:20, marginTop:7,}}>-20</Text>
                        <Text style={{fontSize:20, marginTop:7,}}>-30</Text>
                        <Text style={{fontSize:20, marginTop:9,}}>-40</Text>
                        <Text style={styles.gradeTr}>-50</Text>
                    </View>

                </View>

            </View>
        );
    }
}
global.temperature = 40;
const height = 3.5 * global.temperature;
const marginTop = 215-height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor:"#ffe0d9"
    },
    thermometer: {
        width:114,
        height:500,
        justifyContent:"flex-start",
        marginLeft:6
    },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: 100,
        height: 100,
    },
    thermometerContainer: {
        width: 120,
        // marginLeft: 50,
        height:500,
        marginTop:20,
    },
    anotherContainer:{
        marginLeft:-35
    },
    CircleShapeView: {
        width:68,
        height:68,
        borderRadius:34,
        backgroundColor:"#f90e0f",
        // marginTop:426,
        marginTop:-5,
        marginLeft:4,
    },
    SquareShapeView: {
        width:32,
        height:217,
        backgroundColor:"#f90e0f",
        //marginTop:209,
        marginLeft:22,
    },
    SquareVariabilShapeView:{
        width:32,
        backgroundColor:"#f90e0f",
        marginTop,
        marginLeft:22,
        height,
    },
    gradeO: {
        fontSize:30,
        marginTop:20,

    },
    gradeT: {
        fontSize:30,
        // marginTop:135,
        marginTop:-3,
        marginLeft:10

    },
    gradeTr:{
        fontSize:30,
        // marginTop:135,
        marginTop:-4,
        marginLeft: -8
    },
    anotherContainerForText:{
        alignSelf:"center",
        marginTop:20
        // marginTop: 200,
        // marginLeft: 25
    }
});
