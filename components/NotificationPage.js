import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import CardNotif from "./CardNotifComponent";

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#b2edef",
        flex:1
    },
    containerScroll: {
      //  width: "100%",
        //height: "100%",
    },
    title: {
        color:"#9897b4",
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
        fontSize:25
    }
})
export default class NotificationPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: global.notifications,
            deletedRowKey: null
        }
    }

    refreshList = (deletedKey) => {
        var removeIndexState = this.state.notifications.map(function(item) { return item.objectId; }).indexOf(deletedKey);
        this.state.notifications.splice(removeIndexState,1);
        var removeIndexGlobal = global.notifications.map(function(item) { return item.objectId; }).indexOf(deletedKey);
        global.notifications.splice(removeIndexGlobal,1);
        global.badge--;
    }

    render() {
        return (
            !global.user.notifications ? (
                <View>
                    <Text>
                        You must be enrolled in notifications. Go to settings!!</Text>
                </View>
            ) : (
                    this.state.notifications.length === 0 ? (
                        <View>
                            <Text>You don't have notifications!</Text>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <Text style={styles.title}>Your notifications</Text>
                            <ScrollView style={styles.containerScroll}>
                                {this.state.notifications.map((notif, index) => {
                                    return (<CardNotif
                                        key={index}
                                        id={notif.objectId}
                                        message={notif.message}
                                        parentList={this}
                                    />)
                                })}
                            </ScrollView>
                        </View>
                    )
             //   )
            )
        )
    }
}