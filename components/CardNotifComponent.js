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
import Feather from 'react-native-vector-icons/Feather'
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
    containerCard:{
        borderStyle:"solid",
        width:"95%",
        alignSelf:"center",
        backgroundColor: "#9897b4",
        flexDirection:"column",
        padding:10,
        margin:20,
        borderRadius:15,
        alignItems:"flex-start"
    },
    date: {
        marginLeft:5
    },
    dateContainer:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    notif: {
        fontSize: 18,
        color:'#fff',
        marginLeft: 15,
        width:300,
    },
    icon: {
        marginLeft:5
    },
    card:{

        flexDirection:"row"
    }
});

class CardNotif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
            id: this.props.id,
            indexOf: this.props.indexOf,
            day: this.props.date.day,
            hour: this.props.date.hour,
            activeRowKey: null,
            wasRead: this.props.wasRead
        }
    }

    readNotification(id, wasRead) {
        this.setState({wasRead: wasRead});
        for(var i = 0; i < global.notifications.length; i++){
            if(global.notifications[i].objectId.localeCompare(id) === 0 ){
                global.notifications[i].wasRead = wasRead;
            }
        }
        if(wasRead){
            global.badge--;
        } else {
            global.badge++;
        }
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
                            'Esti sigur că vrei să ștergi notificarea?',
                            [
                                {text: 'Nu', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Da', onPress: () => {

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
              <View style={styles.containerCard}>
                <View style={styles.card}>

                    <Entypo
                        size={24}
                        name="notification"/>
                    <Text style={styles.notif}>{this.props.message }</Text>
                    <Feather
                        iconStyle={styles.icon}
                        size={24}
                        color={this.state.wasRead?'#646464':'#ff0026'}
                        onPress={() => this.readNotification(this.props.id, !this.state.wasRead)}
                        name="check-circle"/>

                </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{this.state.hour }, {this.state.day } </Text>
                    </View>
              </View>
            </Swipeout>

        );
    }
}

export default CardNotif;