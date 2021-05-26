import {Auth} from 'aws-amplify';

export async function handleSignup(username, password, email) {
  const rsp = await Auth.signUp({
    username,
    password,
    attributes: {
      email: email,
      gender: 'unknown',
    },
  });
  return rsp;
}

export async function confirmSignup(username, emailVerification) {
  const rsp = await Auth.confirmSignUp(username, emailVerification);
  return rsp;
}

export async function login(auth, username, password) {
  const rsp = await Auth.signIn(username, password);
  // order important
  auth.setUser(rsp);
  auth.setIsAuthenticated(true);
  return rsp;
}

export async function logout(auth) {
  const rsp = await Auth.signOut();
  // order important
  await auth.setIsAuthenticated(false);
  // auth.setUser({});
};


export async function forgotPassword(username) {
  const rsp = await Auth.forgotPassword(username);
  return rsp;
};

export async function forgotPasswordSubmit(username, code, newPassword) {
  const rsp = await Auth.forgotPasswordSubmit(username, code, newPassword);
  return rsp;
}

