import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme as PaperTheme, Provider as PaperProvider} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import config from 'src/config';
import {ThemeContext, MyContext} from 'src/context';
import Route from 'src/Route';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState([]);
  const [scheme, setScheme] = useState('dark');

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
    };
    bringCurrentUser();
  }, []);

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
  return (
    <MyContext.Provider value={authProps()}>
      <ThemeContext.Provider value={themeProps()}>
        <PaperProvider theme={isAuthenticated ? paperTheme[scheme] : paperTheme['light']}>
          <NavigationContainer theme={navigationTheme[scheme]}>
            <Route/>
          </NavigationContainer>
        </PaperProvider>
      </ThemeContext.Provider>
    </MyContext.Provider>
  );
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

