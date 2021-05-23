import React from 'react';
import {View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import ReceivedSignal from 'src/components/candidates/ReceivedSignal';
import SentSignal from 'src/components/candidates/SentSignal';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const SignalTab = createMaterialTopTabNavigator();

function ReceivedSignalScreen(props) {
  return (
    <ReceivedSignal {...props}/>
  );
}

function SentSignalScreen(props) {
  return (
    <SentSignal {...props}/>
  );
}

function SignalScreen(props) {
  return (
    <SignalTab.Navigator
      initialRouteName="ReceivedSignal"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        tabStyle: {flexDirection: 'row'},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          const icons = {
            ReceivedSignal: 'email-outline',
            SentSignal: 'send',
          };
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={22}
            />
          );
        },
      })}
    >
      <SignalTab.Screen
        name="ReceivedSignal"
        options={{
          title: 'Received',
        }}
      >
        {(tabProps) => <ReceivedSignalScreen {...tabProps} parentNavigation={props.navigation}/>}
      </SignalTab.Screen>
      <SignalTab.Screen
        name="SentSignal"
        options={{
          title: 'Sent',
        }}
      >
        {(tabProps) => <SentSignalScreen {...tabProps} parentNavigation={props.navigation}/>}
      </SignalTab.Screen>
    </SignalTab.Navigator>
  );
}

export default SignalScreen;
