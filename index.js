import { AppRegistry } from 'react-native';
import applicationInitialize from './App';
import DataCollector from './DataCollector'

const AppComponent = applicationInitialize();

AppRegistry.registerHeadlessTask('DataCollector', () => DataCollector);
AppRegistry.registerComponent('HealthApp', () => AppComponent);
