import React, { Component } from 'react'
import {ScrollView, StyleSheet, Text, View, Picker, Alert} from 'react-native'
import { Avatar, List, ListItem } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from './Icon'
import InfoText from './InfoText'
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
      marginBottom:130
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
      width:'100%',
      height:'12%',
    paddingTop: 6,
      // flex: 1,
      justifyContent: 'space-between',
  },
  userImage: {
    marginRight: 12,
  },
  listContainer: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
  },
  listItemContainer: {
    borderBottomColor: '#ECECEC',
  },
    logOut: {
    color: 'gray',
        fontSize: 16
    }
})


export default class SettingsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           pushNotifications: global.user.notifications,
            badge: global.bagde
        }
    }

  onChangePushNotifications = () => {
    this.setState({pushNotifications: !this.state.pushNotifications});
    global.user.notifications = !this.state.pushNotifications;
      fetch(global.ip + 'api-user-update-notifications', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
              'X-Parse-Session-Token': global.sessionToken
          },
          body:JSON.stringify({
              notifications: !this.state.pushNotifications
          })
      })
          .then((response) => response.json())
          .then((response) => {
              if (response.error) {
                  alert(response.error + ' Error while gettig user profile!');
              } else {
                  if(this.state.pushNotifications){
                      alert('Successfully subscribed on notifications');
                  } else {
                      alert('Successfully unsubscribed on notifications');
                  }
              }
          })
          .catch((error) => {
              alert(error);
          })
          .done();
  }

    destoyUser = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to delete ?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                        fetch(global.ip + 'api-user-delete', {
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
                                    alert(response.error + ' Error while deleting the user !');
                                } else {
                                    alert('Successfully deleted the user');
                                    Actions.home();
                                }
                            })
                            .catch((error) => {
                                alert(error);
                            })
                            .done();
                    }},
            ],
            { cancelable: true }
        );
    }

  changeProfile = () =>{
      Actions.change();
  }

  showLanguageMessage = () => {
    alert('Change your language from profile field!');
}

    showLocationMessage = () => {
      alert('Change your location from profile field!');
    }

    logOut = () => {
        fetch(global.ip + 'logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            }
        })
            .then((response) => response.json())
            .then((response) => {
                if(response.result === 500){
                    alert('Something went bad while logging out');
                } else{
                    alert('Successfully logged out')
                    Actions.home();
                }
            })
            .catch((error) => {
                alert(error);
            })
            .done()
    }

    changeUserCredentials = () => {
        Actions.credentialsChange();
    }

    render(){
      return (
        <View>
          <View style={styles.userRow}>
            <View style={styles.userImage}>
              <Avatar
                large
                rounded
                source={{uri: 'data:image/png;base64,' + global.user.avatar}}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>{global.user.firstName + ' ' + global.user.lastName}</Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                }}
              >
                {global.user.email}
              </Text>
            </View>
              <View>
                  <Text style={styles.logOut}>Log out</Text>
                  <Entypo
                      size={30}
                     name="log-out"
                    onPress={() => this.logOut()}
                  />
              </View>
          </View>
          <ScrollView style={styles.scroll}>
          <InfoText text="Account" />
            <ListItem
                title="Profile settings"
                rightTitle={'Profile'}
                onPress={() => this.changeProfile()}
                containerStyle={styles.listItemContainer}
                leftIcon={
                    <Icon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        name='md-person'
                        ionicons={true}
                    />
                }
            />
            <ListItem
                title="Credentials settings"
                rightTitle={'Profile'}
                onPress={() => this.changeUserCredentials()}
                containerStyle={styles.listItemContainer}
                leftIcon={
                    <Icon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        name='account-settings-variant'
                        materialsC={true}
                    />
                }
            />

          <List containerStyle={styles.listContainer}>
            <ListItem
              switchButton
              hideChevron
              title="Push notifications"
              switched={this.state.pushNotifications}
              onSwitch={this.onChangePushNotifications}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#FFADF2',
                  }}
                  ionicons={true}
                    name='md-notifications'
                />
              }
            />
            <ListItem
              title="Location"
              rightTitle={global.user.location}
              onPress={() => this.showLocationMessage()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{ backgroundColor: '#57DCE7' }}
                    entypo={true}
                    name='location'
                />
              }
            />
            <ListItem
              title="Language"
              rightTitle={global.user.language}
              onPress={() => this.showLanguageMessage()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{ backgroundColor: '#FEA8A1' }}
                    materialI={true}
                    name='language'
                />
              }
            />
              <ListItem
                  title="Destroy your user"
                  rightTitle={'User'}
                  onPress={() => this.destoyUser()}
                  containerStyle={styles.listItemContainer}
                  leftIcon={
                      <Icon
                          containerStyle={{ backgroundColor: '#57DCE7' }}
                          entypo={true}
                          name='remove-user'
                      />
                  }
              />
          </List>
          <InfoText text="More" />
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="About us"
              onPress={() => Actions.about()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{ backgroundColor: '#A4C8F0' }}
                    entypo={true}
                  name={"info"}
                />
              }
            />
            <ListItem
              title="Terms and Policies"
              onPress={() => Actions.terms()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{ backgroundColor: '#C6C7C6' }}
                    entypo={true}
                    name='light-bulb'
                />
              }
            />
            <ListItem
              title="Rate us"
              onPress={() => Actions.rate()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#FECE44',
                  }}
                  entypo={true}
                    name='star'

                />
              }
            />
            <ListItem
              title="Send feedback"
              onPress={() => Actions.feedback()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#00C001',
                  }}
                    name='feedback'
                  materialI={true}
                />
              }
            />
          </List>
        </ScrollView>
        </View>
      )
    }
  }

