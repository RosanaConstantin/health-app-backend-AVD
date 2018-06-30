
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
        error: 'Fără un username, cum dorești să te identific?'
    },
    password: {
      password: true,
      secureTextEntry: true,
        error: 'Parolă invalidă!'
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
                       alert('Parolă și/sau username invalide!');
                       
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
                              alert(response.error + ' S-a produs o eroare în momentul accesării profilului! ');
                            } else {
                              userProfile = response.result;
                              global.user = {
                                  profileId: userProfile.profile.id,
                                  username: userProfile.username,
                                  password: userProfile.password,
                                firstName: userProfile.profile.firstName,
                                lastName: userProfile.profile.lastName,
                                gender: userProfile.profile.gender || "invalid",
                                birthdate: userProfile.profile.birthdate && userProfile.profile.birthdate.iso.split('T')[0] || "YYYY-MM-DD",
                                  phone: userProfile.profile.phoneNumber || 'invalid',
                                avatar: userProfile.profile.photo ? userProfile.profile.photo : images['noImage'],
                                email: userProfile.email,
                                language: userProfile.profile.language || ' Română',
                                location: userProfile.profile.city || 'București',
                                notifications: userProfile.profile.notifications,
                                  steps: userProfile.profile.stepsGoal || 0,
                                  weight: userProfile.profile.weight || 53,
                                  superviser: userProfile.profile.superviser || true,
                                  superviserPhone: userProfile.profile.superviserPhone
                              };
                              global.notifications =[];
                              global.temperature = 36.5;
                              global.activities =[];
                              global.bagde = 0;
                              global.locationGPS = {
                                  latitude: 44.43,
                                  longitude: 26.04
                              };
                              global.pedometru = userProfile.profile.steps;

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
                                            alert(response.error + ' Eroare în extragerea notificărilor!');
                                        } else {
                                            global.notifications = response.result;
                                            var lenght = response.result.length;
                                            for(var i = 0; i < response.result.length; i++){
                                                if(response.result[i].wasRead){
                                                    lenght--;
                                                }
                                            }
                                            global.badge = lenght;
                                            fetch(global.ip + 'api-activity-get', {
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
                                                        alert(response.error + ' Eroare la extragerea ativitatilor!');
                                                    } else {
                                                        global.activities = response.result;
                                                    }
                                                })
                                                .catch((error) => {
                                                    alert(error);
                                                })
                                                .done()
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
          alert('Rezolvă probleme apărute și revino!')
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
                          <Text style={[styles.button, styles.greenButton]} >Loghează-te!</Text>
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

