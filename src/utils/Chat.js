import {API, graphqlOperation} from 'aws-amplify';
import {messagesByChatRoom} from 'src/graphql/customQueries';
import {createMessage} from 'src/graphql/mutations';
import {onCreateMessage} from 'src/graphql/customSubscriptions';
import {updateChatRoom, updateMessage} from 'src/graphql/mutations';

export async function bringMessages(chatRoomID, nextToken, limit=20) {
  const inputData = {
    chatRoomID: chatRoomID,
    limit: limit,
    sortDirection: 'DESC',
    filter: {type: {ne: 'check'}},
  };
  if (nextToken) {
    inputData.nextToken = nextToken;
  }
  try {
    const messagesData = await API.graphql(
        graphqlOperation(
            messagesByChatRoom, inputData,
        ),
    );
    return [messagesData.data.messagesByChatRoom.items, messagesData.data.messagesByChatRoom.nextToken];
  } catch (err) {
    console.error(err);
    return {
      data: null,
      nextToken: null,
    };
  }
};

// message type in [text, gif, image, admin, check]
export async function makeMessage(userID, chatRoomID, content, type) {
  const newMessage = {
    userID: userID,
    chatRoomID: chatRoomID,
    content: content,
    type: type,
    checked: false,
  };
  const rsp = await API.graphql(
      graphqlOperation(createMessage, {input: newMessage}),
  );
  if (type != 'check') {
    const message = rsp.data.createMessage;
    const data = {lastMessageID: message.id};
    await modifyChatRoom(chatRoomID, data);
    return message;
  }
};

export async function modifyMessage(messageID, messageData) {
  messageData.id = messageID;
  await API.graphql(
      graphqlOperation(updateMessage, {input: messageData}),
  );
}

export async function checkMessage(messageID) {
  const data = {checked: true};
  await modifyMessage(messageID, data);
}

export async function modifyChatRoom(chatRoomID, chatData) {
  chatData.id = chatRoomID;
  API.graphql(
      graphqlOperation(updateChatRoom, {input: chatData}),
  );
}


// async function onMakeMessage(chatRoomID, callback) {
//   const subscription = await API.graphql(
//       graphqlOperation(onCreateMessage, {
//         chatRoomID: chatRoomID,
//       }),
//   ).subscribe({
//     next: (data) => {
//       callback(data);
//     },
//   });
//   return subscription;
// }

