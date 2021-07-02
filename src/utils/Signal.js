import {API, graphqlOperation} from 'aws-amplify';
import {createSignal, updateSignal, deleteSignal} from 'src/graphql/customMutations';
import {signalByFrom, signalByFromToday, signalByTo} from 'src/graphql/customQueries';

export async function makeSignal(fromID, toID, message) {
  const newSignal = {
    fromID: fromID,
    toID: toID,
    message: message,
    alive: true,
    checked: false,
  };
  const signal = await API.graphql(
      graphqlOperation(createSignal, {input: newSignal}),
  );
  return signal;
}

export async function bringReceivedSignal(toID) {
  const userData = await API.graphql(
      graphqlOperation(
          signalByTo, {
            toID: toID,
            filter: {
              alive: {eq: true},
            },
          },
      ),
  );
  return userData.data.signalByTo.items;
}

export async function bringSentSignal(fromID) {
  const userData = await API.graphql(
      graphqlOperation(
          signalByFrom, {
            fromID: fromID,
            sortDirection: 'DESC',
          },
      ),
  );
  return userData.data.signalByFrom.items;
}

export const removeSignal = async (signalID) => {
  const targetSignal = {
    id: signalID,
  };
  const rsp = await API.graphql(
      graphqlOperation(deleteSignal, {input: targetSignal}),
  );
  return rsp;
};

export const modifySignal = async (signalID, signalData) => {
  signalData.id = signalID;
  await API.graphql(
      graphqlOperation(updateSignal, {input: signalData}),
  );
};

export const rejectSignal = async (signalID) => {
  await modifySignal(signalID, {alive: false});
};

export const checkSignal = async (signalID) => {
  await modifySignal(signalID, {checked: true});
};

export async function bringSentSignalToday(fromID) {
  const userData = await API.graphql({
    query: signalByFromToday,
    variables: {
      fromID: fromID,
    },
  });
  const userList = userData.data.signalByFrom.items;
  const midnight = new Date().setHours(0, 0, 0, 0);
  return userList.filter((item) => new Date(item.createdAt) > new Date(midnight));
}
