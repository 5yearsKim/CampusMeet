import React, {useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme as PaperTheme, Provider as PaperProvider} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import config from 'src/config';
import {bringSentSignalToday} from 'src/utils/Signal';
import {ThemeContext, MyContext, UserContext} from 'src/context';
import Route from 'src/Route';

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState([]);
  const [scheme, setScheme] = useState('light');
  const [signalCnt, setSignalCnt] = useState(0);

  const [refreshCandidate, setRefreshCandidate] = useState(false);
  const [refreshSentSignal, setRefreshSentSignal] = useState(false);
  const [refreshMypage, setRefreshMypage] = useState(false);

  const [fontLoaded] = useFonts({
    nanumEB: require('src/assets/fonts/NanumSquareRoundEB.ttf'),
    nanumB: require('src/assets/fonts/NanumSquareRoundB.ttf'),
    nanumR: require('src/assets/fonts/NanumSquareRoundR.ttf'),
    nanumL: require('src/assets/fonts/NanumSquareRoundL.ttf'),
    gamja: require('src/assets/fonts/GamjaFlower-Regular.ttf'),
  });

  // auth init
  useEffect(() => {
    console.log('app loaded');
    const bringCurrentUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
      setAuthChecked(true);
    };
    bringCurrentUser();
  }, []);

  // theme schem load
  useEffect(() => {
    const getScheme = async () => {
      try {
        const val = await AsyncStorage.getItem('scheme');
        if (val != null) {
          setScheme(val);
        }
      } catch (err) {
        setScheme('light');
      }
    };
    getScheme();
  }, []);

  // user state load
  useEffect(() => {
    const m_bringSentSignalToday = async () => {
      try {
        const userSub = user.attributes.sub;
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
    };
  };

  const themeProps = () => {
    return {
      scheme: scheme,
      setScheme: setScheme,
      theme: config.themes[scheme],
    };
  };
  const userProps = () => {
    return {
      signalCnt: signalCnt,
      setSignalCnt: setSignalCnt,

      refreshCandidate: refreshCandidate,
      setRefreshCandidate: setRefreshCandidate,
      refreshSentSignal: refreshSentSignal,
      setRefreshSentSignal: setRefreshSentSignal,
      refreshMypage: refreshMypage,
      setRefreshMypage: setRefreshMypage,
    };
  };
  if (fontLoaded && authChecked) {
    return (
      <MyContext.Provider value={authProps()}>
        <ThemeContext.Provider value={themeProps()}>
          <UserContext.Provider value={userProps()}>
            <PaperProvider theme={isAuthenticated ? paperTheme[scheme] : paperTheme['light']}>
              <NavigationContainer theme={navigationTheme[scheme]}>
                <Route/>
              </NavigationContainer>
            </PaperProvider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MyContext.Provider>
    );
  } else {
    return null;
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

export default App;

