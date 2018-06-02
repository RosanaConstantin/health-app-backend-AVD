import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
    Text,
  View,
} from 'react-native'

import Email from './Email'
import Tel from './Tel'
import images from './images'
import DatePicker from 'react-native-datepicker'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
    gender: {
      marginBottom:20
    },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
      marginBottom:30,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent'
  },
  placeIcon: {
    color: 'white',
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
      marginLeft:80
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

export default class ProfilePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {date:global.user.birthdate}
    }


  onPressTel = number => {
    Linking.openURL(`tel:${number}`).catch(err => console.log('Error:', err))
  }

  onPressEmail = (email) => {
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
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
              source={ global.user.avatar}
            />
            <Text style={styles.userNameText}>{global.user.firstName + ' ' + global.user.lastName}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <EvilIcons
                  name="location"
                  underlayColor="transparent"
                  size={30}
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {global.user.location}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => {
      return (
          <Tel
              number={global.user.phone}
              onPressTel={this.onPressTel}
          />
      )
  }

  renderEmail = () => {
      return (
          <Email
              email={global.user.email}
              onPressEmail={this.onPressEmail}
          />
      )
  }

  renderGender = () => {
      return (
          <Card style={styles.gender}>
              <TextInput editable={false}> {'Gender: ' + global.user.gender} </TextInput>
          </Card>
      );
  }

  renderBirthday = () => {
      return (
          <Card>
          <DatePicker
              style={{width: 280}}
              date={this.state.date}
              mode="date"
              placeholder="Birthdate"
              maxDate="2016-06-01"
              format="YYYY-MM-DD"
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
          />
          </Card>
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
            {this.renderGender()}
            {this.renderBirthday()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

