import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [iosPadding, setIosPadding] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  async function onKeyboardDidShow(e) {
    setKeyboardOpen(true);
    if (!keyboardHeight) {
      setKeyboardHeight(e.endCoordinates.height);
      const jsonValue = JSON.stringify(e.endCoordinates.height);
      await AsyncStorage.setItem('keyboardHeight', jsonValue);
    } 
  }

  function onKeyboardDidHide() {
    setKeyboardOpen(false);
  }
  useEffect(() => {
    const setKeyboardInfo = async () => {
      try {
        const height = await AsyncStorage.getItem('keyboardHeight');
        if (height != null) {
          setKeyboardHeight(JSON.parse(height));
        }
      } catch (err) {
        console.warn(err);
      }
    }
    setKeyboardInfo();
  }, []);

  useEffect(() => {
    if (keyboardHeight) {
      const a = 0.357;
      const b = -32.8;
      setIosPadding(a * keyboardHeight + b)
    }
  }, [keyboardHeight])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return {keyboardHeight, iosPadding};
};