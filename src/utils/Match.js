import {API, graphqlOperation} from 'aws-amplify';
import {createChatRoom, createMatch, updateMatch} from 'src/graphql/mutations';
import {matchByFrom, matchByChatRoom} from 'src/graphql/customQueries';
// import {listMatchs} from 'src/graphql/queries';
import {makeMessage} from './Chat';

export async function bringMatch(fromID) {
  const matchData = await API.graphql(
      graphqlOperation(
          matchByFrom, {
            fromID: fromID,
            filter: {
              deleted: {
                eq: false,
              },
            },
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
            filter: {
              deleted: {
                eq: false,
              },
            },
          },
      ),
  );
  return matchData.data.matchByChatRoom.items;
}


export async function makeMatch(fromID, toID) {
  const myMatch = await API.graphql(
      graphqlOperation(
          matchByFrom, {
            fromID: fromID,
            filter: {toID: {eq: toID}},
          },
      ),
  );
  const items = myMatch.data.matchByFrom.items;
  if (items.length > 0) {
    await wakeupMatch(items[0], fromID, toID);
  } else {
    await makeNewMatch(fromID, toID);
  }
  // await makeNewMatch(fromID, toID);
}

export async function wakeupMatch(match, fromID, toID) {
  makeMessage(fromID, match.chatRoomID, 'Match Again!', 'admin');
  // if my match is deleted
  if (match.deleted) {
    modifyMatch(match.id, {deleted: false});
  }
  // if your match is deleted
  const yourMatch = await API.graphql(
      graphqlOperation(
          matchByFrom, {
            fromID: toID,
            filter: {toID: {eq: fromID}},
          },
      ),
  );
  const items = yourMatch.data.matchByFrom.items;
  if (items.length > 0 && items[0].deleted) {
    modifyMatch(items[0].id, {deleted: false});
  }
}

export async function makeNewMatch(fromID, toID) {
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
    console.warn('Failed to create a chat room');
    return;
  }

  const newChatRoom = newChatRoomData.data.createChatRoom;
  makeMessage(fromID, newChatRoom.id, 'New Match!', 'admin');

  // 2. Add match to the Chat Room
  const myMatch = await API.graphql(
      graphqlOperation(createMatch, {
        input: {
          fromID: fromID,
          toID: toID,
          chatRoomID: newChatRoom.id,
          deleted: false,
          checked: false,
        },
      }),
  );
  const yourMatch = await API.graphql(
      graphqlOperation(createMatch, {
        input: {
          fromID: toID,
          toID: fromID,
          chatRoomID: newChatRoom.id,
          deleted: false,
          checked: false,
        },
      }),
  );
  // console.log(myMatch, yourMatch);
};

export async function modifyMatch(matchID, matchData) {
  matchData.id = matchID;
  await API.graphql(
      graphqlOperation(updateMatch, {input: matchData}),
  );
}
