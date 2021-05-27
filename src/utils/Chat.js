import {API, graphqlOperation} from 'aws-amplify';
import {messagesByChatRoom} from 'src/graphql/customQueries';
import {createMessage} from 'src/graphql/customMutations';
import {onCreateMessage} from 'src/graphql/customSubscriptions';
import {updateChatRoom} from 'src/graphql/mutations';

export async function bringMessages(chatRoomID, nextToken, limit=20) {
  const inputData = {
    chatRoomID: chatRoomID,
    limit: limit,
    sortDirection: 'DESC',
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

// message type in [text, gif, image]
export async function makeMessage(userID, chatRoomID, content, type) {
  const newMessage = {
    userID: userID,
    chatRoomID: chatRoomID,
    content: content,
    type: type,
  };
  try {
    const message = await API.graphql(
        graphqlOperation(createMessage, {input: newMessage}),
    );
    return message.data.createMessage;
  } catch (err) {
    console.error(err);
  }
};

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

