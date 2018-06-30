import React, { Component } from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import CardActivities from "./CardActivitiesComponent";

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#ffe4cd",
        flex:1,

    },
    containerScroll: {
        //  width: "100%",
        //height: "100%",
        marginBottom:50
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
           activities: global.activities
        }
    }

    render() {
        return (
            this.state.activities.length === 0 ? (
                <View>
                    <Text style={styles.warningText}>Încă nu ai activități!</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>Ultimele activități</Text>
                    <ScrollView style={styles.containerScroll}>
                        {this.state.activities.slice(0,19).map((activity, index) => {
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
    }
  }