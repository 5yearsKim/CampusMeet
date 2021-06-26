import React, {useContext, useRef, useEffect} from 'react';
import {View} from 'react-native';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync, notificationHandler} from 'src/utils/PushNotification';
import {modifyUser} from 'src/utils/User';
import {MyContext} from 'src/context';

export default function PushNotification({navigation}) {
  const auth = useContext(MyContext);
  // const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   setNotification(notification);
    // });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const noti = response.notification.request.content;
      if (noti.data.type == 'message') {
        navigation.push('ChatRoom', {
          chatRoomID: noti.data.chatRoomID,
          name: noti.data.name,
        });
      } else if (noti.data.type == 'signal') {
        navigation.navigate('Signal');
      }
    });

    return () => {
      // Notifications.removeNotificationSubscription(notificationListener.current);
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

  useEffect(() => {
    notificationHandler();
  }, []);

  return (
    <View>
    </View>
  );
}
