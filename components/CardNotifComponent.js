import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
    card:{
        borderStyle:"solid",
        width:"95%",
        alignSelf:"center",
        backgroundColor: "#9897b4",
        flexDirection:"row",
        padding:10,
        margin:20,
        borderRadius:15
    },
    notif: {
        fontSize: 18,
        color:'#fff',
        marginLeft: 15
    }
});

class CardNotif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
            id: this.props.id,
            indexOf: this.props.indexOf,
            activeRowKey: null,
            wasRead: this.props.wasRead
        }
    }

    readNotification(id, wasRead) {
        this.setState({wasRead: wasRead});
        fetch(global.ip + 'api-notification-mark-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body:JSON.stringify({
                notif: {
                    notificationId: id,
                    wasRead: wasRead
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while updating your notification!');
                } else {
                    alert('Successfully update notification!');
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done();
        if(wasRead){
            global.badge--;
        } else {
            global.badge++;
        }

    }


    render() {
       const swipeSettings ={
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.id });
            },
            backgroundColor: 'transparent',
            right: [
                {
                    component: (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',

                            }}
                        >
                            <Image style={{height:25, width:25}} source={require('../assets/delete_white.png')} />
                        </View>
                    ),
                    backgroundColor: "#ffccc0",
                    width:20,
                    height:20,
                    borderRadius:15,
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {

                                        this.props.parentList(this.props.indexOf);
                                    }},
                            ],
                            { cancelable: true }
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.id,
            sectionId: 1
        }
        return (
            <Swipeout {...swipeSettings}>
                <View style={styles.card}>

                    <Entypo
                        size={24}
                        name="notification"/>
                    <Text style={styles.notif}>{this.props.message }</Text>
                </View>
            </Swipeout>

        );
    }
}

export default CardNotif;