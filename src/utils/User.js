import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createUser, updateUser, createPreference, updatePreference} from 'src/graphql/mutations';
import {getUser, getPreference} from 'src/graphql/queries';
import {server} from './axios';

export async function makeUser(userSub, gender, name, campus, graduate, year, department, division, imageKeys, profileMessage, profileDescription) {
  const newUser = {
    id: userSub,
    gender: gender,
    name: name,
    campus: campus,
    graduate: graduate,
    year: year,
    department: department,
    division: division,
    imageKeys: imageKeys,
    profileMessage: profileMessage,
    profileDescription: profileDescription,
    status: 'active',
  };
  const rsp = await API.graphql(
      graphqlOperation(createUser, {input: newUser}),
  );
  return rsp;
};

export async function bringUser(userSub) {
  const userData = await API.graphql(
      graphqlOperation(getUser, {id: userSub}),
  );
  return userData['data']['getUser'];
};

export async function modifyUser(userSub, newUser) {
  newUser.id = userSub;
  API.graphql(
      graphqlOperation(updateUser, {input: newUser}),
  );
};

export async function bringPreference(userSub) {
  const rsp = await API.graphql(
      graphqlOperation(getPreference, {id: userSub}),
  );
  return rsp.data.getPreference;
};

export async function makePreference(userID, likeGender, likeGraduate, likeCampus, likeDepartment) {
  const newPreference = {
    id: userID,
    likeGender: likeGender,
    likeGraduate: likeGraduate,
    likeCampus: likeCampus,
    likeDepartment: likeDepartment,
  };
  const rsp = await API.graphql(
      graphqlOperation(createPreference, {input: newPreference}),
  );
  return rsp;
};

export async function modifyPreference(userID, newPreference) {
  newPreference.id = userID;
  API.graphql(
      graphqlOperation(updatePreference, {input: newPreference}),
  );
}

export async function bringCandidate() {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.get('/list_candidate', {headers: headers});
  return rsp.data;
}

export async function setupIndividual() {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.post('/setup_individual', {}, {headers: headers});
  return rsp.data;
}

export async function checkCandidate() {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.post('/check_candidate', {}, {headers: headers});
  return rsp.data;
}
