import {Auth} from 'aws-amplify';
import {server} from './axios';

export async function getVerification(userSub) {
  const sess = await Auth.currentSession();
  const token = sess.getAccessToken().getJwtToken();
  const headers = {'Authorization': `Bearer ${token}`};
  const rsp = await server.get('/campus_verification', {params: {user_id: userSub}, headers: headers});
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

export function checkEmailFormat(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function hideEmail(email) {
  const [_, domain] = email.split('@');
  return `****@${domain}`;
}