const campusList = [
  {
    name: '서일대학교',
    short: '서일',
    logo: 'campusLogos/ㅅ/서일대학교.jpg',
  },
  {
    name: '숭의여자대학교',
    short: '숭의',
    logo: 'campusLogos/ㅅ/숭의여자대학교.jpg',
  },
  {
    name: '세종사이버대학교',
    short: '세종',
    logo: 'campusLogos/ㅅ/세종사이버대학교.jpg',
  },
  {
    name: '서정대학교',
    short: '서정',
    logo: 'campusLogos/ㅅ/서정대학교.jpg',
  },
  {
    name: '서경대학교',
    short: '서경',
    logo: 'campusLogos/ㅅ/서경대학교.jpg',
  },
  {
    name: '서울여자대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울여자대학교.jpg',
  },
  {
    name: '순천향대학교',
    short: '순천',
    logo: 'campusLogos/ㅅ/순천향대학교.jpg',
  },
  {
    name: '세명대학교',
    short: '세명',
    logo: 'campusLogos/ㅅ/세명대학교.png',
  },
  {
    name: '신라대학교',
    short: '신라',
    logo: 'campusLogos/ㅅ/신라대학교.jpg',
  },
  {
    name: '서강대학교',
    short: '서강',
    logo: 'campusLogos/ㅅ/서강대학교.jpg',
  },
  {
    name: '서울한영대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울한영대학교.png',
  },
  {
    name: '삼육대학교',
    short: '삼육',
    logo: 'campusLogos/ㅅ/삼육대학교.jpg',
  },
  {
    name: '순천대학교',
    short: '순천',
    logo: 'campusLogos/ㅅ/순천대학교.png',
  },
  {
    name: '사이버한국외국어대학교',
    short: '사이',
    logo: 'campusLogos/ㅅ/사이버한국외국어대학교.jpg',
  },
  {
    name: '송곡대학교',
    short: '송곡',
    logo: 'campusLogos/ㅅ/송곡대학교.jpg',
  },
  {
    name: '성운대학교',
    short: '성운',
    logo: 'campusLogos/ㅅ/성운대학교.jpg',
  },
  {
    name: '수성대학교',
    short: '수성',
    logo: 'campusLogos/ㅅ/수성대학교.jpg',
  },
  {
    name: '수원과학대학교',
    short: '수원',
    logo: 'campusLogos/ㅅ/수원과학대학교.jpg',
  },
  {
    name: '세경대학교',
    short: '세경',
    logo: 'campusLogos/ㅅ/세경대학교.png',
  },
  {
    name: '서울여자간호대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울여자간호대학교.jpg',
  },
  {
    name: '서울예술대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울예술대학교.jpg',
  },
  {
    name: '수원대학교',
    short: '수원',
    logo: 'campusLogos/ㅅ/수원대학교.png',
  },
  {
    name: '서울신학대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울신학대학교.png',
  },
  {
    name: '숭실대학교',
    short: '숭실',
    logo: 'campusLogos/ㅅ/숭실대학교.jpg',
  },
  {
    name: '수원가톨릭대학교',
    short: '수원',
    logo: 'campusLogos/ㅅ/수원가톨릭대학교.jpg',
  },
  {
    name: '신경대학교',
    short: '신경',
    logo: 'campusLogos/ㅅ/신경대학교.jpg',
  },
  {
    name: '세종대학교',
    short: '세종',
    logo: 'campusLogos/ㅅ/세종대학교.png',
  },
  {
    name: '서영대학교',
    short: '서영',
    logo: 'campusLogos/ㅅ/서영대학교.jpg',
  },
  {
    name: '신구대학교',
    short: '신구',
    logo: 'campusLogos/ㅅ/신구대학교.jpg',
  },
  {
    name: '수원여자대학교',
    short: '수원',
    logo: 'campusLogos/ㅅ/수원여자대학교.png',
  },
  {
    name: '서원대학교',
    short: '서원',
    logo: 'campusLogos/ㅅ/서원대학교.jpg',
  },
  {
    name: '송원대학교',
    short: '송원',
    logo: 'campusLogos/ㅅ/송원대학교.jpg',
  },
  {
    name: '서울과학기술대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울과학기술대학교.png',
  },
  {
    name: '성공회대학교',
    short: '성공',
    logo: 'campusLogos/ㅅ/성공회대학교.png',
  },
  {
    name: '서울대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울대학교.png',
  },
  {
    name: '세계사이버대학',
    short: '세계',
    logo: 'campusLogos/ㅅ/세계사이버대학.png',
  },
  {
    name: '신안산대학교',
    short: '신안',
    logo: 'campusLogos/ㅅ/신안산대학교.jpg',
  },
  {
    name: '신한대학교',
    short: '신한',
    logo: 'campusLogos/ㅅ/신한대학교.png',
  },
  {
    name: '서울사이버대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울사이버대학교.jpg',
  },
  {
    name: '숭실사이버대학교',
    short: '숭실',
    logo: 'campusLogos/ㅅ/숭실사이버대학교.jpg',
  },
  {
    name: '상지대학교',
    short: '상지',
    logo: 'campusLogos/ㅅ/상지대학교.png',
  },
  {
    name: '송호대학교',
    short: '송호',
    logo: 'campusLogos/ㅅ/송호대학교.jpg',
  },
  {
    name: '선문대학교',
    short: '선문',
    logo: 'campusLogos/ㅅ/선문대학교.jpg',
  },
  {
    name: '숙명여자대학교',
    short: '숙명',
    logo: 'campusLogos/ㅅ/숙명여자대학교.png',
  },
  {
    name: '상지영서대학교',
    short: '상지',
    logo: 'campusLogos/ㅅ/상지영서대학교.png',
  },
  {
    name: '신성대학교',
    short: '신성',
    logo: 'campusLogos/ㅅ/신성대학교.jpg',
  },
  {
    name: '세한대학교',
    short: '세한',
    logo: 'campusLogos/ㅅ/세한대학교.png',
  },
  {
    name: '서울기독교대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울기독교대학교.png',
  },
  {
    name: '상명대학교',
    short: '상명',
    logo: 'campusLogos/ㅅ/상명대학교.jpg',
  },
  {
    name: '서라벌대학교',
    short: '서라',
    logo: 'campusLogos/ㅅ/서라벌대학교.jpg',
  },
  {
    name: '서울디지털대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울디지털대학교.jpg',
  },
  {
    name: '성결대학교',
    short: '성결',
    logo: 'campusLogos/ㅅ/성결대학교.png',
  },
  {
    name: '성신여자대학교',
    short: '성신',
    logo: 'campusLogos/ㅅ/성신여자대학교.jpg',
  },
  {
    name: '서울교육대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울교육대학교.jpg',
  },
  {
    name: '서울시립대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울시립대학교.png',
  },
  {
    name: '삼육보건대학교',
    short: '삼육',
    logo: 'campusLogos/ㅅ/삼육보건대학교.jpg',
  },
  {
    name: '선린대학교',
    short: '선린',
    logo: 'campusLogos/ㅅ/선린대학교.png',
  },
  {
    name: '서울장신대학교',
    short: '서울',
    logo: 'campusLogos/ㅅ/서울장신대학교.jpg',
  },
  {
    name: '서해대학',
    short: '서해',
    logo: 'campusLogos/ㅅ/서해대학.jpg',
  },
  {
    name: '순천제일대학교',
    short: '순천',
    logo: 'campusLogos/ㅅ/순천제일대학교.png',
  },
  {
    name: '성균관대학교',
    short: '성균',
    logo: 'campusLogos/ㅅ/성균관대학교.png',
  },
  {
    name: '순복음총회신학교',
    short: '순복',
    logo: 'campusLogos/ㅅ/순복음총회신학교.jpg',
  },
  {
    name: '광신대학교',
    short: '광신',
    logo: 'campusLogos/ㄱ/광신대학교.jpg',
  },
  {
    name: '광주가톨릭대학교',
    short: '광주',
    logo: 'campusLogos/ㄱ/광주가톨릭대학교.jpg',
  },
  {
    name: '건양대학교',
    short: '건양',
    logo: 'campusLogos/ㄱ/건양대학교.png',
  },
  {
    name: '글로벌사이버대학교',
    short: '글로',
    logo: 'campusLogos/ㄱ/글로벌사이버대학교.jpg',
  },
  {
    name: '경남대학교',
    short: '경남',
    logo: 'campusLogos/ㄱ/경남대학교.jpg',
  },
  {
    name: '공주교육대학교',
    short: '공주',
    logo: 'campusLogos/ㄱ/공주교육대학교.jpg',
  },
  {
    name: '강릉영동대학교',
    short: '강릉',
    logo: 'campusLogos/ㄱ/강릉영동대학교.jpg',
  },
  {
    name: '경동대학교',
    short: '경동',
    logo: 'campusLogos/ㄱ/경동대학교.png',
  },
  {
    name: '거제대학교',
    short: '거제',
    logo: 'campusLogos/ㄱ/거제대학교.png',
  },
  {
    name: '계명문화대학교',
    short: '계명',
    logo: 'campusLogos/ㄱ/계명문화대학교.jpg',
  },
  {
    name: '경남과학기술대학교',
    short: '경남',
    logo: 'campusLogos/ㄱ/경남과학기술대학교.jpg',
  },
  {
    name: '경운대학교',
    short: '경운',
    logo: 'campusLogos/ㄱ/경운대학교.png',
  },
  {
    name: '강원도립대학교',
    short: '강원',
    logo: 'campusLogos/ㄱ/강원도립대학교.png',
  },
  {
    name: '경희대학교',
    short: '경희',
    logo: 'campusLogos/ㄱ/경희대학교.png',
  },
  {
    name: '계명대학교',
    short: '계명',
    logo: 'campusLogos/ㄱ/계명대학교.jpg',
  },
  {
    name: '경민대학교',
    short: '경민',
    logo: 'campusLogos/ㄱ/경민대학교.jpg',
  },
  {
    name: '고신대학교',
    short: '고신',
    logo: 'campusLogos/ㄱ/고신대학교.png',
  },
  {
    name: '강원관광대학교',
    short: '강원',
    logo: 'campusLogos/ㄱ/강원관광대학교.jpg',
  },
  {
    name: '건양사이버대학교',
    short: '건양',
    logo: 'campusLogos/ㄱ/건양사이버대학교.jpg',
  },
  {
    name: '군산간호대학교',
    short: '군산',
    logo: 'campusLogos/ㄱ/군산간호대학교.png',
  },
  {
    name: '광양보건대학교',
    short: '광양',
    logo: 'campusLogos/ㄱ/[크기변환]광양보건대학교.jpg',
  },
  {
    name: '건국대학교(글로벌)',
    short: '건국',
    logo: 'campusLogos/ㄱ/건국대학교(글로벌).jpg',
  },
  {
    name: '강원대학교',
    short: '강원',
    logo: 'campusLogos/ㄱ/강원대학교.png',
  },
  {
    name: '고려대학교',
    short: '고려',
    logo: 'campusLogos/ㄱ/고려대학교.jpg',
  },
  {
    name: '극동대학교',
    short: '극동',
    logo: 'campusLogos/ㄱ/극동대학교.png',
  },
  {
    name: '경북전문대학교',
    short: '경북',
    logo: 'campusLogos/ㄱ/경북전문대학교.png',
  },
  {
    name: '광주보건대학교',
    short: '광주',
    logo: 'campusLogos/ㄱ/광주보건대학교.png',
  },
  {
    name: '경성대학교',
    short: '경성',
    logo: 'campusLogos/ㄱ/경성대학교.png',
  },
  {
    name: '가천대학교',
    short: '가천',
    logo: 'campusLogos/ㄱ/가천대학교.jpg',
  },
  {
    name: '고려사이버대학교',
    short: '고려',
    logo: 'campusLogos/ㄱ/[크기변환]고려사이버대학교.png',
  },
  {
    name: '경인교육대학교',
    short: '경인',
    logo: 'campusLogos/ㄱ/[크기변환]경인교육대학교.jpg',
  },
  {
    name: '금강대학교',
    short: '금강',
    logo: 'campusLogos/ㄱ/금강대학교.png',
  },
  {
    name: '경주대학교',
    short: '경주',
    logo: 'campusLogos/ㄱ/경주대학교.jpg',
  },
  {
    name: '김포대학교',
    short: '김포',
    logo: 'campusLogos/ㄱ/김포대학교.jpg',
  },
  {
    name: '광주대학교',
    short: '광주',
    logo: 'campusLogos/ㄱ/광주대학교.jpg',
  },
  {
    name: '경희사이버대학교',
    short: '경희',
    logo: 'campusLogos/ㄱ/경희사이버대학교.jpg',
  },
  {
    name: '가톨릭상지대학교',
    short: '가톨',
    logo: 'campusLogos/ㄱ/가톨릭상지대학교.png',
  },
  {
    name: '광주과학기술원',
    short: '광주',
    logo: 'campusLogos/ㄱ/광주과학기술원.jpg',
  },
  {
    name: '기독간호대학교',
    short: '기독',
    logo: 'campusLogos/ㄱ/기독간호대학교.jpg',
  },
  {
    name: '김천대학교',
    short: '김천',
    logo: 'campusLogos/ㄱ/김천대학교.jpg',
  },
  {
    name: '경인여자대학교',
    short: '경인',
    logo: 'campusLogos/ㄱ/경인여자대학교.jpg',
  },
  {
    name: '국제사이버대학교',
    short: '국제',
    logo: 'campusLogos/ㄱ/국제사이버대학교.jpg',
  },
  {
    name: '계원예술대학교',
    short: '계원',
    logo: 'campusLogos/ㄱ/계원예술대학교.png',
  },
  {
    name: '경기과학기술대학교',
    short: '경기',
    logo: 'campusLogos/ㄱ/경기과학기술대학교.jpg',
  },
  {
    name: '국제예술대학교',
    short: '국제',
    logo: 'campusLogos/ㄱ/국제예술대학교.png',
  },
  {
    name: '경북도립대학교',
    short: '경북',
    logo: 'campusLogos/ㄱ/경북도립대학교.jpg',
  },
  {
    name: '고려대학교(세종)',
    short: '고려',
    logo: 'campusLogos/ㄱ/고려대학교(세종).jpg',
  },
  {
    name: '경일대학교',
    short: '경일',
    logo: 'campusLogos/ㄱ/경일대학교.png',
  },
  {
    name: '광주여자대학교',
    short: '광주',
    logo: 'campusLogos/ㄱ/광주여자대학교.png',
  },
  {
    name: '군장대학교',
    short: '군장',
    logo: 'campusLogos/ㄱ/군장대학교.png',
  },
  {
    name: '건국대학교',
    short: '건국',
    logo: 'campusLogos/ㄱ/건국대학교.jpg',
  },
  {
    name: '가톨릭관동대학교',
    short: '가톨',
    logo: 'campusLogos/ㄱ/가톨릭관동대학교.png',
  },
  {
    name: '구미대학교',
    short: '구미',
    logo: 'campusLogos/ㄱ/구미대학교.jpg',
  },
  {
    name: '강동대학교',
    short: '강동',
    logo: 'campusLogos/ㄱ/강동대학교.jpg',
  },
  {
    name: '국제대학교',
    short: '국제',
    logo: 'campusLogos/ㄱ/국제대학교.jpg',
  },
  {
    name: '광운대학교',
    short: '광운',
    logo: 'campusLogos/ㄱ/광운대학교.png',
  },
  {
    name: '군산대학교',
    short: '군산',
    logo: 'campusLogos/ㄱ/군산대학교.jpg',
  },
  {
    name: '공주대학교',
    short: '공주',
    logo: 'campusLogos/ㄱ/공주대학교.jpg',
  },
  {
    name: '금오공과대학교',
    short: '금오',
    logo: 'campusLogos/ㄱ/금오공과대학교.jpg',
  },
  {
    name: '경복대학교',
    short: '경복',
    logo: 'campusLogos/ㄱ/경복대학교.jpg',
  },
  {
    name: '강릉원주대학교',
    short: '강릉',
    logo: 'campusLogos/ㄱ/강릉원주대학교.png',
  },
  {
    name: '김해대학교',
    short: '김해',
    logo: 'campusLogos/ㄱ/김해대학교.jpg',
  },
  {
    name: '가야대학교',
    short: '가야',
    logo: 'campusLogos/ㄱ/가야대학교.jpg',
  },
  {
    name: '광주교육대학교',
    short: '광주',
    logo: 'campusLogos/ㄱ/[크기변환]광주교육대학교.png',
  },
  {
    name: '감리교신학대학교',
    short: '감리',
    logo: 'campusLogos/ㄱ/감리교신학대학교.png',
  },
  {
    name: '경남도립남해대학',
    short: '경남',
    logo: 'campusLogos/ㄱ/경남도립남해대학.png',
  },
  {
    name: '경북대학교',
    short: '경북',
    logo: 'campusLogos/ㄱ/경북대학교.png',
  },
  {
    name: '국민대학교',
    short: '국민',
    logo: 'campusLogos/ㄱ/국민대학교.png',
  },
  {
    name: '경북과학대학교',
    short: '경북',
    logo: 'campusLogos/ㄱ/경북과학대학교.jpg',
  },
  {
    name: 'ICT폴리텍대학',
    short: 'IC',
    logo: 'campusLogos/ㄱ/ICT폴리텍대학.jpg',
  },
  {
    name: '경남정보대학교',
    short: '경남',
    logo: 'campusLogos/ㄱ/경남정보대학교.jpg',
  },
  {
    name: '꽃동네대학교',
    short: '꽃동',
    logo: 'campusLogos/ㄱ/꽃동네대학교.png',
  },
  {
    name: '가톨릭대학교',
    short: '가톨',
    logo: 'campusLogos/ㄱ/가톨릭대학교.jpg',
  },
  {
    name: '경상대학교',
    short: '경상',
    logo: 'campusLogos/ㄱ/경상대학교.jpg',
  },
  {
    name: '고구려대학교',
    short: '고구',
    logo: 'campusLogos/ㄱ/고구려대학교.jpg',
  },
  {
    name: '경남도립거창대학',
    short: '경남',
    logo: 'campusLogos/ㄱ/경남도립거창대학.png',
  },
  {
    name: '강남대학교',
    short: '강남',
    logo: 'campusLogos/ㄱ/강남대학교.jpg',
  },
  {
    name: '경북보건대학교',
    short: '경북',
    logo: 'campusLogos/ㄱ/경북보건대학교.jpg',
  },
  {
    name: '포항공과대학교',
    short: '포항',
    logo: 'campusLogos/ㅊㅍ/포항공과대학교.jpg',
  },
  {
    name: '청주교육대학교',
    short: '청주',
    logo: 'campusLogos/ㅊㅍ/청주교육대학교.png',
  },
  {
    name: '춘해보건대학교',
    short: '춘해',
    logo: 'campusLogos/ㅊㅍ/춘해보건대학교.jpg',
  },
  {
    name: '충북도립대학교',
    short: '충북',
    logo: 'campusLogos/ㅊㅍ/충북도립대학교.jpg',
  },
  {
    name: '창원대학교',
    short: '창원',
    logo: 'campusLogos/ㅊㅍ/창원대학교.jpg',
  },
  {
    name: '충북보건과학대학교',
    short: '충북',
    logo: 'campusLogos/ㅊㅍ/충북보건과학대학교.png',
  },
  {
    name: '청강문화산업대학교',
    short: '청강',
    logo: 'campusLogos/ㅊㅍ/청강문화산업대학교.png',
  },
  {
    name: '침례신학대학교',
    short: '침례',
    logo: 'campusLogos/ㅊㅍ/침례신학대학교.png',
  },
  {
    name: '청암대학교',
    short: '청암',
    logo: 'campusLogos/ㅊㅍ/청암대학교.jpg',
  },
  {
    name: '칼빈대학교',
    short: '칼빈',
    logo: 'campusLogos/ㅊㅍ/칼빈대학교.jpg',
  },
  {
    name: '포스코기술대학',
    short: '포스',
    logo: 'campusLogos/ㅊㅍ/포스코기술대학.png',
  },
  {
    name: '청주대학교',
    short: '청주',
    logo: 'campusLogos/ㅊㅍ/청주대학교.png',
  },
  {
    name: '포항대학교',
    short: '포항',
    logo: 'campusLogos/ㅊㅍ/포항대학교.jpg',
  },
  {
    name: '초당대학교',
    short: '초당',
    logo: 'campusLogos/ㅊㅍ/초당대학교.jpg',
  },
  {
    name: '청운대학교',
    short: '청운',
    logo: 'campusLogos/ㅊㅍ/청운대학교.jpg',
  },
  {
    name: '창원문성대학교',
    short: '창원',
    logo: 'campusLogos/ㅊㅍ/창원문성대학교.jpg',
  },
  {
    name: '케이씨대학교',
    short: '케이',
    logo: 'campusLogos/ㅊㅍ/케이씨대학교.png',
  },
  {
    name: '추계예술대학교',
    short: '추계',
    logo: 'campusLogos/ㅊㅍ/추계예술대학교.png',
  },
  {
    name: '충남도립대학교',
    short: '충남',
    logo: 'campusLogos/ㅊㅍ/충남도립대학교.jpg',
  },
  {
    name: '충북대학교',
    short: '충북',
    logo: 'campusLogos/ㅊㅍ/충북대학교.png',
  },
  {
    name: '춘천교육대학교',
    short: '춘천',
    logo: 'campusLogos/ㅊㅍ/춘천교육대학교.png',
  },
  {
    name: '총신대학교',
    short: '총신',
    logo: 'campusLogos/ㅊㅍ/총신대학교.jpg',
  },
  {
    name: '평택대학교',
    short: '평택',
    logo: 'campusLogos/ㅊㅍ/평택대학교.png',
  },
  {
    name: '충청대학교',
    short: '충청',
    logo: 'campusLogos/ㅊㅍ/충청대학교.jpg',
  },
  {
    name: '차의과학대학교',
    short: '차의',
    logo: 'campusLogos/ㅊㅍ/차의과학대학교.png',
  },
  {
    name: '창신대학교',
    short: '창신',
    logo: 'campusLogos/ㅊㅍ/창신대학교.jpg',
  },
  {
    name: '충남대학교',
    short: '충남',
    logo: 'campusLogos/ㅊㅍ/충남대학교.jpg',
  },
  {
    name: '울산과학기술원',
    short: '울산',
    logo: 'campusLogos/ㅇ/울산과학기술원.png',
  },
  {
    name: '용인대학교',
    short: '용인',
    logo: 'campusLogos/ㅇ/용인대학교.jpg',
  },
  {
    name: '영남신학대학교',
    short: '영남',
    logo: 'campusLogos/ㅇ/영남신학대학교.png',
  },
  {
    name: '영산대학교',
    short: '영산',
    logo: 'campusLogos/ㅇ/영산대학교.jpg',
  },
  {
    name: '영남대학교',
    short: '영남',
    logo: 'campusLogos/ㅇ/영남대학교.png',
  },
  {
    name: '영진전문대학교',
    short: '영진',
    logo: 'campusLogos/ㅇ/영진전문대학교.jpg',
  },
  {
    name: '연세대학교(미래)',
    short: '연세',
    logo: 'campusLogos/ㅇ/연세대학교(미래).png',
  },
  {
    name: '우송대학교',
    short: '우송',
    logo: 'campusLogos/ㅇ/우송대학교.png',
  },
  {
    name: '우석대학교',
    short: '우석',
    logo: 'campusLogos/ㅇ/우석대학교.jpg',
  },
  {
    name: '연암대학교',
    short: '연암',
    logo: 'campusLogos/ㅇ/연암대학교.png',
  },
  {
    name: '영남이공대학교',
    short: '영남',
    logo: 'campusLogos/ㅇ/영남이공대학교.jpg',
  },
  {
    name: '영남사이버대학교',
    short: '영남',
    logo: 'campusLogos/ㅇ/영남사이버대학교.jpg',
  },
  {
    name: '안양대학교',
    short: '안양',
    logo: 'campusLogos/ㅇ/안양대학교.jpg',
  },
  {
    name: '안동과학대학교',
    short: '안동',
    logo: 'campusLogos/ㅇ/안동과학대학교.jpg',
  },
  {
    name: '을지대학교',
    short: '을지',
    logo: 'campusLogos/ㅇ/을지대학교.png',
  },
  {
    name: '연암공과대학교',
    short: '연암',
    logo: 'campusLogos/ㅇ/연암공과대학교.jpg',
  },
  {
    name: '인천대학교',
    short: '인천',
    logo: 'campusLogos/ㅇ/인천대학교.png',
  },
  {
    name: '인제대학교',
    short: '인제',
    logo: 'campusLogos/ㅇ/인제대학교.jpg',
  },
  {
    name: '오산대학교',
    short: '오산',
    logo: 'campusLogos/ㅇ/오산대학교.jpg',
  },
  {
    name: '이화여자대학교',
    short: '이화',
    logo: 'campusLogos/ㅇ/이화여자대학교.png',
  },
  {
    name: '아주대학교',
    short: '아주',
    logo: 'campusLogos/ㅇ/아주대학교.jpg',
  },
  {
    name: '영산선학대학교',
    short: '영산',
    logo: 'campusLogos/ㅇ/영산선학대학교.jpg',
  },
  {
    name: '인천가톨릭대학교',
    short: '인천',
    logo: 'campusLogos/ㅇ/인천가톨릭대학교.png',
  },
  {
    name: '연성대학교',
    short: '연성',
    logo: 'campusLogos/ㅇ/연성대학교.jpg',
  },
  {
    name: '위덕대학교',
    short: '위덕',
    logo: 'campusLogos/ㅇ/위덕대학교.jpg',
  },
  {
    name: '예원예술대학교',
    short: '예원',
    logo: 'campusLogos/ㅇ/예원예술대학교.png',
  },
  {
    name: '인덕대학교',
    short: '인덕',
    logo: 'campusLogos/ㅇ/인덕대학교.jpg',
  },
  {
    name: '안산대학교',
    short: '안산',
    logo: 'campusLogos/ㅇ/안산대학교.png',
  },
  {
    name: '유원대학교',
    short: '유원',
    logo: 'campusLogos/ㅇ/유원대학교.png',
  },
  {
    name: '원광보건대학교',
    short: '원광',
    logo: 'campusLogos/ㅇ/원광보건대학교.jpg',
  },
  {
    name: '아주자동차대학',
    short: '아주',
    logo: 'campusLogos/ㅇ/아주자동차대학.jpg',
  },
  {
    name: '영남외국어대학',
    short: '영남',
    logo: 'campusLogos/ㅇ/영남외국어대학.png',
  },
  {
    name: '안동대학교',
    short: '안동',
    logo: 'campusLogos/ㅇ/안동대학교.jpg',
  },
  {
    name: '인천재능대학교',
    short: '인천',
    logo: 'campusLogos/ㅇ/인천재능대학교.jpg',
  },
  {
    name: '인하대학교',
    short: '인하',
    logo: 'campusLogos/ㅇ/인하대학교.png',
  },
  {
    name: '용인송담대학교',
    short: '용인',
    logo: 'campusLogos/ㅇ/용인송담대학교.png',
  },
  {
    name: '원광디지털대학교',
    short: '원광',
    logo: 'campusLogos/ㅇ/원광디지털대학교.jpg',
  },
  {
    name: '연세대학교',
    short: '연세',
    logo: 'campusLogos/ㅇ/연세대학교.png',
  },
  {
    name: '울산대학교',
    short: '울산',
    logo: 'campusLogos/ㅇ/울산대학교.jpg',
  },
  {
    name: '웅지세무대학교',
    short: '웅지',
    logo: 'campusLogos/ㅇ/웅지세무대학교.png',
  },
  {
    name: '영진사이버대학교',
    short: '영진',
    logo: 'campusLogos/ㅇ/영진사이버대학교.jpg',
  },
  {
    name: '아세아연합신학대학교',
    short: '아세',
    logo: 'campusLogos/ㅇ/아세아연합신학대학교.jpg',
  },
  {
    name: '울산과학대학교',
    short: '울산',
    logo: 'campusLogos/ㅇ/울산과학대학교.jpg',
  },
  {
    name: '원광대학교',
    short: '원광',
    logo: 'campusLogos/ㅇ/원광대학교.png',
  },
  {
    name: '여주대학교',
    short: '여주',
    logo: 'campusLogos/ㅇ/여주대학교.png',
  },
  {
    name: '예수대학교',
    short: '예수',
    logo: 'campusLogos/ㅇ/예수대학교.jpg',
  },
  {
    name: '인하공업전문대학',
    short: '인하',
    logo: 'campusLogos/ㅇ/인하공업전문대학.jpg',
  },
  {
    name: '유한대학교',
    short: '유한',
    logo: 'campusLogos/ㅇ/유한대학교.png',
  },
  {
    name: '우송정보대학',
    short: '우송',
    logo: 'campusLogos/ㅇ/우송정보대학.jpg',
  },
  {
    name: '중앙대학교',
    short: '중앙',
    logo: 'campusLogos/ㅈ/중앙대학교.png',
  },
  {
    name: '조선간호대학교',
    short: '조선',
    logo: 'campusLogos/ㅈ/조선간호대학교.png',
  },
  {
    name: '전남과학대학교',
    short: '전남',
    logo: 'campusLogos/ㅈ/전남과학대학교.png',
  },
  {
    name: '정화예술대학교',
    short: '정화',
    logo: 'campusLogos/ㅈ/정화예술대학교.jpg',
  },
  {
    name: '진주산업대학교',
    short: '진주',
    logo: 'campusLogos/ㅈ/진주산업대학교.jpg',
  },
  {
    name: '정석대학',
    short: '정석',
    logo: 'campusLogos/ㅈ/정석대학.png',
  },
  {
    name: '중원대학교',
    short: '중원',
    logo: 'campusLogos/ㅈ/중원대학교.png',
  },
  {
    name: '전남대학교',
    short: '전남',
    logo: 'campusLogos/ㅈ/전남대학교.png',
  },
  {
    name: '조선이공대학교',
    short: '조선',
    logo: 'campusLogos/ㅈ/조선이공대학교.jpg',
  },
  {
    name: '제주한라대학교',
    short: '제주',
    logo: 'campusLogos/ㅈ/제주한라대학교.jpg',
  },
  {
    name: '장로회신학대학교',
    short: '장로',
    logo: 'campusLogos/ㅈ/장로회신학대학교.jpg',
  },
  {
    name: '제주대학교',
    short: '제주',
    logo: 'campusLogos/ㅈ/제주대학교.jpg',
  },
  {
    name: '중앙승가대학교',
    short: '중앙',
    logo: 'campusLogos/ㅈ/중앙승가대학교.jpg',
  },
  {
    name: '진주교육대학교',
    short: '진주',
    logo: 'campusLogos/ㅈ/진주교육대학교.jpg',
  },
  {
    name: '전북과학대학교',
    short: '전북',
    logo: 'campusLogos/ㅈ/전북과학대학교.jpg',
  },
  {
    name: '전남도립대학교',
    short: '전남',
    logo: 'campusLogos/ㅈ/전남도립대학교.png',
  },
  {
    name: '전주대학교',
    short: '전주',
    logo: 'campusLogos/ㅈ/전주대학교.jpg',
  },
  {
    name: '전주비전대학교',
    short: '전주',
    logo: 'campusLogos/ㅈ/전주비전대학교.jpg',
  },
  {
    name: '전주교육대학교',
    short: '전주',
    logo: 'campusLogos/ㅈ/전주교육대학교.png',
  },
  {
    name: '제주국제대학교',
    short: '제주',
    logo: 'campusLogos/ㅈ/제주국제대학교.jpg',
  },
  {
    name: '진주보건대학교',
    short: '진주',
    logo: 'campusLogos/ㅈ/진주보건대학교.jpg',
  },
  {
    name: '장안대학교',
    short: '장안',
    logo: 'campusLogos/ㅈ/장안대학교.jpg',
  },
  {
    name: '중부대학교',
    short: '중부',
    logo: 'campusLogos/ㅈ/중부대학교.png',
  },
  {
    name: '조선대학교',
    short: '조선',
    logo: 'campusLogos/ㅈ/조선대학교.jpg',
  },
  {
    name: '전북대학교',
    short: '전북',
    logo: 'campusLogos/ㅈ/전북대학교.png',
  },
  {
    name: '전주기전대학',
    short: '전주',
    logo: 'campusLogos/ㅈ/전주기전대학.jpg',
  },
  {
    name: '제주관광대학교',
    short: '제주',
    logo: 'campusLogos/ㅈ/제주관광대학교.jpg',
  },
  {
    name: '대림대학교',
    short: '대림',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대림대학교.png',
  },
  {
    name: '대전가톨릭대학교',
    short: '대전',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대전가톨릭대학교.jpg',
  },
  {
    name: '동서울대학교',
    short: '동서',
    logo: 'campusLogos/ㄴㄷ/동서울대학교.jpg',
  },
  {
    name: '대구대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구대학교.jpg',
  },
  {
    name: '대전보건대학교',
    short: '대전',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대전보건대학교.jpg',
  },
  {
    name: '동아방송예술대학교',
    short: '동아',
    logo: 'campusLogos/ㄴㄷ/동아방송예술대학교.jpg',
  },
  {
    name: '동강대학교',
    short: '동강',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동강대학교.jpg',
  },
  {
    name: '동원대학교',
    short: '동원',
    logo: 'campusLogos/ㄴㄷ/동원대학교.jpg',
  },
  {
    name: '동양미래대학교',
    short: '동양',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동양미래대학교.jpg',
  },
  {
    name: '동아보건대학교',
    short: '동아',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동아보건대학교.png',
  },
  {
    name: '대동대학교',
    short: '대동',
    logo: 'campusLogos/ㄴㄷ/대동대학교.jpg',
  },
  {
    name: '대구교육대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대구교육대학교.png',
  },
  {
    name: '대구과학대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구과학대학교.jpg',
  },
  {
    name: '동명대학교',
    short: '동명',
    logo: 'campusLogos/ㄴㄷ/동명대학교.jpg',
  },
  {
    name: '동원과학기술대학교',
    short: '동원',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동원과학기술대학교.jpeg',
  },
  {
    name: '농협대학교',
    short: '농협',
    logo: 'campusLogos/ㄴㄷ/[크기변환]농협대학교.jpg',
  },
  {
    name: '동신대학교',
    short: '동신',
    logo: 'campusLogos/ㄴㄷ/동신대학교.jpg',
  },
  {
    name: '대신대학교',
    short: '대신',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대신대학교.jpg',
  },
  {
    name: '대구보건대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구보건대학교.jpg',
  },
  {
    name: '두원공과대학교',
    short: '두원',
    logo: 'campusLogos/ㄴㄷ/[크기변환]두원공과대학교.jpg',
  },
  {
    name: '대전과학기술대학교',
    short: '대전',
    logo: 'campusLogos/ㄴㄷ/대전과학기술대학교.jpg',
  },
  {
    name: '대원대학교',
    short: '대원',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대원대학교.png',
  },
  {
    name: '동국대학교',
    short: '동국',
    logo: 'campusLogos/ㄴㄷ/동국대학교.png',
  },
  {
    name: '디지털서울문화예술대학교',
    short: '디지',
    logo: 'campusLogos/ㄴㄷ/디지털서울문화예술대학교.jpg',
  },
  {
    name: '동의과학대학교',
    short: '동의',
    logo: 'campusLogos/ㄴㄷ/동의과학대학교.png',
  },
  {
    name: '대구가톨릭대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대구가톨릭대학교.jpg',
  },
  {
    name: '대구경북과학기술원',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구경북과학기술원.jpg',
  },
  {
    name: '대덕대학교',
    short: '대덕',
    logo: 'campusLogos/ㄴㄷ/대덕대학교.jpeg',
  },
  {
    name: '대구사이버대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대구사이버대학교.jpg',
  },
  {
    name: '동아대학교',
    short: '동아',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동아대학교.jpg',
  },
  {
    name: '남서울대학교',
    short: '남서',
    logo: 'campusLogos/ㄴㄷ/남서울대학교.jpg',
  },
  {
    name: '동남보건대학교',
    short: '동남',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동남보건대학교.png',
  },
  {
    name: '대구예술대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구예술대학교.png',
  },
  {
    name: '동국대학교(경주)',
    short: '동국',
    logo: 'campusLogos/ㄴㄷ/동국대학교(경주).png',
  },
  {
    name: '대구공업대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/대구공업대학교.jpg',
  },
  {
    name: '동부산대학교',
    short: '동부',
    logo: 'campusLogos/ㄴㄷ/동부산대학교.png',
  },
  {
    name: '대전대학교',
    short: '대전',
    logo: 'campusLogos/ㄴㄷ/대전대학교.png',
  },
  {
    name: '단국대학교',
    short: '단국',
    logo: 'campusLogos/ㄴㄷ/단국대학교.png',
  },
  {
    name: '동서대학교',
    short: '동서',
    logo: 'campusLogos/ㄴㄷ/동서대학교.jpg',
  },
  {
    name: '동덕여자대학교',
    short: '동덕',
    logo: 'campusLogos/ㄴㄷ/동덕여자대학교.png',
  },
  {
    name: '동양대학교',
    short: '동양',
    logo: 'campusLogos/ㄴㄷ/동양대학교.jpg',
  },
  {
    name: '남부대학교',
    short: '남부',
    logo: 'campusLogos/ㄴㄷ/남부대학교.jpg',
  },
  {
    name: '대구한의대학교',
    short: '대구',
    logo: 'campusLogos/ㄴㄷ/[크기변환]대구한의대학교.jpg',
  },
  {
    name: '대경대학교',
    short: '대경',
    logo: 'campusLogos/ㄴㄷ/대경대학교.jpg',
  },
  {
    name: '대우조선해양공과대학',
    short: '대우',
    logo: 'campusLogos/ㄴㄷ/대우조선해양공과대학.jpg',
  },
  {
    name: '동의대학교',
    short: '동의',
    logo: 'campusLogos/ㄴㄷ/동의대학교.png',
  },
  {
    name: '대진대학교',
    short: '대진',
    logo: 'campusLogos/ㄴㄷ/대진대학교.png',
  },
  {
    name: '동주대학교',
    short: '동주',
    logo: 'campusLogos/ㄴㄷ/[크기변환]동주대학교.jpg',
  },
  {
    name: '덕성여자대학교',
    short: '덕성',
    logo: 'campusLogos/ㄴㄷ/덕성여자대학교.jpg',
  },
  {
    name: '나사렛대학교',
    short: '나사',
    logo: 'campusLogos/ㄴㄷ/나사렛대학교.jpg',
  },
  {
    name: '대전신학대학교',
    short: '대전',
    logo: 'campusLogos/ㄴㄷ/대전신학대학교.jpg',
  },
  {
    name: '부산경상대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산경상대학교.jpg',
  },
  {
    name: '부산여자대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산여자대학교.png',
  },
  {
    name: '백제예술대학교',
    short: '백제',
    logo: 'campusLogos/ㄹㅂ/백제예술대학교.jpg',
  },
  {
    name: '명지전문대학',
    short: '명지',
    logo: 'campusLogos/ㄹㅂ/명지전문대학.jpg',
  },
  {
    name: '부산외국어대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산외국어대학교.jpg',
  },
  {
    name: '부경대학교',
    short: '부경',
    logo: 'campusLogos/ㄹㅂ/부경대학교.jpg',
  },
  {
    name: '배재대학교',
    short: '배재',
    logo: 'campusLogos/ㄹㅂ/배재대학교.png',
  },
  {
    name: '목포해양대학교',
    short: '목포',
    logo: 'campusLogos/ㄹㅂ/목포해양대학교.jpg',
  },
  {
    name: '부천대학교',
    short: '부천',
    logo: 'campusLogos/ㄹㅂ/부천대학교.jpg',
  },
  {
    name: '백석예술대학교',
    short: '백석',
    logo: 'campusLogos/ㄹㅂ/백석예술대학교.jpg',
  },
  {
    name: '목포과학대학교',
    short: '목포',
    logo: 'campusLogos/ㄹㅂ/목포과학대학교.png',
  },
  {
    name: '부산대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산대학교.png',
  },
  {
    name: '부산예술대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산예술대학교.jpg',
  },
  {
    name: '배화여자대학교',
    short: '배화',
    logo: 'campusLogos/ㄹㅂ/배화여자대학교.jpg',
  },
  {
    name: '문경대학교',
    short: '문경',
    logo: 'campusLogos/ㄹㅂ/문경대학교.jpg',
  },
  {
    name: '부산장신대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산장신대학교.jpg',
  },
  {
    name: '백석대학교',
    short: '백석',
    logo: 'campusLogos/ㄹㅂ/백석대학교.jpg',
  },
  {
    name: '부산교육대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산교육대학교.jpeg',
  },
  {
    name: '부산과학기술대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산과학기술대학교.jpg',
  },
  {
    name: '목포가톨릭대학교',
    short: '목포',
    logo: 'campusLogos/ㄹㅂ/목포가톨릭대학교.jpg',
  },
  {
    name: '마산대학교',
    short: '마산',
    logo: 'campusLogos/ㄹㅂ/마산대학교.jpg',
  },
  {
    name: '루터대학교',
    short: '루터',
    logo: 'campusLogos/ㄹㅂ/루터대학교.jpg',
  },
  {
    name: '명지대학교',
    short: '명지',
    logo: 'campusLogos/ㄹㅂ/명지대학교.jpg',
  },
  {
    name: '부산가톨릭대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산가톨릭대학교.png',
  },
  {
    name: '목포대학교',
    short: '목포',
    logo: 'campusLogos/ㄹㅂ/목포대학교.jpg',
  },
  {
    name: '목원대학교',
    short: '목원',
    logo: 'campusLogos/ㄹㅂ/목원대학교.jpg',
  },
  {
    name: '부산디지털대학교',
    short: '부산',
    logo: 'campusLogos/ㄹㅂ/부산디지털대학교.jpg',
  },
  {
    name: '한신대학교',
    short: '한신',
    logo: 'campusLogos/ㅎ/한신대학교.jpg',
  },
  {
    name: '호원대학교',
    short: '호원',
    logo: 'campusLogos/ㅎ/호원대학교.jpg',
  },
  {
    name: '한성대학교',
    short: '한성',
    logo: 'campusLogos/ㅎ/한성대학교.jpg',
  },
  {
    name: '한림대학교',
    short: '한림',
    logo: 'campusLogos/ㅎ/한림대학교.png',
  },
  {
    name: '한국교통대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국교통대학교.jpg',
  },
  {
    name: '한양대학교 (에리카)',
    short: '한양',
    logo: 'campusLogos/ㅎ/한양대학교 (에리카).jpg',
  },
  {
    name: '한국복지대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국복지대학교.jpg',
  },
  {
    name: '한려대학교',
    short: '한려',
    logo: 'campusLogos/ㅎ/한려대학교.jpg',
  },
  {
    name: '한국성서대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국성서대학교.png',
  },
  {
    name: '한국영상대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국영상대학교.jpg',
  },
  {
    name: '한국복지사이버대학',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국복지사이버대학.jpg',
  },
  {
    name: '한국산업기술대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국산업기술대학교.png',
  },
  {
    name: '한양대학교',
    short: '한양',
    logo: 'campusLogos/ㅎ/한양대학교.jpg',
  },
  {
    name: '호산대학교',
    short: '호산',
    logo: 'campusLogos/ㅎ/호산대학교.png',
  },
  {
    name: '한국교원대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국교원대학교.png',
  },
  {
    name: '한국폴리텍대학',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국폴리텍대학.png',
  },
  {
    name: '화신사이버대학교',
    short: '화신',
    logo: 'campusLogos/ㅎ/화신사이버대학교.jpg',
  },
  {
    name: '한국열린사이버대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국열린사이버대학교.png',
  },
  {
    name: '호남대학교',
    short: '호남',
    logo: 'campusLogos/ㅎ/호남대학교.jpg',
  },
  {
    name: '한양사이버대학교',
    short: '한양',
    logo: 'campusLogos/ㅎ/한양사이버대학교.png',
  },
  {
    name: '한국기술교육대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국기술교육대학교.jpg',
  },
  {
    name: '한밭대학교',
    short: '한밭',
    logo: 'campusLogos/ㅎ/한밭대학교.png',
  },
  {
    name: '한림성심대학교',
    short: '한림',
    logo: 'campusLogos/ㅎ/한림성심대학교.jpg',
  },
  {
    name: '한국국제대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국국제대학교.jpg',
  },
  {
    name: '한동대학교',
    short: '한동',
    logo: 'campusLogos/ㅎ/한동대학교.png',
  },
  {
    name: '한국과학기술원',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국과학기술원.png',
  },
  {
    name: '한경대학교',
    short: '한경',
    logo: 'campusLogos/ㅎ/한경대학교.jpg',
  },
  {
    name: '한일장신대학교',
    short: '한일',
    logo: 'campusLogos/ㅎ/한일장신대학교.jpg',
  },
  {
    name: '한라대학교',
    short: '한라',
    logo: 'campusLogos/ㅎ/한라대학교.jpg',
  },
  {
    name: '한국승강기대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국승강기대학교.jpg',
  },
  {
    name: '협성대학교',
    short: '협성',
    logo: 'campusLogos/ㅎ/협성대학교.jpg',
  },
  {
    name: '한국예술종합학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국예술종합학교.png',
  },
  {
    name: '한국농수산대학',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국농수산대학.png',
  },
  {
    name: '한국방송통신대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국방송통신대학교.jpg',
  },
  {
    name: '한양여자대학교',
    short: '한양',
    logo: 'campusLogos/ㅎ/한양여자대학교.png',
  },
  {
    name: '한국해양대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국해양대학교.png',
  },
  {
    name: '한세대학교',
    short: '한세',
    logo: 'campusLogos/ㅎ/한세대학교.png',
  },
  {
    name: '한국항공대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국항공대학교.jpg',
  },
  {
    name: '한국체육대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국체육대학교.png',
  },
  {
    name: '한국전통문화대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국전통문화대학교.jpg',
  },
  {
    name: '한서대학교',
    short: '한서',
    logo: 'campusLogos/ㅎ/한서대학교.jpg',
  },
  {
    name: '한국골프대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국골프대학교.png',
  },
  {
    name: '홍익대학교',
    short: '홍익',
    logo: 'campusLogos/ㅎ/홍익대학교.jpg',
  },
  {
    name: '한영대학교',
    short: '한영',
    logo: 'campusLogos/ㅎ/한영대학교.jpg',
  },
  {
    name: '호남신학대학교',
    short: '호남',
    logo: 'campusLogos/ㅎ/호남신학대학교.jpg',
  },
  {
    name: '한남대학교',
    short: '한남',
    logo: 'campusLogos/ㅎ/한남대학교.jpg',
  },
  {
    name: '한국외국어대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국외국어대학교.jpg',
  },
  {
    name: '호서대학교',
    short: '호서',
    logo: 'campusLogos/ㅎ/호서대학교.jpg',
  },
  {
    name: '한국관광대학교',
    short: '한국',
    logo: 'campusLogos/ㅎ/한국관광대학교.jpg',
  },
  {
    name: '혜전대학교',
    short: '혜전',
    logo: 'campusLogos/ㅎ/혜전대학교.png',
  },
];

export const campusDict = Object.assign({}, ...campusList.map((item) => ({[item.name]: item})));

export default campusList;
