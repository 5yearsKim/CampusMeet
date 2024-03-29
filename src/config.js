const mode = 'prod';
const isLocal = false;
export const backURL = isLocal ? 'http://127.0.0.1:8000' :
  mode == 'dev' ? 'https://9pgkfe0rs0.execute-api.ap-northeast-2.amazonaws.com/api' :
  'https://4cs4ndyfd2.execute-api.ap-northeast-2.amazonaws.com/api';

const primary = '#889df8';
export default config = {
  campus: {
    departmentOptions: ['공대', '자연대', '인문대', '사회과학대', '신학', '상경대', '어문계열', '생활과학대', '의/치학', '간호대', '법과대', '농과대', '사범대', '교대', '음악', '미술/디자인', '체육/스포츠', '군사'],
  },
  community: {
    boardOptions: ['익명', '학교/학과 공개'],
  },
  giphyApiKey: '04zr69Z91E39ROGO6C8fGDSMPtae5cEW',
  colors: {
    main: {
      primary: primary,
      secondary: 'green',
    },
    inputBox: {
      mainButton: primary,
    },
    chat: {
      background: '#FFF0F5',
      myMessageBox: '#000080',
      myMessageText: 'white',
      yourMessageBox: '#FAFAD2',
      yourMessageText: 'black',
    },
  },
  themes: {
    light: {
      primary: primary, 
      text: '#000000',
      subText: '#222222',
      background: '#fafafa',
      nestedComment: '#rgba(0, 0, 0, 0.08)',
      men: '#083965',
      women: '#d62252',
      verified: '#00aa00',
    },
    dark: {
      primary: primary, 
      text: '#ffffff',
      subText: '#eeeeee',
      background: '#333333',
      nestedComment: 'rgba(255, 255, 255, 0.2)',
      men: '#083965',
      women: '#FF9AA2',
      verified: '#ff00ff',
    },
  },
  manage: {
    signalMax: 5,
  },
};

