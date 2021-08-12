import {Auth} from 'aws-amplify';
import {server} from './axios';

export async function report(objectID, userID, type, message) {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const data = {object_id: objectID, user_id: userID, type: type};
  if (message) {
    data.message = message;
  }
  const rsp = await server.post('/report', data, {headers: headers});
  return rsp.data;
};
