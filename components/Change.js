import React, {Component} from 'react'
import {Card, Icon} from 'react-native-elements'
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
            city: '',
            gender: '',
            photoName: ''
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
            body:{
                profile: this.state
            }
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
        this.setState({phoneNumber: value});
    }

    onPressEmail = (value) => {
        this.setState({email: value});
    }

    onPressFirst = (value) => {
        this.setState({firstName: value});
    }

    onPressLast = (value) => {
        this.setState({lastName: value});
    }

    onPressBirth = (value) => {
        this.setState({birthdate: value});
    }

    onPressCity = (value) => {

        this.setState({city: value});
    }

    onPressGender = (value) => {
        this.setState({gender: value});
    }

    onPressLanguage = (value) => {
        return (
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={images['background']}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            source={global.user.avatar}
                            style={styles.userImage}
                        />
                        <TextInput onPress={(value) => {
                            this.onPressFirst(value)
                        }} style={styles.userNameText}>{global.user.firstName}</TextInput>
                        <TextInput onPress={(value) => {
                            this.onPressLast(value)
                        }} style={styles.userNameText}>{global.user.lastName}</TextInput>
                        <View style={styles.userAddressRow}>
                            <View>
                                <Icon
                                    name="place"
                                    underlayColor="transparent"
                                    iconStyle={styles.placeIcon}
                                />
                            </View>
                            <View style={styles.userCityRow}>
                                <TextInput style={styles.userCityText}>
                                    {global.user.location}
                                    onPress = {(value) => {
                                    this.onPressCity(value)
                                }}
                                </TextInput>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    renderTel = () => {
        return (
            <TextInput>
                {global.user.phone}
                onPress = {(value) => {
                this.onPressTel(value)
            }}
            </TextInput>
        )
    }

    renderEmail = () => {
        return (
            <TextInput>
                {global.user.email}
                onPress = {(value) => {
                this.onPressEmail(value)
            }}
            </TextInput>
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
            <Card>
                <Icon
                    containerStyle={{backgroundColor: '#FEA8A1'}}
                    icon={{
                        type: 'material',
                        name: 'language',
                    }}
                />
                <TextInput onPress={(value) => this.onPressLanguage(value)}>
                    {global.user.language}
                </TextInput>
            </Card>
        )
    }

    renderBirthday = () => {
        return (
            <DatePicker
                style={{width: 280}}
                date={this.state.date}
                mode="date"
                placeholder="Birthdate"
                maxDate="2016-06-01"
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

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Card>
                        {this.renderHeader()}
                        {this.renderTel()}
                        {this.renderEmail()}
                        <Card>
                            {this.renderGender()}
                            {this.renderBirthday()}
                            {this.renderLanguage()}
                        </Card>

                    </Card>

                    <TouchableHighlight onPress={this.handleChanges}>
                        <Text style={[styles.button, styles.greenButton]}>Save changes</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}

