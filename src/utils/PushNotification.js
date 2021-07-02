import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {bringUser} from './User';

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export async function sendPushNotification(userID, title, body, data) {
  let token;
  try {
    const user = await bringUser(userID);
    token = user.pushToken;
    // console.log(token);
  } catch (err) {
    console.warn(err);
  }
  if (!token) {
    return;
  }
  const message = {
    to: token,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };
  const rsp = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // if (!token) {
    //   token = await Notifications.getExpoPushTokenAsync();
    // }
    // console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
    return null;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const notificationHandler = (chatRoomID, off=false) => {
  Notifications.setNotificationHandler({
    handleNotification: async (noti) => {
      if ( chatRoomID && noti.request.content?.data?.chatRoomID == chatRoomID) {
        return ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: true,
        });
      }
      if (off) {
        return ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        });
      }
      return ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      });
    },
  });
};
