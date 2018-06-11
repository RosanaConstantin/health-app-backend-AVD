import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    card:{
        borderStyle:"solid",
        width:"95%",
        alignSelf:"center",
        backgroundColor: "#ff9378",
        flexDirection:"row",
        padding:10,
        margin:10,
        borderRadius:15,
        alignItems:"flex-start"
    },
    notif: {
        fontSize: 18,
        color:'#fff',
        marginLeft: 15,
        width:230,
    },
    date: {
        marginLeft:5
    },
    dateContainer:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    }
});

class CardActivities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
            day: this.props.date.day,
            hour: this.props.date.hour
        }
    }

    render() {
        return (
                <View style={styles.card}>
                    <Feather
                        size={24}
                        name="activity"/>
                    <Text style={styles.notif}>{this.state.message }</Text>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{this.state.day }</Text>
                        <Text style={styles.date}>{this.state.hour }</Text>
                    </View>
                </View>
        );
    }
}

export default CardActivities;