import React, {Component} from 'react'
import {Card} from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'

import {Actions} from 'react-native-router-flux';

import images from './images'

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    greenButton: {
        backgroundColor: '#4CD964'
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        marginBottom: 30,
        paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent'
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 80
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: "#01C89E",
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
        marginLeft: 80
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
})

export default class ChangeUserCredentials extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    handleChanges = () => {
        fetch(global.ip + 'api-user-update-credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body:JSON.stringify({
                credentials: this.state
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while gettig user credentials!');
                } else {
                    Actions.settings();
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done();
    }

    onPressUsername = (value) => {
        global.username = value;
        this.setState({username: value});
    }

    onPressPassword = (value) => {
        global.password = value;
        this.setState({password: value});
    }

    onPressEmail = (value) => {
        global.user.email = value;
        this.setState({email: value});
    }

    renderEmail = () => {
        return (
            <View>
                <EvilIcons
                    name="user"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressEmail(value)}}
                    placeholder={global.user.email}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderPassword = () => {
        return (
            <View>
                <EvilIcons
                    name="user"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressPassword(value)}}
                    placeholder={"Password"}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderUsername = () => {
        return (
            <View>
                <EvilIcons
                    name="user"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressUsername(value)}}
                    placeholder={global.username}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={images['background']}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={global.user.avatar}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Card>
                        {this.renderHeader()}
                    </Card>
                    <Card>
                        {this.renderEmail()}
                    </Card>
                    <Card>
                        {this.renderUsername()}
                    </Card>
                    <Card>
                        {this.renderPassword()}
                    </Card>

                    <TouchableHighlight  overlay="transparent" onPress={this.handleChanges}>
                        <Text style={[styles.button, styles.greenButton]}>Salvează modificările!</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}

