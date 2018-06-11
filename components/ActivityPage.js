import React, { Component } from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import CardActivities from "./CardActivitiesComponent";
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#ffe4cd",
        flex:1
    },
    containerScroll: {
        //  width: "100%",
        //height: "100%",
    },
    title: {
        color:"#ff9378",
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
        fontSize:25
    },
    warningText:{
        fontSize:30,
        color:"#9897b4",
        textAlign:"center",
        marginTop:"50%"
    }
})
export default class ActivityPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           activities: [],
            isLoading: true
        }
    }

    componentDidMount(){
        fetch(global.ip + 'api-activity-get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            }
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while getting user activities!');
                } else {
                    this.setState({activities: response.result});
                    this.setState({isLoading: false})
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done()
        }

    render() {
        return (
            this.state.isLoading ? (
                <Progress.Circle size={30} indeterminate={true} style={{marginTop:"50%", marginLeft:"48%"}} />
            ) : (
            this.state.activities.length === 0 ? (
                <View>
                    <Text style={styles.warningText}>You don't have activities!</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>Your last activities</Text>
                    <ScrollView style={styles.containerScroll}>
                        {this.state.activities.map((activity, index) => {
                            return (
                                <CardActivities
                                    key={index}
                                    message={activity.message}
                                    date={activity.createdAt}
                                    indexOf={index}
                                />)
                        })}
                    </ScrollView>
                </View>
            )
        )
            )


    }
  }