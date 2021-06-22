import React from 'react';
import {View, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import Register from 'src/components/auth/Register';
import {LinearGradient} from 'expo-linear-gradient';
import config from 'src/config';


const colors = config.colors;
const {width, height} = Dimensions.get('window');

function RegisterScreen(props) {
  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        // colors={[colors.main.primary, colors.main.primary_]}
        colors={[colors.main.primary, 'transparent']}
        style={styles.background}
      />
      <View style={styles.mainBox}>
        <Register {...props}/>
      </View>
    </KeyboardAvoidingView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBox: {
    width: width * 0.8,
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default RegisterScreen;
