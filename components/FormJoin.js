
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    KeyboardAvoidingView,
    Text
} from 'react-native';
import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';


const Form = t.form.Form

const newUser = t.struct({
    firstName: t.String,
    lastName: t.String,
    username: t.String,
    email: t.String,
    password: t.String
})

const options = {
    fields: {
        firstName: {
            autoCapitalize: 'none',
            autoCorrect: false,
            returnKeyType: 'next'
        },
        lastName: {
            autoCapitalize: 'none',
            autoCorrect: false,
            returnKeyType: 'next'
        },
        username: {
            autoCapitalize: 'none',
            autoCorrect: false,
            returnKeyType: 'next',
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        email: {
            autoCapitalize: 'none',
            autoCorrect: false,
            returnKeyType: 'next',
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        password: {
            autoCapitalize: 'none',
            password: true,
            secureTextEntry: true,
            autoCorrect: false,
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        }
    }
}

export default class FormInsideJoin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: {
                firstName: '',
                lastName: '',
                username:'',
                email: '',
                password: ''
            }
        }
    }

    componentWillUnmount() {
        this.setState = {
            value: {
                firstName: '',
                lastName: '',
                username:'',
                email: '',
                password: null
            }
        }
    }

    _onChange = (value) => {
        this.setState({
            value
        })
    }

    _handleAdd = () => {
        const value = this.refs.form.getValue();
        console.log(value);
        // If the form is valid...
        if (value) {
            const data = { 
                firstName: value.firstName,
                lastName: value.lastName,
                username: value.username,
                email: value.email,
                password: value.password,
            }
            // Serialize and post the data
            const json = JSON.stringify(data);
            
            fetch(global.ip + 'api-user-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc'
                },
                body: json
            })
                .then((response) => response.json())
                .then((response) => {
                     if(response.error){
                         alert(response.error + ' Try again to join in!');
                     } else {
                        alert('Your account has been created! Sign in and go to Settings to complete your profile!');
                        Actions.home();
                     }
                })
                .catch((error) => {
                    alert(error);
                })
                .done()
        } else {
            alert('Please fix the errors listed and try again.')
        }
    }

    render() {
        return (
            <ScrollView  style={styles.container} keyboardShouldPersistTaps='always'>
    
                <Form
                    ref='form'
                    type={newUser}
                    options={options}
                    value={this.state.value}
                    onChange={this._onChange}
                   
                />
                <TouchableHighlight underlayColor="transparent" onPress={this._handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Join us</Text>
                </TouchableHighlight>
                
               </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flex: 1,
        flexDirection: 'column'
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
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
