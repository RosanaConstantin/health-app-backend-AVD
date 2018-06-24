import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'
import BackgroundJob from "react-native-background-job";
import mock from './components/mock/mock'
import Bluetooth, {read} from './components/BluetoothScanner'
import BluetoothSerial from 'react-native-bluetooth-serial'

const AppComponent = applicationInitialize();
var moment = require('moment');

function disconnectJob() {
    BackgroundJob.cancel({jobKey: 'worker'});
}

function myJob() {
    BluetoothSerial.readFromDevice().then((data) => {
        var date = JSON.parse(data);
        alert(date.detection)
        if(data.latitude !== 0)
            global.locationGPS.latitude = date.latitude;
        else
            global.locationGPS.latitude = 44.435732;
        if(data.longitude !== 0)
            global.locationGPS.longitude = date.longitude;
        else
            global.locationGPS.longitude = 26.047752;

        global.temperature = date.temperature;
        global.pedometru = global.pedometru + date.steps;

        if(date.oxygen !== 0 || date.heartBeat !== 0) {
            global.oxygen = date.oxygen;
            global.heartBeat = date.heartBeat;
            global.time = moment();
        }

        fetch(global.ip + 'api-user-update-steps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify({
                steps: global.pedometru
            })
        })
            .then((response) => response.json())
            .catch((error) => alert(error.message))

        if(date.detection === 1){
            global.alarm = true;
            if(global.user.superviser) {
                if(global.user.superviserPhone){
                    alert('daa')
                    fetch(global.ip + 'api-user-alert', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc'
                        },
                        body: JSON.stringify({
                                phone: global.user.superviserPhone
                            }
                        )
                    })
                        .then((response) => {response.json()})
                        .catch((error) => alert(error))
                }
            }
        }
    });
}

function updateSteps(){
    var start = moment().set({hour:0,minute:0,second:0,millisecond:0});
    var end = moment().set({hour:0,minute:1,second:0,millisecond:0});
    var time = moment();
    if(time > start && time < end ){
        fetch(global.ip + 'api-user-update-steps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify({
                steps: 0
            })
        })
            .then((response) => response.json())
            .catch((error) => alert(error.message))
    }
}

BackgroundJob.register({
    jobKey: "updateSteps",
    job: () => updateSteps
});
BackgroundJob.schedule({
    jobKey: 'updateSteps',
    period: 60000,
    exact: true,
    allowExecutionInForeground: true
});

BackgroundJob.register({
    jobKey: 'worker',
    job: () => {
       // mock.increment();
        if(global.bluetoothConnected){
            if(global.isYourWatch == 0){
                myJob();
         }
        }  else
            if(global.wasConnected)
                disconnectJob();
    }
});
BackgroundJob.schedule({
    jobKey: 'worker',
    period: 10051,
    exact: true,
    allowExecutionInForeground: true
});

AppRegistry.registerHeadlessTask('DataCollector', () => DataCollector);
AppRegistry.registerComponent('HealthApp', () => AppComponent);
