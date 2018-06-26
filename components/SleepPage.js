import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'
import Stars from '../assets/stars.mp4'
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import TimePicker from 'react-native-simple-time-picker';

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%",
        height:"100%"

    },
    text:{
        color:"#fff",
        fontSize:25,
        textAlign:"center",
        marginTop:10
    },
    quality:{
        backgroundColor:"#D8EDEC",
        height:"20%",
        width:"95%",
        borderRadius:15,
        margin:20
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        flex: 1,
       // justifyContent: 'center',
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        height:50,
        width:"100%",
        flexDirection:"row",
        backgroundColor:"#111429",

    }
})
export default class SleepPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            timeOfSleep:0,
            selectedHours: 0,
            selectedMinutes: 0,
            bedTimeHours: 0,
            bedTimeMinutes:0,
            diffHours:0,
            diffMinutes:0
        }
    }

    componentWillMount(){
        var laterDate = moment();
        var hours = laterDate.get('hours');
        var minutes = laterDate.get('minutes');
        var bedTimeH = hours + 8;
        if (bedTimeH >24){
            this.setState({bedTimeHours: bedTimeH-24});
        } else {
            this.setState({bedTimeHours: bedTimeH})
        }
        this.setState({bedTimeMinutes: minutes});
        this.setState({selectedHours: hours})
        this.setState({selectedMinutes: minutes})
    }



    render() {
       const hours = this.state.bedTimeHours;
       const minutes = this.state.bedTimeMinutes;
        const selectedHours = this.state.selectedHours;
        const selectedMinutes = this.state.selectedMinutes;
        const diffHours = this.state.diffHours;
        const diffMinutes = this.state.diffMinutes;

        return (
         <View style={styles.container}>

             <Video
                 style={styles.video}
                 source={Stars}
                 playInBackground={true}
                 repeat={true}
                 resizeMode={"cover"}
             />
             < View style={styles.content}>
                 <View style={{flexDirection:"row" }}>
                     <MaterialCommunityIcons
                         name="weather-night"
                         size={24}
                         color={"#fff"}
                         style={{marginTop:30, marginLeft:15, marginRight:10}}
                     />
                     <Text style={{textAlign:"center", color:"#fff", fontSize:30 , marginTop:20, marginBottom:20}}>Îmbunătățește-ți somnul!</Text>
                 </View>
                    <View>
                        <TouchableOpacity style={{width:"98%", height:80,  backgroundColor: '#38446C', alignSelf:"center", borderRadius:15}}>
                            <Text style={{fontSize:20, textAlign:"center", color:"#fff"}}>Setează-ți ora de culcare pentru astăzi!</Text>
                            <TimePicker
                                selectedHours={selectedHours}
                                style={{height:70}}
                                selectedMinutes={selectedMinutes}
                                onChange={(hours, minutes) => {
                                    var now = moment();
                                    var hourN = - now.get('hours') + hours;
                                    var minuteN = - now.get('minutes') + minutes;

                                    if(hourN < 0){
                                        hourN = -hourN;
                                        if(minuteN <= 0 )
                                            minuteN = -minuteN
                                        else if (minuteN > 0)
                                        {
                                            hourN--;
                                            minuteN = 60 - minuteN;
                                        }
                                    } else if (hourN === 0) {
                                        if(minuteN > 0){
                                            hourN = 0;
                                        } else {
                                            alert("Nu poti dormi in trecut!");
                                            return;
                                        }
                                    } else {
                                        hourN = 24-hourN;
                                    }

                                    this.setState({
                                        diffHours: hourN,
                                        diffMinutes: minuteN,
                                    });
                                    if (hourN === 0 && minuteN <= 15){
                                        fetch(global.ip + 'api-notification-save', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                                                'X-Parse-Session-Token': global.sessionToken
                                            },
                                            body: JSON.stringify(
                                                {message: "Mai ai mai puțin de "+ minuteN+" minute până când trebuie să te culci!"}
                                            )
                                        })
                                            .then((response) => response.json())
                                            .then((response) => {
                                                global.notifications.push( {
                                                    message: "Mai ai mai puțin de "+ minuteN+" minute până când trebuie să te culci!",
                                                    objectId: response.id,
                                                    wasRead: response.wasRead
                                                })
                                            })
                                            .catch((error) => {alert(error)})
                                    }
                                    var bedTimeH = hours + 8;
                                    if (bedTimeH > 24) {
                                        this.setState({bedTimeHours: -24 + bedTimeH});
                                    } else {
                                        this.setState({bedTimeHours: bedTimeH})
                                    }

                                    this.setState({bedTimeMinutes: minutes});
                                    this.setState({selectedHours: hours, selectedMinutes: minutes});
                                }
                                }
                            />
                        </TouchableOpacity>
                    </View>
                     <Text style={styles.text}>Mai ai doar {diffHours}h și {diffMinutes}' până când trebuie să te duci în pat!</Text>
                    <Text style={{fontSize:20, color:"#fff",textAlign:"center", marginTop:20}}>Pentru un somn odihnitor, respectă următoarele sfaturi! </Text>
                 <View style={{flexDirection:"row", margin:40, marginTop:20}}>
                     <View style={{flexDirection:"column"}}>
                         <View style={{width:150, height:150, marginBottom:10, backgroundColor: '#38446C', borderRadius:15}}>
                             <Entypo
                                 name="light-down"
                                 size={30}
                                 color="#fff"
                                 style={{alignSelf:"center"}}
                             />
                             <Text style={{color:"#fff", fontSize:15, marginTop:10, textAlign:"center"}}>Oprește sursele de lumină din cameră. Folosește draperii!</Text>
                         </View>
                         <View style={{width:150, height:150, backgroundColor: '#38446C', borderRadius:15}}>
                             <MaterialCommunityIcons
                                 name="temperature-celsius"
                                 size={30}
                                 color="#fff"
                                 style={{alignSelf:"center"}}
                             />
                             <Text style={{color:"#fff", fontSize:15, marginTop:10, textAlign:"center"}}>Păstrează o temperatură moderată a camerei!</Text>
                         </View>
                     </View>
                     <View style={{flexDirection:"column", marginLeft:40}}>
                         <View style={{width:150, height:150, marginBottom:10, backgroundColor: '#38446C', borderRadius:15}}>
                             <Entypo
                                 name="hour-glass"
                                 size={30}
                                 color="#fff"
                                 style={{alignSelf:"center"}}
                             />
                             <Text style={{color:"#fff", fontSize:15, marginTop:10, textAlign:"center"}}>Încearcă să adormi la ore potrivite și să dormi cel puțin 8h!</Text>
                         </View>
                         <View style={{width:150, height:150, backgroundColor: '#38446C', borderRadius:15}}>
                             <MaterialCommunityIcons
                                 name="bed-empty"
                                 size={30}
                                 color="#fff"
                                 style={{alignSelf:"center"}}
                             />
                             <Text style={{color:"#fff", fontSize:15, marginTop:10, textAlign:"center"}}>Cumpără-ți o saltea confortabilă!</Text>

                         </View>
                     </View>
                 </View>

                 <View style={styles.footer}>
                     <View style={{width:"30%", marginLeft:20}}>
                         <FontAwesome
                             name="bed"
                             size={25}
                             color="#fff"
                         />
                        <Text style={{color:"#fff", fontSize:20}}>{selectedHours}:{selectedMinutes}</Text>
                     </View>
                         <View style={{marginLeft:"8%"}}>
                             <Ionicons
                                 name="md-time"
                                 size={24}
                                 color="#fff"
                             />
                         <Text style={{color:"#fff", fontSize:20}}>{moment().format('LT')}</Text>
                     </View>
                     <View style={{marginLeft:"20%"}}>
                         <Feather
                             name="sun"
                             size={24}
                             color="#fff"
                         />
                         <Text style={{color:"#fff", fontSize:20}}>{hours}:{minutes}</Text>
                     </View>
                 </View>
             </View>
         </View>
        );
    }
}
