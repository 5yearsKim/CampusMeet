
export const relativeTimePrettify = (dateString, mode='day') => {
  const date = new Date(dateString);
  const now = new Date();
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
  const koreanDate= date.toLocaleDateString('ko-KR');
  return koreanDate.slice(0, 5);
};

const date2Korean = (dateString) => {
  const month = Number(dateString.slice(0, 2));
  const day = Number(dateString.slice(3, 5));
  const format = `${month}월 ${day}일`;
  return format;
};

export const absoluteTimePrettify = (dateString) => {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(dateString);

  const nowDay = now.toLocaleDateString('ko-KR');
  const dateDay = date.toLocaleDateString('ko-KR');
  const yesterdayDay = yesterday.toLocaleDateString('ko-KR');

  const nowTime = now.toLocaleTimeString('kr-KR');
  // console.log(nowDay, dateDay, yesterdayDay)
  // console.log(nowTime);
  if (dateDay == nowDay) {
    return nowTime.slice(0, 5);
  } else if (dateDay == yesterdayDay) {
    return '어제';
  } else {
    return date2Korean(dateDay);
  }
};

export const absoluteTime = (dateString) => {
  const inputDate = new Date(dateString);
  const time = inputDate.toLocaleTimeString('kr-KR');
  const date = inputDate.toLocaleDateString('kr-KR');
  return `${date.slice(0, 5)} ${time.slice(0, 5)}`;
};

export function strTime2Min(strTime) {
  const locale = 'kr-KR';
  const date = new Date(Date.parse(strTime));
  const localTime = date.toLocaleString(locale);
  let hour = parseInt(localTime.slice(11, 13));
  let overnoon = 'am';
  if (hour > 12) {
    hour = hour - 12;
    overnoon = 'pm';
  }
  const min = localTime.slice(14, 16);
  return `${hour}:${min} ${overnoon}`;
}

export function strTime2Date(strTime) {
  const locale = 'kr-KR';
  const date = new Date(Date.parse(strTime));
  const localDate= date.toLocaleDateString(locale);
  return date2Korean(localDate);
}

export function isMinDifferent(strTime1, strTime2) {
  if (strTime1.slice(0, 16) != strTime2.slice(0, 16)) {
    return true;
  }
  return false;
}

export function isDateDifferent(strTime1, strTime2) {
  if (strTime2Date(strTime1) != strTime2Date(strTime2)) {
    return true;
  }
  return false;
}
