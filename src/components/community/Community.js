import React from 'react';
import Board from './Board';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

function Community({navigation}) {
  const boards = [
    {
      id: '16465ffd-0965-47ae-866b-f4ae2c742b66',
      description: '자유롭게 대화하는 자유게시판',
      type: '학교/학과 공개',
      name: '자유게시판',
    },
    {
      id: '9d8f882f-8403-409b-97cb-f072cf6301ea',
      description: '모든것이 비밀스러운 비밀게시판',
      type: '익명',
      name: '비밀게시판',
    },
  ];

  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="freeBoard"
        component={Board}
        options={{title: '자유게시판'}}
        initialParams={{board: boards[0]}}
      />
      <TopTab.Screen
        name="secretBoard"
        component={Board}
        options={{title: '익명게시판'}}
        initialParams={{board: boards[1]}}
      />
    </TopTab.Navigator>
  );
}

export default Community;
