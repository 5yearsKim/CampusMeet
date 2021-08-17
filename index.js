import {registerRootComponent} from 'expo';
import awsconfig from 'src/aws-exports';
import App from './App';
import Amplify from 'aws-amplify';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

async function urlOpener(url, redirectUrl) {
  const {type, url: newUrl} = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl,
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}


const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    // redirectSignIn: 'exp://10.70.171.35:19000/',
    // redirectSignOut: 'exp://10.70.171.35:19000/',
    redirectSignIn: 'campusmeet://',
    redirectSignOut: 'campusmeet://',
  },
};

Amplify.configure(updatedAwsConfig);

registerRootComponent(App);
