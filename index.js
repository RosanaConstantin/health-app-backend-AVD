import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'
import BackgroundJob from "react-native-background-job";
import mock from './components/mock/mock'
import Bluetooth, {read} from './components/BluetoothScanner'
import BluetoothSerial from 'react-native-bluetooth-serial'

const AppComponent = applicationInitialize();
var moment = require('moment');
const isUpdated = false;

function disconnectJob() {
    BackgroundJob.cancel({jobKey: 'worker'});
}

global.isSet = false;
global.goalAchieved = false;
function myJob() {
    BluetoothSerial.readFromDevice().then((data) => {
        if (data[0] === "." && data[data.length-1] === '.') {
            var date = JSON.parse(data.substr(1,data.length-2));
            if (data.latitude !== 0)
                global.locationGPS.latitude = date.latitude;
            else
                global.locationGPS.latitude = 44.435732;
            if (data.longitude !== 0)
                global.locationGPS.longitude = date.longitude;
            else
                global.locationGPS.longitude = 26.047752;

            global.temperature = date.temperature;
            if (date.temperature <= 32.1 || date.temperature >= 40.2) {
                fetch(global.ip + 'api-notification-save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                        'X-Parse-Session-Token': global.sessionToken
                    },
                    body: JSON.stringify({
                        message: "Temperatura a iesit din parametrii normali! Verifica pagina dedicata!"
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        var date = moment(response.createdAt).format('LLL').split(',');

                        global.notifications.unshift({
                            message: "Temperatura a iesit din parametrii normali! Verifica pagina dedicata!",
                            objectId: response.result.objectId,
                            wasRead: false,
                            createdAt: {
                                day: date[0],
                                hour: date[1].replace("2018 ", "")
                            }
                        })
                    })
                    .catch((error) => alert(error.message))
            }

            global.pedometru = global.pedometru + date.steps;
            if (global.pedometru > global.user.steps && !global.goalAchieved) {
                fetch(global.ip + 'api-notification-save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                        'X-Parse-Session-Token': global.sessionToken
                    },
                    body: JSON.stringify({
                        message: "Ti-ai atins telul!!!!! Felicitari!"
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        var date = moment(response.createdAt).format('LLL').split(',');
                        global.goalAchieved = true;
                        global.notifications.unshift({
                            message: "Ti-ai atins telul!!!!! Felicitari!",
                            objectId: response.result.objectId,
                            wasRead: false,
                            createdAt: {
                                day: date[0],
                                hour: date[1].replace("2018 ", "")
                            }
                        })
                    })
                    .catch((error) => alert(error.message))
            }

            if (global.pedometru > 1000 && !global.isSet) {
                fetch(global.ip + 'api-activity-save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                        'X-Parse-Session-Token': global.sessionToken
                    },
                    body: JSON.stringify({
                        message: "Ai facut primii 1000 de pasi!"
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        var date = moment(response.createdAt).format('LLL').split(',');
                        global.isSet = true;
                        global.activities.unshift({
                            message: "Ai facut primii 1000 de pasi!",
                            objectId: response.result.objectId,
                            createdAt: {
                                day: date[0],
                                hour: date[1].replace("2018 ", "")
                            }
                        })
                    })
                    .catch((error) => alert(error.message))
            }

            if (date.oxygen !== 0 || date.heartBeat !== 0) {
                global.oxygen = date.oxygen;
                global.heartBeat = date.heartBeat;
                global.time = moment();

                fetch(global.ip + 'api-activity-save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                        'X-Parse-Session-Token': global.sessionToken
                    },
                    body: JSON.stringify({
                        message: "Ti-ai masurat pulsul si saturatia oxigenului!"
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        var date = moment(response.createdAt).format('LLL').split(',');

                        global.activities.unshift({
                            message: "Ti-ai masurat pulsul si saturatia oxigenului!",
                            objectId: response.result.objectId,
                            createdAt: {
                                day: date[0],
                                hour: date[1].replace("2018 ", "")
                            }
                        })
                    })
                    .catch((error) => alert(error.message))

                if (global.heartBeat < 50) {
                    fetch(global.ip + 'api-notification-save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                            'X-Parse-Session-Token': global.sessionToken
                        },
                        body: JSON.stringify({
                            message: "Pulsul este prea mic!! Viziteaza un medic!"
                        })
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            var date = moment(response.createdAt).format('LLL').split(',');

                            global.notifications.unshift({
                                message: "Pulsul este prea mic!! Viziteaza un medic!",
                                objectId: response.result.objectId,
                                wasRead: response.wasRead,
                                createdAt: {
                                    day: date[0],
                                    hour: date[1].replace("2018 ", "")
                                }
                            })
                        })
                        .catch((error) => alert(error.message))

                } else if (global.heartBeat > 120) {
                    fetch(global.ip + 'api-notification-save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                            'X-Parse-Session-Token': global.sessionToken
                        },
                        body: JSON.stringify({
                            message: "Pulsul este prea mare!! Viziteaza un medic!"
                        })
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            var date = moment(response.createdAt).format('LLL').split(',');

                            global.notifications.unshift({
                                message: "Pulsul este prea mare!! Viziteaza un medic!",
                                objectId: response.result.objectId,
                                wasRead: false,
                                createdAt: {
                                    day: date[0],
                                    hour: date[1].replace("2018 ", "")
                                }
                            })
                        })
                        .catch((error) => alert(error.message))

                }
            }

            fetch(global.ip + 'api-user-update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                    'X-Parse-Session-Token': global.sessionToken
                },
                body: JSON.stringify({
                    profile: {
                        steps: global.pedometru
                    }
                })
            })
                .then((response) => response.json())
                .catch((error) => alert(error.message))

            if (date.detection === 1) {
                global.alarm = true;
                if (global.user.superviser) {
                    if (global.user.superviserPhone && !global.sendSMS) {
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
                            .then((response) => {
                                response.json();
                                fetch(global.ip + 'api-activity-save', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                                        'X-Parse-Session-Token': global.sessionToken
                                    },
                                    body: JSON.stringify({
                                        message: "Ai cazut! Ai grija pe viitor!"
                                    })
                                })
                                    .then((response) => response.json())
                                    .then((response) => {
                                        var date = moment(response.createdAt).format('LLL').split(',');
                                        global.sendSMS = true;
                                        global.activities.unshift({
                                            message: "Ai cazut! Ai grija pe viitor!",
                                            objectId: response.result.objectId,
                                            createdAt: {
                                                day: date[0],
                                                hour: date[1].replace("2018 ", "")
                                            }

                                        })
                                        global.alarm = false;
                                    })
                                    .catch((error) => alert(error.message))
                            })
                            .catch((error) => alert(error))
                    }
                }
            }
       }
    });
}

function updateSteps(){
    if(global.sessionToken) {
        var start = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
        var end = moment().set({hour: 0, minute: 1, second: 30, millisecond: 0});
        var time = moment();
        if (time >= start && time <= end) {
            global.pedometru = 0;
            fetch(global.ip + 'api-user-update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Parse-Application-Id': '216TmAzCS6&W8R8jNkwE#KDy1k3#m9Vc',
                    'X-Parse-Session-Token': global.sessionToken
                },
                body: JSON.stringify({
                    profile: {
                        steps: 1 //ai grija sa il setezi 0, nu 1
                    }
                })
            })
                .then((response) => (response.json()))
                .catch((error) => alert(error.message))
        }
    }
}

BackgroundJob.register({
    jobKey: "updateSteps",
    job: () => {updateSteps();}
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
    period: 1049,
    exact: true,
    allowExecutionInForeground: true
});

//AppRegistry.registerHeadlessTask('DataCollector', () => DataCollector);
AppRegistry.registerComponent('HealthApp', () => AppComponent);
