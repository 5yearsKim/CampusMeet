export function isNumeric(num) {
  if (typeof num == 'number') {
    return true;
  }
  if (typeof num == 'string') {
    return !isNaN(num) && !isNaN(parseFloat(num));
  }
  return false;
}
