import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Picker } from 'react-native'
import { Avatar, List, ListItem } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from './Icon'
import InfoText from './InfoText'
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
      paddingTop: 50
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
      flex: 1,
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
           pushNotifications: global.user.notifications
        }
    }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !this.state.pushNotifications,
    }))
      fetch(global.ip + 'api-user-update-profile', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
              'X-Parse-Session-Token': global.sessionToken
          },
          body:JSON.stringify({
              profile: {
                  notifications: !this.state.pushNotifications
              }
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
        <ScrollView style={styles.scroll}>
          <View style={styles.userRow}>
            <View style={styles.userImage}>
              <Avatar
                large
                rounded
                source={global.user.avatar}
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
                  <MaterialCommunityIcons
                    name="logout-variant"
                    onPress={() => this.logOut()}
                  />
              </View>
          </View>
          <InfoText text="Account" />
            <ListItem
                title="Change your profile"
                rightTitle={'Profile'}
                onPress={() => this.changeProfile()}
                containerStyle={styles.listItemContainer}
                leftIcon={
                    <Icon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        name='md-person'
                    />
                }
            />
            <ListItem
                title="Change your user credentials"
                rightTitle={'Profile'}
                onPress={() => this.changeUserCredentials()}
                containerStyle={styles.listItemContainer}
                leftIcon={
                    <Icon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        name='md-settings'
                    />
                }
            />

          <List containerStyle={styles.listContainer}>
            <ListItem
              switchButton
              hideChevron
              title="Push Notifications"
              switched={this.state.pushNotifications}
              onSwitch={this.onChangePushNotifications}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#FFADF2',
                  }}
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

                    name='md-locate'
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
                          name='md-settings'
                      />
                  }
              />
          </List>
          <InfoText text="More" />
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="About US"
              onPress={() => Actions.about()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{ backgroundColor: '#A4C8F0' }}

                    name='md-information-circle'
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

                    name='light-bulb'
                />
              }
            />
            <ListItem
              title="Rate Us"
              onPress={() => Actions.rate()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#FECE44',
                  }}

                    name='star'

                />
              }
            />
            <ListItem
              title="Send FeedBack"
              onPress={() => Actions.feedback()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <Icon
                  containerStyle={{
                    backgroundColor: '#00C001',
                  }}
                    name='feedback'
                />
              }
            />
          </List>
        </ScrollView>
      )
    }
  }

