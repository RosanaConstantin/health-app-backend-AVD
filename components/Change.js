import React, {Component} from 'react'
import {Card} from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'

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

export default class Change extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            firstName: '',
            lastName: '',
            birthdate: '',
            language: '',
            location: '',
            gender: ''
        }
    }

    handleChanges = () => {
        fetch(global.ip + 'api-user-update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body:JSON.stringify({
                profile: this.state
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    alert(response.error + ' Error while gettig user profile!');
                } else {
                    Actions.dashboard();
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done();
    }

    onPressTel = (value) => {
        global.user.phone = value;
        this.setState({phoneNumber: value});
    }
    onPressFirst = (value) => {
        global.user.firstName = value;
        this.setState({firstName: value});
    }
    onPressLast = (value) => {
        global.user.lastName = value;
        this.setState({lastName: value});
    }
    onPressBirth = (value) => {
        global.user.birthdate = value;
      //  this.setState({birthdate: value});
    }
    onPressCity = (value) => {
        global.user.location = value;
        this.setState({location: value});
    }
    onPressGender = (value) => {
        global.user.gender = value;
        this.setState({gender: value});
    }
    onPressLanguage = (value) => {
        global.user.language = value;
        this.setState({language: value});
    }

    renderLocation = () => {
        return (
            <View>
                <EvilIcons
                    name="location"
                    size={30}
                    color="#000" />
            <TextInput
                       placeholder={global.user.location}
                       underlineColorAndroid="transparent"
                       clearButtonMode='while-editing'
                       onChangeText={(value) => {
                           this.onPressCity(value)
                       }}
            />
            </View>
        )
    }

    renderFirstName = () => {
        return (
            <View>
                <MaterialCommunityIcons
                    name="rename-box"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressFirst(value)}}
                    placeholder={global.user.firstName}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderLastName = () => {
        return (
            <View>
                <MaterialCommunityIcons
                    name="rename-box"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressLast(value)}}
                    placeholder={global.user.lastName}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderTel = () => {
        return (
            <View>
                <MaterialCommunityIcons
                    name="phone"
                    size={30}
                    color="#000" />
                <TextInput
                    placeholder={global.user.phone}
                    onChangeText={(value) => {
                        this.onPressTel(value)
                    }}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'
                />
            </View>
        )
    }
    renderGender = () => {
        const data = [{
            value: 'Female',
            }, {
            value: 'Male',
            }];

        return (
            <Dropdown
                label='Gender'
                value={global.user.gender}
                data={data}
                onChangeText={(value) => this.onPressGender(value)}
            />
        );
    }

    renderLanguage = () => {
        return (
            <View>
                <MaterialIcons
                    name="language"
                    size={30}
                    color="#000" />
                <TextInput
                    onChangeText={(value) => {this.onPressLanguage(value)}}
                    placeholder={global.user.language}
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'/>
            </View>
        )
    }

    renderBirthday = () => {
        return (
            <DatePicker
                style={{width: 280}}
                date={global.user.birthdate}
                mode="date"
                maxDate="1999-01-01"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(date) => {
                    this.onPressBirth(date);
                }}
                />
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
                        {this.renderFirstName()}
                    </Card>
                    <Card>
                        {this.renderLastName()}
                    </Card>
                    <Card>
                        {this.renderTel()}
                    </Card>
                    <Card>
                        {this.renderLocation()}
                    </Card>
                    <Card>
                        {this.renderGender()}
                    </Card>
                    <Card>
                        {this.renderBirthday()}
                    </Card>
                    <Card>
                        {this.renderLanguage()}
                    </Card>

                    <TouchableHighlight  overlay="transparent" onPress={this.handleChanges}>
                        <Text style={[styles.button, styles.greenButton]}>Save changes</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}

