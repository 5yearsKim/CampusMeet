export default config = {
  campus: {
    departmentOptions: ['공대', '자연대', '음악', '미술/디자인', '체육/스포츠', '인문/사회대', '상경대', '교양', '의학', '법률', '군사'],
  },
  community: {
    boardOptions: ['익명', '학교/학과 공개'],
  },
  api: {
    campusURL: 'https://3eq8n8hqih.execute-api.ap-northeast-2.amazonaws.com/api',
  },
  giphyApiKey: '04zr69Z91E39ROGO6C8fGDSMPtae5cEW',
  colors: {
    main: {
      primary: '#889DF8',
      primary_: '#6681F4', // color for gradient
      secondary: 'green',
      men: '#083965',
      women: '#FF9AA2',
    },
    inputBox: {
      mainButton: '#0C6157',
    },
    chat: {
      background: '#B3B2FF',
      myMessageBox: '#0E0C52',
      myMessageText: 'white',
      yourMessageBox: '#B0E0E6',
      yourMessageText: 'black',
    },
  },
  themes: {
    light: {
      text: '#000000',
      subText: '#222222',
      background: '#eeeeee',
      nestedComment: '#rgba(0, 0, 0, 0.8)',
    },
    dark: {
      text: '#ffffff',
      subText: '#eeeeee',
      background: '#333333',
      nestedComment: 'rgba(255, 255, 255, 0.2)',
    },
  },
  manage: {
    signalMax: 3,
  },
};
