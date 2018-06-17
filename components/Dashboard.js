import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert,Keyboard } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom'
import NotificationPage from './NotificationPage'
import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import ActivityPage from './ActivityPage'
import SettingsPage from './SettingsPage'

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
    
    }
   
  }

  componentDidMount() {
     Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === "ProfileScreen" && <ProfilePage/>}
        {this.state.page === "NotificationScreen" && <NotificationPage/>}
        {this.state.page === "HomeScreen" && <HomePage/>}
        {this.state.page === "ActivityScreen" && <ActivityPage/>}
        {this.state.page === "SettingsScreen" && <SettingsPage/>}

        <Tabbar
          stateFunc={(tab) => {
            this.setState({page: tab.page})
            
          }}
          activePage={this.state.page}
        
          type={"ripple"}
          tabbarBgColor={"#292D36"}
          iconColor={"#ffffff"}
          tabs={[
            {
              page: "ProfileScreen",
              icon: "person",
              iconText: "Profil"
            },
            {
              page: "NotificationScreen",
              icon: "notifications",
                badgeNumber: global.user.notifications ? global.badge : 0,
              iconText: "Notificări"
            },
             
            {
              page: "HomeScreen",
              icon: "home",
              iconText: "Acasă"
            },
            {
              page: "ActivityScreen",
              icon: "pulse",
              iconText: "Activități"
            },
            {
              page: "SettingsScreen",
              icon: "md-settings",
              iconText: "Setări"
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});