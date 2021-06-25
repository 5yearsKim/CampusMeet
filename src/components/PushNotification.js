import React, {useContext, useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from 'src/utils/PushNotification';
import {modifyUser} from 'src/utils/User';
import {MyContext} from 'src/context';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

export default function PushNotification() {
  const auth = useContext(MyContext);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
      // console.log('noti  ', notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const noti = response.notification.request.content;
      if (noti.data.type == 'message') {
        console.log('message')

      } else if (noti.data.type == 'signal') {
        console.log('signal')
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const tokenSetting = async () => {
      const token = await registerForPushNotificationsAsync();
      // console.log(token);
      if (token) {
        try {
          modifyUser(auth.user.attributes.sub, {pushToken: token});
        } catch (err) {
          console.warn(err);
        }
      }
    };
    tokenSetting();
  }, []);



  return (
    <View>
    </View>
  );
}