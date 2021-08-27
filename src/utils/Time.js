const twoDigit = (number) => {
  return ('0' + number).slice(-2);
};

export const date2local = (date) => {
  // return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  return new Date(date.getTime());
};

export const relativeTimePrettify = (dateString, mode='day') => {
  const date = date2local(new Date(dateString));
  const now = date2local(new Date());
  const abssec = (now - date) / (1000);
  if (abssec < 59) {
    return '방금 전';
  }
  const absmin = abssec / 60;
  if (absmin < 59) {
    return `${absmin.toFixed(0)}분 전`;
  }
  const abshour = absmin / 60;
  if (abshour < 23) {
    return `${abshour.toFixed(0)}시간 전`;
  }
  if (abshour < 47) {
    return '어제';
  }
  if (mode == 'week') {
    const absday = abshour / 24;
    if (absday <= 7) {
      return `${absday.toFixed(0)}일 전`;
    }
  }
  const month = date.getMonth() + 1;
  const day = twoDigit(date.getDate());
  return `${month}/${day}`;
};


export const absoluteTime = (dateString) => {
  const date = date2local(new Date(dateString));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = twoDigit(date.getDate());
  const hour = date.getHours();
  const minute = twoDigit(date.getMinutes());
  return `${month}/${day} ${hour}:${minute}`;
};

export function strTime2Min(strTime) {
  const date = date2local(new Date(strTime));

  let hour = date.getHours();
  let overnoon = 'am';
  if (hour > 12) {
    hour = hour - 12;
    overnoon = 'pm';
  }
  const min = twoDigit(date.getMinutes());
  return `${hour}:${min} ${overnoon}`;
}

export function strTime2Date(strTime) {
  const date = date2local(new Date(strTime));
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}

export function isMinDifferent(strTime1, strTime2) {
  const date1 = date2local(new Date(strTime1));
  const date2 = date2local(new Date(strTime2));
  if (date1.getMinutes() != date2.getMinutes()) {
    return true;
  }
  return false;
}

export function isDateDifferent(strTime1, strTime2) {
  const date1 = date2local(new Date(strTime1));
  const date2 = date2local(new Date(strTime2));
  if ((date1.getDate() != date2.getDate()) || (date1.getMonth() != date2.getMonth())) {
    return true;
  }
  return false;
}
