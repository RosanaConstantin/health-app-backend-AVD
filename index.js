import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'
import BackgroundJob from "react-native-background-job";
import mock from './components/mock/mock'
import Bluetooth, {read} from './components/BluetoothScanner'
import BluetoothSerial from 'react-native-bluetooth-serial'

const AppComponent = applicationInitialize();

function disconnectJob() {
    alert('nu');
    BackgroundJob.cancel({jobKey: 'worker'});
}

function myJob() {
    BluetoothSerial.readFromDevice().then((data) => {
        alert(JSON.stringify(data));
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
    period: 1000,
    exact: true,
    allowExecutionInForeground: true
});

AppRegistry.registerHeadlessTask('DataCollector', () => DataCollector);
AppRegistry.registerComponent('HealthApp', () => AppComponent);
