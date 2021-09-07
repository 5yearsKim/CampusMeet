import React from 'react';
import {WebView} from 'react-native-webview';

export default function EventScreen() {
  return (
    <WebView
      source={{uri: 'https://campusmeet.onioncontent.com/event'}}
      style={{padding: 10}}
    />
  );
}
