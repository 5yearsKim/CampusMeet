import React, {useContext, useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync, handleNotification} from 'src/utils/PushNotification';
import {MyContext, BadgeContext} from 'src/context';
import {modifyUser} from 'src/utils/User';
import {bringMatch} from 'src/utils/Match';
import {bringReceivedSignal} from 'src/utils/Signal';

export default function StartSetting({navigation, user}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {setMatchBadge, setSignalBadge} = useContext(BadgeContext);
  const {pushNoti} = useContext(MyContext);
  // const notificationListener = useRef();
  const responseListener = useRef();

  const [token, setToken] = useState();

  // match badge Setting
  useEffect(() => {
    const settingMatchBadge = async () => {
      try {
        const userList = await bringMatch(userSub);
        let newMatch = false;
        const newList = userList.filter((item) => {
          if (!item.checked) {
            newMatch = true;
          }
          const lastMsg = item.chatRoom.lastMessage;
          const isNew = (lastMsg.userID != userSub) && lastMsg.type != 'admin' && !lastMsg.checked;
          return isNew;
        });
        setMatchBadge(newMatch ? 'new' : newList.length);
      } catch (err) {
        console.warn(err);
      }
    };
    settingMatchBadge();
  }, []);

  // signal badge Setting
  useEffect(() => {
    const settingSignalBadge = async () => {
      try {
        const userList = await bringReceivedSignal(userSub);
        const newList = userList.filter((item) => !item.checked);
        setSignalBadge(newList.length);
      } catch (err) {
        console.warn(err);
      }
    };
    settingSignalBadge();
  }, []);


  useEffect(() => {
    if (!user) {
      return;
    }
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
  }, [user]);

  useEffect(() => {
    const tokenSetting = async () => {
      if (!user) {
        return;
      }
      const token = await registerForPushNotificationsAsync();
      setToken(token);
      if (token) {
        try {
          modifyUser(auth.user.attributes.sub, {pushToken: token});
        } catch (err) {
          console.warn(err);
        }
      }
    };
    tokenSetting();
  }, [user]);

  useEffect(() => {
    if (user && pushNoti) {
      handleNotification(true);
    }
    if (!pushNoti) {
      handleNotification(false);
    }
  }, [user]);

  return (
    <View>
      {/* <Text>
        {String(token)}
      </Text> */}
    </View>
  );
}
