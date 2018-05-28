import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Picker } from 'react-native'
import { Avatar, List, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import Lang from './Lang'
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
})


export default class SettingsPage extends React.Component {

  state = {
    pushNotifications: global.user.notifications
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))

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


    render() {
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
          </View>
          <InfoText text="Account" />
            <ListItem
                title="Profile"
                rightTitle={'Profile'}
                onPress={() => this.changeProfile()}
                containerStyle={styles.listItemContainer}
                leftIcon={
                    <Icon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        icon={{
                            type: 'material',
                            name: 'person',
                        }}
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
                  icon={{
                    type: 'material',
                    name: 'notifications',
                  }}
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
                  icon={{
                    type: 'material',
                    name: 'place',
                  }}
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
                  icon={{
                    type: 'material',
                    name: 'language',
                  }}
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
                  icon={{
                    type: 'ionicon',
                    name: 'md-information-circle',
                  }}
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
                  icon={{
                    type: 'entypo',
                    name: 'light-bulb',
                  }}
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
                  icon={{
                    type: 'entypo',
                    name: 'star',
                  }}
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
                  icon={{
                    type: 'materialicon',
                    name: 'feedback',
                  }}
                />
              }
            />
          </List>
        </ScrollView>
      )
    }
  }

