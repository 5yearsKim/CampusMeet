import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const COL = 3;

export const PADDING = 10;
export const IMGWIDTH = Math.floor((width - 40 - PADDING)/COL - PADDING );
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
