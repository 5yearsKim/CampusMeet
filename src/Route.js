import React, {useContext} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, FontAwesome, AntDesign, Feather} from '@expo/vector-icons';
import {MyContext, ThemeContext} from 'src/context';
import config from 'src/config';
// Before login
import LoginScreen from 'src/screens/auth/LoginScreen';
import RegisterScreen from 'src/screens/auth/RegisterScreen';
import ForgotPasswordScreen from 'src/screens/auth/ForgotPasswordScreen';
// Home Tab Screens
import MypageScreen from 'src/screens/mypage/MypageScreen';
import CandidateScreen from 'src/screens/candidates/CandidateScreen';
import SignalScreen from 'src/screens/candidates/SignalScreen';
import CommunityScreen from 'src/screens/community/CommunityScreen';
import MatchScreen from 'src/screens/matches/MatchScreen';
// Stack Screens
import ChatRoomScreen from 'src/screens/matches/ChatRoomScreen';
import CreateProfileScreen from 'src/screens/mypage/CreateProfileScreen';
import ModifyProfileScreen from 'src/screens/mypage/ModifyProfileScreen';
import ViewProfileScreen from 'src/screens/mypage/ViewProfileScreen';
import CreateBoardScreen from 'src/screens/community/CreateBoardScreen';
import CreatePostScreen from 'src/screens/community/CreatePostScreen';
import BoardScreen from 'src/screens/community/BoardScreen';
import PostScreen from 'src/screens/community/PostScreen';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTab({navigation}) {
  return (
    <BottomTab.Navigator initialRouteName='Candidate'>
      <BottomTab.Screen
        name='Candidate'
        component={CandidateScreen}
        options={{
          title: 'Cards',
          tabBarIcon: ({focused, color, size}) => {
            return <MaterialCommunityIcons name='cards-playing-outline' size={size} color={color}/>;
          },
        }}
      />
      <BottomTab.Screen
        name='Signal'
        component={SignalScreen}
        options={{
          title: 'Signals',
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name='heartbeat' size={size} color={color}/>;
          },
        }}
      />
      <BottomTab.Screen
        name='Match'
        component={MatchScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({focused, color, size}) => {
            return <AntDesign name='message1' size={size} color={color}/>;
          },
        }}
      />
      <BottomTab.Screen
        name='Community'
        component={CommunityScreen}
        options={{
          title: 'Community',
          tabBarIcon: ({focused, color, size}) => {
            return <MaterialCommunityIcons name='forum-outline' size={size} color={color}/>;
          },
        }}
      />
      <BottomTab.Screen
        name='Mypage'
        component={MypageScreen}
        options={{
          title: 'MyPage',
          tabBarIcon: ({focused, color, size}) => {
            return <Feather name='user' size={size} color={color}/>;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

function Route() {
  const auth = useContext(MyContext);
  const {scheme} = useContext(ThemeContext);

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    switch (routeName) {
      case 'Candidate':
        return '카드';
      case 'Signal':
        return '시그널';
      case 'Match':
        return '채팅';
      case 'Community':
        return '커뮤니티';
      case 'Mypage':
        return '마이페이지';
    }
  };

  if (auth.isAuthenticated) {
    return (
      <MainStack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: scheme == 'light' && {backgroundColor: config.colors.main.primary},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* <MainStack.Screen name='Home' component={HomeTab} /> */}
        <MainStack.Screen
          name='Home'
          component={HomeTab}
          options={ ({route}) => ({
            headerTitle: getHeaderTitle(route),
          }) }
        />
        <MainStack.Screen name='ChatRoom' component={ChatRoomScreen}/>
        <MainStack.Screen name='CreateProfile' component={CreateProfileScreen} options={{title: '프로필작성'}}/>
        <MainStack.Screen name='ModifyProfile' component={ModifyProfileScreen} options={{title: '프로필수정'}}/>
        <MainStack.Screen name='ViewProfile' component={ViewProfileScreen} options={{title: '프로필보기'}}/>
        <MainStack.Screen name='Board' component={BoardScreen} options={{title: '게시판'}}/>
        <MainStack.Screen name='Post' component={PostScreen} options={{title: ''}}/>
        <MainStack.Screen name='CreateBoard' component={CreateBoardScreen} options={{title: '게시판만들기'}}/>
        <MainStack.Screen name='CreatePost' component={CreatePostScreen} options={{title: '글쓰기'}}/>
      </MainStack.Navigator>
    );
  } else {
    return (
      <MainStack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: config.colors.main.primary,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <MainStack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <MainStack.Screen name='Register' component={RegisterScreen} options={{title: '회원 등록'}}/>
        <MainStack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{title: '비밀번호 찾기'}}/>
      </MainStack.Navigator>
    );
  }
}

export default Route;
