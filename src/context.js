import React from 'react';
import config from 'src/config';

export const MyContext = React.createContext({
  isAuthenticated: false,
  user: {},
});

export const ChatContext = React.createContext({
  isNested: false,
  setIsNested: undefined,
});

export const ThemeContext = React.createContext(config.themes.light);

export const UserContext = React.createContext({
  signalCnt: 0,
  setSignalCnt: undefined,

  refreshSentSignal: false,
  setReshSentSignal: undefined,
  refreshCandidate: false,
  setRefreshCandidate: undefined,
  refreshMypage: false,
  setRefreshMypage: undefined,
});
