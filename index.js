import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'
import BackgroundJob from "react-native-background-job";
import mock from './components/mock/mock'
import Bluetooth, {read} from './components/BluetoothScanner'
import BluetoothSerial from 'react-native-bluetooth-serial'

const AppComponent = applicationInitialize();

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
        global.steps = global.steps + date.steps;
        global.oxygen =  date.oxygen;
        global.heartBeat = date.heartBeat;
        fetch(global.ip + 'api-user-update-steps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                'X-Parse-Session-Token': global.sessionToken
            },
            body: JSON.stringify({
                steps: global.steps
            })
        })
            .then((response) => response.json())
            .catch((error) => alert(error.message))

        if(date.detection === 1){
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
