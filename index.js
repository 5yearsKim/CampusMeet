import {registerRootComponent} from 'expo';
import awsconfig from 'src/aws-exports';
import App from './App';
import Amplify from 'aws-amplify';

Amplify.configure(awsconfig);

registerRootComponent(App);
