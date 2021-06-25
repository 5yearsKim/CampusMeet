import {API, graphqlOperation} from 'aws-amplify';
import {createChatRoom, createMatch} from 'src/graphql/customMutations';
import {matchByFrom, matchByChatRoom} from 'src/graphql/customQueries';

export async function bringMatch(fromID) {
  const matchData = await API.graphql(
      graphqlOperation(
          matchByFrom, {
            fromID: fromID,
          },
      ),
  );
  return matchData.data.matchByFrom.items;
}

export async function bringMatchByChatRoom(chatRoomID) {
  const matchData = await API.graphql(
      graphqlOperation(
          matchByChatRoom, {
            chatRoomID: chatRoomID,
          },
      ),
  );
  return matchData.data.matchByChatRoom.items;
}

export async function makeMatch(fromID, toID) {
  try {
    //  1. Create a new Chat Room
    const newChatRoomData = await API.graphql(
        graphqlOperation(
            createChatRoom, {
              input: {
                lastMessageID: 'start',
              },
            },
        ),
    );
    if (!newChatRoomData.data) {
      console.log('Failed to create a chat room');
      return;
    }

    const newChatRoom = newChatRoomData.data.createChatRoom;

    // 2. Add match to the Chat Room
    const myMatch = await API.graphql(
        graphqlOperation(createMatch, {
          input: {
            fromID: fromID,
            toID: toID,
            chatRoomID: newChatRoom.id,
          },
        }),
    );
    const yourMatch = await API.graphql(
        graphqlOperation(createMatch, {
          input: {
            fromID: toID,
            toID: fromID,
            chatRoomID: newChatRoom.id,
          },
        }),
    );
    console.log(myMatch, yourMatch);
  } catch (err) {
    console.log(err);
  }
};
