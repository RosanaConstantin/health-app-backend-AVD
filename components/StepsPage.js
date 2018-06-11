import React, { Component } from 'react';
import {StyleSheet, PanResponder , TouchableOpacity,View, Text, TextInput, Image} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 25,
        flex:1
    },
    points: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 72,
        left: 56,
        width: 90,
        textAlign: 'center',
        color: '#7591af',
        fontSize: 50,
        fontWeight: "100"
    },
    stepsView: {
        marginTop:"10%",
        width:"100%",
        height:"40%",
        alignSelf:"center",
        justifyContent:"center",
        marginLeft:"50%"
    },
    stepsSet:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:20
    },
    statistics: {
        flexDirection:'row',
        height:'35%',
        backgroundColor:"#ff764e"

    },
    info:{
        width:"48%",
    },
    button: {
        backgroundColor:"#ff9378",
        width:100,
        height:40,
        borderRadius:15
    },
    textSet:{
        textAlign:'center',
        fontSize:20,
        color:'#ff9378'
    },
    textInput:{
        borderStyle:"solid",
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderWidth:1,
        alignSelf:'center',
        width:80,
        marginRight:20,
        textAlign:'center',
        height:40,
        color:"#666666"
    },
    buttonSet:{
        textAlign:'center',
        fontSize:15,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        marginTop: 9,
        color:'#fff'
    },
    details:{
        textAlign:'center',
        fontSize:13,
        margin:10,
        color:"#666666",
        marginBottom:0,
        marginTop:10
    },
    statisticsText: {
        fontSize:15,
        color:"#fff",
        fontWeight:"100",
        fontFamily: 'Cochin',
        textAlign:'center'
    },
    statisticsTitle: {
        fontSize:30,
        color:"#fff",
        fontWeight:"100",
        fontFamily: 'Cochin',
        textAlign:'center',
        marginTop:35,
        marginBottom:15
    }
})

export default class StepsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           steps: global.user.steps,
            actualSteps: 0,
            weight:global.user.weight
        }
    }
    onPressGoal(value){
        this.setState({steps:value});
    }
    handleChanges = () => {
        fetch(global.ip + 'api-user-update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body:JSON.stringify({
                profile: this.state.steps
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while setting your goal!');
                } else {
                    alert('Successfully goal set!');
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done();
    }


    render() {
        const fill = this.state.actualSteps / this.state.steps * 100;
        return (
            <View style={styles.container}>
                <View style={styles.stepsView}>
                    <ProgressCircle
                        percent={fill}
                        radius={50}
                        borderWidth={5}
                        color="#ff764e"
                        shadowColor="#999"
                        bgColor="#f2efed"
                        The custom styling which will be applied to the outer circle
                    >
                        <Text style={{ fontSize: 18 }}>{this.state.actualSteps + ' steps'}</Text>
                    </ProgressCircle>
                </View>
                <View>
                    <Text style={styles.textSet}>Change it only if you want more!</Text>
                </View>
                <View style={styles.stepsSet}>
                    <TextInput  placeholder={this.state.steps.toString()}
                                underlineColorAndroid="transparent"
                                clearButtonMode='while-editing'
                                style={styles.textInput}
                                keyboardType="numeric"
                                    onChangeText={(value) => {
                                    this.onPressGoal(value)
                                }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleChanges}
                    >
                        <Text style={styles.buttonSet}>Go for more!</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statistics} >
                    <View style={styles.info}>
                        <Text style={styles.statisticsTitle}>Calories</Text>
                        <Image
                            style={{width:40, height:40, alignSelf:"center"}}
                            source={require('../assets/calories.png')}/>
                            <Text style={[styles.statisticsText, {marginTop:10}]}>{(this.state.actualSteps / 2200).toPrecision(2)}</Text>

                        <Text style={[styles.details, {marginTop:30}]}>*For an average of 2200 steps/mile</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.statisticsTitle, {marginBottom:10}]}>Distance</Text>
                        <Image
                            style={{width:50, height:50, alignSelf:"center"}}
                            source={require('../assets/distance.png')}/>
                            <Text style={[styles.statisticsText , {marginTop:6}]}>{(0.57*this.state.weight/2200).toPrecision(2) * this.state.actualSteps}</Text>
                        <Text style={[styles.details, {marginTop:31}]}>*For an average of 2200 steps/mile</Text>
                    </View>
                </View>

                <View >
                    <Text style={styles.details}> The American Heart Association recommends that adults walk 10,000 steps each day.</Text>
                </View>
            </View>
        );
    }
}