import React from 'react';
import {WebView} from 'react-native-webview';
import {Dimensions, StyleSheet} from 'react-native';

export default function EventScreen() {
  return (
    <WebView
      source={{uri: 'https://campusmeet.onioncontent.com/event'}}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    margin: 10,
    padding: 10,
  },
});
