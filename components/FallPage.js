import React, { Component } from 'react';
import { TouchableOpacity, Image, Text} from 'react-native';

export default class FallPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            deletedRowKey: null,
        }
    }

    componentDidMount() {
        var aux = global.notifications;
        this.setState({notifications: aux});
    }

    refreshList = (deletedKey) => {
        // global.notifications.splice(deletedKey,1);
        global.badge--;
        var objectId = this.state.notifications[deletedKey].objectId;
        this.setState({notification: this.state.notifications.splice(deletedKey,1)});
        fetch(global.ip + 'api-notification-delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify(
                {notificationId: objectId}
            )
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while deleting user notifications!');
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done()
    }

    render() {
        return (
            !global.user.notifications ? (
                <View>
                    <Text style={styles.warningText}>
                        You must be enrolled in notifications. Go to settings!!</Text>
                </View>
            ) : (
                this.state.notifications.length === 0 ? (
                    <View>
                        <Text style={styles.warningText}>You don't have notifications!</Text>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.title}>Your notifications</Text>
                        <ScrollView style={styles.containerScroll}>
                            {this.state.notifications.map((notif, index) => {
                                return (
                                    <CardNotif
                                        key={index}
                                        id={notif.objectId}
                                        message={notif.message}
                                        indexOf={index}
                                        wasRead={notif.wasRead}
                                        parentList={this.refreshList}
                                    />)
                            })}
                        </ScrollView>
                    </View>
                )
            )
        )
    }
}