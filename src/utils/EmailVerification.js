import {Auth} from 'aws-amplify';
import {server} from './axios';

export async function getVerification() {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.get('/campus_verification', {headers: headers});
  return rsp.data;
}

export async function createVerification(email) {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.post('/campus_verification', {email: email}, {headers: headers});
  return rsp.data;
}

export async function confirmVerification(code) {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.put('/campus_verification', {code: code}, {headers: headers});
  return rsp.data;
}