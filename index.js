import { AppRegistry } from 'react-native';
import applicationInitialize from './App';

const AppComponent = applicationInitialize();

AppRegistry.registerComponent('HealthApp', () => AppComponent);
