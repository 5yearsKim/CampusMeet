import {Dimensions} from 'react-native';
import {Storage} from 'aws-amplify';

let {width, height} = Dimensions.get('window');


const COL = 3;

export const CONTAINERPADDING = 20;
width = width - CONTAINERPADDING * 2;
export const PADDING = 10;
export const IMGWIDTH = Math.floor((width - PADDING)/COL - PADDING );
export const IMGHEIGHT = IMGWIDTH;

export const getPosition = (position) => {
  'worklet';
  return {
    x: (position % COL ) * (IMGWIDTH + PADDING) + PADDING,
    y: Math.floor(position / COL) * (IMGHEIGHT + PADDING) + PADDING,
  };
};

export const getOrder = (tx, ty, max) => {
  'worklet';
  let col = Math.round((tx - PADDING) / (IMGWIDTH + PADDING));
  col = Math.min(Math.max(col, 0), COL -1);
  let row = Math.round((ty - PADDING) / (IMGHEIGHT + PADDING));
  row = Math.max(row, 0);
  return Math.min(row * COL + col, max);
};

export const checkLocalImage = (uri) => {
  return uri.startsWith('file:/');
};

export const imageToS3 = async (uri, s3path) => {
  s3path = s3path.replace(/^\/|\/$/g, ''); // trim slash
  const rsp = await fetch(uri);
  const blob = await rsp.blob();
  const myKey = uri.split('/').pop();
  const awsrsp = await Storage.put(`${s3path}/${myKey}`, blob);
  return awsrsp.key;
};

export const imageListToS3 = async (imgList, s3path) => {
  for (let i = 0; i < imgList.length; i++ ) {
    const img = imgList[i];
    if (checkLocalImage(img)) {
      const key = await imageToS3(imgList[i], s3path);
      imgList[i] = key;
    }
  }
  return imgList;
};
