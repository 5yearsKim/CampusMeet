import React, {useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';
import {Auth, Hub} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme as PaperTheme, Provider as PaperProvider} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import Route from 'src/Route';
import {bringSentSignalToday} from 'src/utils/Signal';
import {ThemeContext, MyContext, UserContext, BadgeContext} from 'src/context';
import IntroSlider from 'src/blocks/IntroSlider';
import config from 'src/config';

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pushNoti, setPushNoti] = useState(true);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [scheme, setScheme] = useState('light');
  const [font, setFont] = useState();

  const [newCand, setNewCand] = useState(false);
  const [signalCnt, setSignalCnt] = useState(0);
  // console.log(user.signInUserSession.accessToken.jwtToken);
  const [refreshCandidate, setRefreshCandidate] = useState(false);
  const [refreshSentSignal, setRefreshSentSignal] = useState(false);
  const [refreshReceivedSignal, setRefreshReceivedSignal] = useState(false);
  const [refreshMatch, setRefreshMatch] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(false);
  const [refreshMypage, setRefreshMypage] = useState(false);
  // badge props
  const [signalBadge, setSignalBadge] = useState(0);
  const [matchBadge, setMatchBadge] = useState(0);

  const [fontLoaded] = useFonts({
    // nanumEB: require('assets/fonts/NanumSquareRoundEB.ttf'),
    nanumB: require('assets/fonts/NanumGothic-Bold.ttf'),
    nanumR: require('assets/fonts/NanumGothic-Regular.ttf'),
    cuteR: require('assets/fonts/GamjaFlower-Regular.ttf'),
    cuteB: require('assets/fonts/SingleDay-Regular.ttf'),
    // nanumL: require('assets/fonts/NanumSquareRoundL.ttf'),
  });
  const [introShow, setIntroShow] = useState(false);

  // auth init
  useEffect(() => {
    console.log('app loaded');
    const bringCurrentUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        const sub = userData.signInUserSession.accessToken.payload.sub;
        const userTmp = {
          sub: sub,
        };
        setUser(userTmp);
        setIsAuthenticated(true);
      } catch (err) {
        console.warn(err);
      }
      setAuthChecked(true);
    };
    bringCurrentUser();
  }, []);

  // for social signin
  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          const sub = data.signInUserSession.accessToken.payload.sub;
          const userTmp = {
            sub: sub,
          };
          setUser(userTmp);
          setIsAuthenticated(true);
          break;
        case 'signOut':
          // setUser(null);
          setIsAuthenticated(false);
          break;
      }
    });
  }, []);

  // theme schem load
  useEffect(() => {
    const getScheme = async () => {
      try {
        const val = await AsyncStorage.getItem('scheme');
        if (val != null) {
          setScheme(val);
        } else {
          setScheme('light');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getScheme();
  }, []);

  // intro slider view
  useEffect(() => {
    const getIntroShow = async () => {
      try {
        const val = await AsyncStorage.getItem('introShow');
        if (val != null) {
          setIntroShow(JSON.parse(val));
          // setIntroShow(true);
        } else {
          setIntroShow(true);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getIntroShow();
  }, []);

  // pushNoti status load
  useEffect(() => {
    const bringPushInfo = async () => {
      const jsonValue = await AsyncStorage.getItem('pushNoti');
      const pushData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (pushData == true) {
        setPushNoti(true);
      } else {
        setPushNoti(false);
      }
    };
    bringPushInfo();
  }, []);

  // app font setting load
  useEffect(() => {
    const bringFont = async () => {
      const jsonValue = await AsyncStorage.getItem('font');
      const fontData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (fontData) {
        setFont(fontData);
      }
    };
    bringFont();
  }, []);
  // user state load
  useEffect(() => {
    const m_bringSentSignalToday = async () => {
      try {
        const userSub = user.sub;
        const signalData = await bringSentSignalToday(userSub);
        setSignalCnt(signalData.length);
      } catch (err) {
        console.warn(err);
      }
    };
    if (!!user.attributes) {
      m_bringSentSignalToday();
    }
  }, [user]);

  const authProps = () => {
    return {
      isAuthenticated: isAuthenticated,
      user: user,
      setUser: setUser,
      setIsAuthenticated: setIsAuthenticated,
      name: name,
      setName: setName,
      pushNoti: pushNoti,
      setPushNoti: setPushNoti,
    };
  };

  const themeProps = () => {
    return {
      scheme: scheme,
      setScheme: setScheme,
      font: font,
      setFont, setFont,
      theme: config.themes[scheme],
    };
  };
  const userProps = () => {
    return {
      newCand: newCand,
      setNewCand: setNewCand,
      signalCnt: signalCnt,
      setSignalCnt: setSignalCnt,

      refreshCandidate: refreshCandidate,
      setRefreshCandidate: setRefreshCandidate,
      refreshSentSignal: refreshSentSignal,
      setRefreshSentSignal: setRefreshSentSignal,
      refreshReceivedSignal: refreshReceivedSignal,
      setRefreshReceivedSignal: setRefreshReceivedSignal,
      refreshMatch: refreshMatch,
      setRefreshMatch: setRefreshMatch,
      refreshBoard: refreshBoard,
      setRefreshBoard: setRefreshBoard,
      refreshMypage: refreshMypage,
      setRefreshMypage: setRefreshMypage,
    };
  };

  const badgeProps = () => {
    return {
      signalBadge: signalBadge,
      setSignalBadge: setSignalBadge,
      matchBadge: matchBadge,
      setMatchBadge: setMatchBadge,
    };
  };

  if (introShow) {
    return (
      <IntroSlider
        onDone={async () => {
          setIntroShow(false);
          await AsyncStorage.setItem('introShow', JSON.stringify(false));
        }}
      />
    );
  }

  if (fontLoaded && authChecked) {
    return (
      <MyContext.Provider value={authProps()}>
        <ThemeContext.Provider value={themeProps()}>
          <UserContext.Provider value={userProps()}>
            <BadgeContext.Provider value={badgeProps()}>
              <PaperProvider theme={isAuthenticated ? paperTheme[scheme] : paperTheme['light']}>
                <NavigationContainer theme={navigationTheme[scheme]}>
                  <StatusBar style='auto'/>
                  <Route/>
                </NavigationContainer>
              </PaperProvider>
            </BadgeContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MyContext.Provider>
    );
  } else {
    return (
      <AppLoading
        onError={console.warn}
      />
    );
  }
}

const paperTheme = {
  dark: {
    ...PaperTheme,
    colors: {
      ...PaperTheme.colors,
      primary: config.colors.main.primary,
      accent: config.colors.main.secondary,
      placeholder: config.themes.dark.subText,
      text: config.themes.dark.text,
    },
    dark: true,
  },
  light: {
    ...PaperTheme,
    colors: {
      ...PaperTheme.colors,
      primary: config.colors.main.primary,
      accent: config.colors.main.secondary,
    },
    dark: false,
  },
};

const navigationTheme = {
  light: {
    ...NavDefaultTheme,
    colors: {
      ...NavDefaultTheme.colors,
      primary: config.colors.main.primary,
    },
  },
  dark: {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      primary: config.colors.main.primary,
      background: config.themes.dark.background,
      text: '#ffffff',
    },
  },
};

