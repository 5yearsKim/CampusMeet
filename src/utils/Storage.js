import {Storage} from 'aws-amplify';

const key2uri = (key) => {
  // console.log(key);
  return new Promise((resolve, reject) => {
    try {
      const rsp = Storage.get(key);
      resolve(rsp);
    } catch (err) {
      reject(err);
    }
  });
};

export {key2uri};
