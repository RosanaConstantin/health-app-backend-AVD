import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, Keyboard } from 'react-native';
// import { Constants } from 'expo';
import {Actions, Scene, Router} from 'react-native-router-flux';

import FormInsideJoin from './components/FormJoin';
import FormInsideSign from './components/FormSign';
import Dashboard from './components/Dashboard';
import InitialPage from './components/InitialPage';
import IntroPage from './components/IntroPage';
import AboutUs from './components/AboutUs'
import TermsPolicies from './components/TermsPolicies'
import Rate from './components/Rate'
import FeedBack from './components/FeedBack'
import Change from './components/Change'
import ChangeUserCredentials from './components/ChangeUserCredentials'
import SleepPage from './components/SleepPage'
import StepsPage from './components/StepsPage'
import HeartRatePage from './components/HeartRatePage'
import FallPage from './components/FallPage'
import TemperaturePage from './components/TemperaturePage'
import SettingsPage from './components/SettingsPage'
import LocationPage from './components/LocationPage'
import environment from "./environment";
import BluetoothScanner from './components/BluetoothScanner'
import BackgroundJob from 'react-native-background-job';

function applicationInitialize() {
    class AppComponent extends React.Component {
        constructor() {
            super();
            global.ip = environment.serverUrl + 'functions/';
        }

        componentDidMount() {
            Keyboard.dismiss();
            Actions.intro();
        }

        render() {
            return <Router navigationBarStyle={{display: 'none'}}>
        <Scene key="root">
            <Scene key="joinIn" component={FormInsideJoin}/>
            <Scene key="dashboard" component={Dashboard}/>
            <Scene key="signIn" component={FormInsideSign}/>
            <Scene key="home" component={InitialPage}/>
            <Scene key="intro" component={IntroPage}/>
            <Scene key="rate" component={Rate}/>
            <Scene key="about" component={AboutUs}/>
            <Scene key="terms" component={TermsPolicies}/>
            <Scene key="feedback" component={FeedBack}/>
            <Scene key="change" component={Change}/>
            <Scene key="credentialsChange" component={ChangeUserCredentials}/>
            <Scene key="settings" component={SettingsPage}/>
            <Scene key="sleep" component={SleepPage}/>
            <Scene key="steps" component={StepsPage}/>
            <Scene key="heartRate" component={HeartRatePage}/>
            <Scene key="fall" component={FallPage}/>
            <Scene key="temperature" component={TemperaturePage}/>
            <Scene key="location" component={LocationPage}/>
            <Scene key="scanner" component={BluetoothScanner}/>

            </Scene>
            </Router>
        }
    }
    return AppComponent;
}

export default applicationInitialize;