const COL = 3;

export const IMGWIDTH = 100;
export const IMGHEIGHT = 100;
export const PADDING = 10;

export const getPosition = (position) => {
  'worklet';
  return {
    x: (position % COL ) * (IMGWIDTH + PADDING) + PADDING,
    y: Math.floor(position / COL) * (IMGHEIGHT + PADDING) + PADDING,
  };
};

export const getOrder = (tx, ty, max) => {
  'worklet';
  let col = Math.round(tx / IMGWIDTH);
  col = Math.min(Math.max(col, 0), COL -1);
  let row = Math.round(ty / IMGHEIGHT);
  row = Math.max(row, 0);
  return Math.min(row * COL + col, max);
};
