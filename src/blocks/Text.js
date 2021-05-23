import React, {useState, useEffect} from 'react';
import {View, Text as NativeText, Keyboard} from 'react-native';
import {IconButton, TextInput as PaperTextInput} from 'react-native-paper';
import {useFonts} from 'expo-font';

export default function Text(props) {
  let mounted = true;
  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);
  if (mounted == false) {
    return;
  }
  const [loaded] = useFonts({
    nanumB: require('src/assets/fonts/NanumSquareRoundB.ttf'),
    nanumR: require('src/assets/fonts/NanumSquareRoundR.ttf'),
    nanumL: require('src/assets/fonts/NanumSquareRoundL.ttf'),
    gamja: require('src/assets/fonts/GamjaFlower-Regular.ttf'),
  });
  if (!loaded) {
  // if (true) {
    // return <NativeText {...props}>{props.children}</NativeText>;
    return <NativeText> </NativeText>;
  }
  let style = props.style;
  if (style == undefined) {
    style = {};
  } else if (Array.isArray(style)) {
    style = Object.assign({}, ...props.style);
  }
  let font = 'nanumR';
  if (style.font == 'gamja') {
    font = 'gamja';
  } else {
    if (style.fontWeight == 'bold') {
      font = 'nanumB';
    } else if (style.fontWeight == 'light') {
      font = 'nanumL';
    } else {
      font = 'nanumR';
    }
  }
  return (
    <NativeText {...props} style={[props.style, {fontFamily: font, fontWeight: undefined}]} >{props.children}</NativeText>
  );
}

export function EditableText({label, value, onChangeText, keyboardType}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <View>
      {editMode?
        <PaperTextInput
          label={label}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onEndEditing={() => {
            Keyboard.dismiss;
            setEditMode(false);
          }}
        />:
        <Text>
          {value}
        </Text>
      }
      <IconButton
        icon="pencil"
        size={20}
        onPress={() => setEditMode(!editMode)}
      />
    </View>
  );
}

