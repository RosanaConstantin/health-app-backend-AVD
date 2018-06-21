import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'
import BackgroundJob from "react-native-background-job";
import mock from './components/mock/mock'

const AppComponent = applicationInitialize();

BackgroundJob.register({
    jobKey: 'worker',
    job: () => {
        mock.increment();
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
