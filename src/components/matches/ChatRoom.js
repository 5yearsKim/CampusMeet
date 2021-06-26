import React, {useState, useEffect, Fragment} from 'react';
import {FlatList} from 'react-native';
import Message from './Message';
import {bringMessages} from 'src/utils/Chat';
import {isDateDifferent, isMinDifferent} from 'src/utils/Time';

import {API, graphqlOperation} from 'aws-amplify';
import {onCreateMessage} from 'src/graphql/subscriptions';
import {notificationHandler} from 'src/utils/PushNotification';

function ChatRoom({navigation, route}) {
  const {chatRoomID, name} = route.params;
  const [messageList, setMessageList] = useState([]);
  const [nextToken, setNextToken] = useState('');

  const onEndReached = async () => {
    if (nextToken == null) {
      return;
    }
    const [messageData, token] = await bringMessages(chatRoomID, nextToken);
    setMessageList([...messageList, ...messageData]);
    setNextToken(token);
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
    const subscription = API.graphql(
        graphqlOperation(onCreateMessage, {
          chatRoomID: chatRoomID,
        }),
    ).subscribe({
      next: ({value}) => {
        const message = value.data.onCreateMessage;
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
      return <Message item={item} showTime={true} showDate={true}/>;
    }
    const isDateDiff = isDateDifferent(item.createdAt, messageList[index + 1].createdAt);
    if (index == 0) {
      return <Message item={item} showTime={true} showDate={isDateDiff}/>;
    }
    const isMinDiff = isMinDifferent(item.createdAt, messageList[index - 1].createdAt);
    return <Message item={item} showTime={isMinDiff} showDate={isDateDiff} navigation={navigation}/>;
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
