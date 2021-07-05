import React, {useState, useEffect, useContext, Fragment} from 'react';
import {FlatList} from 'react-native';
import Message from './Message';
import {bringMessages, checkMessage} from 'src/utils/Chat';
import {isDateDifferent, isMinDifferent} from 'src/utils/Time';

import {API, graphqlOperation} from 'aws-amplify';
import {MyContext, UserContext} from 'src/context';
import {onCreateMessage} from 'src/graphql/subscriptions';
import {notificationHandler} from 'src/utils/PushNotification';

function ChatRoom({navigation, route}) {
  const auth = useContext(MyContext);
  const {refreshMatch, setRefreshMatch} = useContext(UserContext);
  const userSub = auth.user.attributes.sub;
  const {chatRoomID, name} = route.params;
  const [messageList, setMessageList] = useState([]);
  const [nextToken, setNextToken] = useState('');

  const [myCkp, setMyCkp] = useState([]);
  const [yourCkp, setYourCkp] = useState([]);

  useEffect(() => {
    return () => setRefreshMatch(!refreshMatch);
  }, []);

  const onEndReached = async () => {
    if (nextToken == null) {
      return;
    }
    const [messageData, token] = await bringMessages(chatRoomID, nextToken);
    setMessageList([...messageList, ...messageData]);
    setNextToken(token);
  };

  const findCkp = () => {
    let mine;
    let yours;
    for (let i = 0; i < messageList.length; i++) {
      const msg = messageList[i];
      if (msg.type == 'admin') {

      } else if (!mine && msg.checked && msg.userID == userSub) { // my message
        mine = msg.id;
      } else if (!yours && !msg.checked && msg.userID != userSub) { // your message, unchecked
        yours = msg.id;
        checkMessage(msg.id);
      } else if (!yours && msg.checked && msg.userID != userSub) { // your message, checked
        yours = msg.id;
      }
      if (mine && yours) {
        break;
      }
    }
    setMyCkp(mine);
    setYourCkp(yours);
  };

  const m_bringMessages = async () => {
    const [messageData, token] = await bringMessages(chatRoomID);
    setMessageList(messageData);
    setNextToken(token);
  };

  useEffect(() => {
    notificationHandler(chatRoomID);
    return () => notificationHandler();
  }, []);

  useEffect(() => {
    m_bringMessages();
  }, []);

  useEffect(() => {
    findCkp();
  }, [messageList]);

  useEffect(() => {
    const subscription = API.graphql(
        graphqlOperation(onCreateMessage, {
          chatRoomID: chatRoomID,
        }),
    ).subscribe({
      next: ({value}) => {
        // const message = value.data.onCreateMessage;
        // console.log(message);
        m_bringMessages();
      },
      error: (err) => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  const renderMessage = ({item, index}) => {
    if (index >= messageList.length -1) {
      return <Message item={item} showTime={true} showDate={true} myCkp={myCkp} yourCkp={yourCkp}/>;
    }
    const showDate = isDateDifferent(item.createdAt, messageList[index + 1].createdAt);
    if (index == 0) {
      return <Message item={item} showTime={true} showDate={showDate} myCkp={myCkp} yourCkp={yourCkp}/>;
    }

    const showTime = isMinDifferent(item.createdAt, messageList[index - 1].createdAt) || (item.userID != messageList[index - 1].userID);

    return <Message item={item} showTime={showTime} showDate={showDate} myCkp={myCkp} yourCkp={yourCkp} navigation={navigation}/>;
  };
  return (
    <Fragment>
      <FlatList
        data={messageList}
        renderItem={({item, index}) => {
          return renderMessage({item, index});
        }}
        keyExtractor={(item) => item.id}
        inverted
        onEndReached={() => onEndReached()}
      />
    </Fragment>
  );
}

export default ChatRoom;
