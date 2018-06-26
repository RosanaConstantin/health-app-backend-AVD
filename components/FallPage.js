import React, { Component } from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet,Switch, TextInput,KeyboardAvoidingView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import moment from "moment/moment";

const phone = '';

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%",
        height:"100%"

    },
    containerTitle: {
        width:"100%",
        height:"10%",
        backgroundColor:"#4a4a4a"
    },
    title: {
        fontSize:30,
        color:"#fff",
        textAlign:"center",
        alignSelf:"center",
        marginTop:"4%"
    },
    containerSwitch: {
        flexDirection:"row",
        marginTop:10
    },
    textSwitch: {
        fontSize:18,
        color:"#4a4a4a",
        textAlign:"center",
        alignSelf:"center",
        // marginTop:20
    },
    switch: {
        marginLeft:20
    },
    phone: {
        alignSelf:"center",
        borderRadius:15,
        width:300,
        height:75,
        marginTop:30,
        backgroundColor:"#85a8ff"
    },
    textSuperviser:{
        fontSize:18,
        color:"#fff",
        textAlign:"center",
        alignSelf:"center"
    },
    input:{
        height: 50,
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:15,
        textAlign:"center",
        marginTop:20,
        alignSelf:"center"
    },
    save: {
        alignSelf:"center",
        borderRadius:15,
        width:250,
        height:50,
        marginTop:30,
        backgroundColor:"#85a8ff"
    },
    textSave: {
        fontSize:18,
        color:"#fff",
        textAlign:"center",
        alignSelf:"center"
    },
    advice:{
        alignSelf:"center",
        marginTop:200
    },
    adviceText:{
        textAlign:"center",
        fontSize:25,
        color:"#4a4a4a"
    },
    safeImage: {
        width:200,
        height:200,
        margin:50,
        alignSelf:"center"
    },
    safeText:{
        fontSize:30,
        textAlign:"center"
    },
    alarmImage: {
        width:200,
        height:200,
        margin:50,
        marginTop:25,
        alignSelf:"center"
    },
    alarmText:{
        fontSize:20,
        textAlign:"center",

    },
    messageText:{
        fontSize:30,
        color:"#fff",
        textAlign:"center",
        width:"75%"
    },
    alarmContainer:{
        flexDirection:"row",
        backgroundColor:"#4a4a4a",
        width:"100%",
    }
})

export default class FallPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            superviser: global.user.superviser,
            superviserPhone: global.user.superviserPhone,
            changePhone: false,
            alarm: global.alarm
        }
    }

    updateSuperviser(value){
        if(value){
            this.setState({superviserPhone: value});


        fetch(global.ip + 'api-user-update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify(
                {profile: {superviserPhone: value}}
            )
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while updating superviser phone!');
                }
                alert('Successfully updated superviser phone!');
                fetch(global.ip + 'api-activity-save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                        'X-Parse-Session-Token': global.sessionToken
                    },
                    body: JSON.stringify({
                        message: "Ai modificat numarul de telefon al supraveghetorului tau!"
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        var date = moment(response.createdAt).format('LLL').split(',');
                        global.activities.unshift( {
                            message: "Ai modificat numarul de telefon al supraveghetorului tau!",
                            objectId: response.id,
                            createdAt: {
                                day: date[0],
                                hour: date[1].replace("2018", "")
                            }
                        })
                    })
                    .catch((error) => alert(error.message))
            })
            .catch((error) => {
                alert(error);
            })
            .done()
        }
        this.setState({changePhone: false})
    }

    toogleSuperviser () {
        this.setState({superviser: !this.state.superviser});
        global.user.superviser = !this.state.superviser;
        fetch(global.ip + 'api-user-update-superviser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify(
                {superviser: !this.state.superviser}
            )
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Eroare în momentul extragerii profilului!');
                } else {
                    var state = '';
                    if(this.state.superviser){
                        alert('Abonat cu succes!');
                        state = "abonat";
                    } else {
                        alert('Dezabonat cu succes');
                        state = "dezabonat";
                    }
                    fetch(global.ip + 'api-activity-save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                            'X-Parse-Session-Token': global.sessionToken
                        },
                        body: JSON.stringify({
                            message: "Serviciul de alerta in cas de urgenta: Te-ai " + state + " cu succes!"
                        })
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            var date = moment(response.createdAt).format('LLL').split(',');
                            global.activities.unshift( {
                                message: "Serviciul de alerta in cas de urgenta: Te-ai " + state + " cu succes!",
                                objectId: response.id,
                                createdAt: {
                                    day: date[0],
                                    hour: date[1].replace("2018", "")
                                }
                            })
                        })
                        .catch((error) => alert(error.message))
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done()

        this.setState({changePhone: false})
    }

    activate(){
        this.setState({changePhone: true})
    }

    render() {
        return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.containerTitle}>
                <Text style={styles.title}> Detecția căderii</Text>
            </View>
            <View style={styles.containerSwitch}>
                <MaterialCommunityIcons
                    name="exclamation"
                    size={30}
                    color={"#ff000e"}
                    />
                <Text style={styles.textSwitch}> Sfat: Alege să fii supravegheat!</Text>
                <Switch
                    style={styles.switch}
                    onValueChange={this.toogleSuperviser.bind(this)}
                    value={this.state.superviser} />
            </View>
            <View>
                {this.state.superviser? (
                    <View>
                        <TouchableOpacity
                            style ={styles.phone}
                            onPress={()=>{this.activate()}}
                        >
                            <Text style={styles.textSuperviser}>Schimbă numărul de telefon al supraveghetorului tău!</Text>
                        </TouchableOpacity>
                        {this.state.superviserPhone ? (
                            this.state.changePhone ?(
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => this.phone = text}
                                        value={this.state.superviserPhone}
                                        maxLength={10}
                                    />
                                    <TouchableOpacity
                                        style ={styles.save}
                                        onPress={()=>{this.updateSuperviser(this.phone)}}
                                    >
                                        <Text style={styles.textSave}>Salvează!</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View/>
                            )
                        ) : (
                            <View>
                                <Text style={styles.adviceText}>Nu ai salvat niciun număr de telefon pentru supraveghetor!</Text>
                            </View>
                            )}
                    </View>
                    ) : (
                        <View style={styles.advice}>
                            <Text style={styles.adviceText}>Nu ai un supraveghetor încă?</Text>
                            <Text style={styles.adviceText}>Găsesște-l!</Text>
                            <Text style={styles.adviceText}>
                                Dacă te afli într-o situație critică, te poate salva!</Text>
                        </View>
                )}
            </View>
            <View>
                {this.state.alarm ? (
                    <View style={styles.alarmC}>
                        <Image
                            style={styles.alarmImage}
                            source={require('../assets/fallD.png')}
                        />
                        <Text  style={styles.alarmText}>A fost detectată o cădere!</Text>
                        <View style={styles.alarmContainer}>
                            <Entypo
                                name="message"
                                size={50}
                                color={"#ff000e"}
                            />
                            <Text style={styles.messageText}>Mesajul de alarmă va fi trimis către {this.state.superviserPhone}</Text>
                        </View>
                    </View>
                    ) : (
                    <View>
                        <Image
                            style={styles.safeImage}
                            source={require('../assets/safe.png')}
                        />
                        <Text  style={styles.safeText}>Păstrează poziția dreaptă! Ai încredere în tine!</Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}
}