
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

import t from 'tcomb-form-native';
import images from './images';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const options = {
  fields: {
    username: {
        returnKeyType: 'next',
        error: 'Without an username how are you going to sign in?'
    },
    password: {
      password: true,
      secureTextEntry: true,
        error: 'Invalid password'
    }
  }
};


export default class FormInsideSign extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          value: {
              username:'',
              password: ''
          }
      }
      global.sessionToken = '';
  }

  componentWillUnmount() {
      this.setState = {
          value: {
              username:'',
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
              username: value.username,
              password: value.password
          }
          global.username = data.username;
          global.password = data.password;
          // Serialize and post the data
          const json = JSON.stringify(data);
          fetch(global.ip + 'api-user-login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc'
              },
              body: json
          })
              .then((response) => response.json())
              .then((response) => {
                   if(response.result === 500){
                       alert('Invalid username/password');
                       
                  } else {
                    responseJson = JSON.stringify(response);
                    global.sessionToken = response.result && response.result.sessionToken;
                
                        fetch(global.ip + 'api-user-get-details', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                            'X-Parse-Session-Token': global.sessionToken
                          }
                        })
                          .then((response) => response.json())
                          .then((response) => {
                            if (response.error) {
                              alert(response.error + ' Error while getting user profile!');
                            } else {
                              userProfile = response.result;
                              global.user = {
                                  profileId: userProfile.profile.id,
                                  username: userProfile.username,
                                  password: userProfile.password,
                                firstName: userProfile.profile.firstName,
                                lastName: userProfile.profile.lastName,
                                gender: userProfile.profile.gender || "not updated",
                                birthdate: userProfile.profile.birthdate && userProfile.profile.birthdate.iso.split('T')[0] || "YYYY-MM-DD",
                                  phone: userProfile.profile.phoneNumber || 'not updated',
                                avatar: userProfile.profile.photo ? userProfile.profile.photo : images['noImage'],
                                email: userProfile.email,
                                language: userProfile.profile.language || ' English',
                                location: userProfile.profile.city || 'Londra',
                                notifications: userProfile.profile.notifications,
                                  steps: userProfile.profile.stepsGoal || 0,
                                  weight: userProfile.profile.weight || 53
                              };
                              global.notifications =[];
                              global.bagde = 0;
                              Actions.dashboard();
                                fetch(global.ip + 'api-notification-get', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                                        'X-Parse-Session-Token': global.sessionToken
                                    }
                                })
                                    .then((response) => response.json())
                                    .then((response) => {
                                        if (response.error) {
                                            alert(response.error + ' Error while getting user notifications!');
                                        } else {
                                            global.notifications = response.result;
                                            global.badge = response.result.length;
                                        }
                                    })
                            }
                          })
                          .catch((error) => {
                            alert(error);
                          })
                          .done()
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
                          type={User}
                          options={options}
                          value={this.state.value}
                          onChange={this._onChange}
                      />
                      <TouchableHighlight underlayColor="transparent" onPress={this._handleAdd}>
                          <Text style={[styles.button, styles.greenButton]} >Sign in</Text>
                      </TouchableHighlight>

             </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 50,
      flex: 1,
      flexDirection: 'column',

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

