import React, {useContext} from 'react';
import {Text} from 'react-native';
import config from 'src/config';
import {ThemeContext} from 'src/context';

// boardOptions = ['익명', '학교/학과 공개']
const boardOptions = config.community.boardOptions;

export function Nickname({type, nickname, style}) {
  const {theme} = useContext(ThemeContext);
  const [gender, name] = nickname.split('|');
  // if board type is '익명'
  if (type == boardOptions[0]) {
    return (
      <Text style={[style, {color: theme.subText}]}>{name}</Text>
    );
  }
  if (type == boardOptions[1]) {
    return (
      <Text style={[style, gender=='남자'?{color: config.colors.main.men}:{color: config.colors.main.women}]}>{name}</Text>
    );
  }
}
