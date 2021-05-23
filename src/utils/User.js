import {API, graphqlOperation} from 'aws-amplify';
import {createUser, updateUser} from 'src/graphql/mutations';
import {getUser} from 'src/graphql/queries';
import {listCandidateUsers} from 'src/graphql/customQueries';

export async function makeUser(userSub, gender, name, campus, graduate, year, department, division) {
  const newUser = {
    id: userSub,
    gender: gender,
    name: name,
    campus: campus,
    graduate: graduate,
    year: year,
    department: department,
    division: division,
    imageKeys: [],
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
}

export async function modifyUser(userSub, newUser) {
  newUser.id = userSub;
  try {
    API.graphql(
        graphqlOperation(updateUser, {input: newUser}),
    );
  } catch (err) {
    console.log(err);
  }
}

export async function bringCandidate() {
  const userData = await API.graphql(
      graphqlOperation(listCandidateUsers),
  );
  return userData.data.listUsers.items;
}

