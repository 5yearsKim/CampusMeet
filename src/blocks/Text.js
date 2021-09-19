import React, {useState, useContext} from 'react';
import {ThemeContext} from 'src/context';
import {View, Keyboard} from 'react-native';
import {Text as PaperText} from 'react-native-paper';
import {IconButton, TextInput} from 'react-native-paper';

export default function Text(props) {
  const fontType = useContext(ThemeContext).font;
  let style = props.style ? props.style : {};
  const tmpstyle = {};

  const list2style = (list) => {
    for (let i = 0; i < list.length; i++) {
      const st = list[i];
      if (Array.isArray(st)) {
        list2style(st);
      } else {
        Object.assign(tmpstyle, st);
      }
    }
  };
  if (Array.isArray(style)) {
    list2style(style);
    style = tmpstyle;
  }

  let fontSize = style.fontSize ? style.fontSize : 15;
  const type = props.font ? props.font : (fontType ? fontType : 'nanum');
  let font = 'nanumR';
  if (type == 'nanum') {
    if (style.fontWeight == 'bold') {
      font = 'nanumB';
    } else {
      font = 'nanumR';
    }
  } else if (type == 'cute') {
    if (style.fontWeight == 'bold') {
      fontSize += 2;
    }
    font = 'penR';
  } else if (type == 'surround') {
    font = style.fontWeight == 'bold' ? 'surroundB' : 'surroundR';
  }
  // style['fontFamily'] = font
  // style.fontWeight = undefined
  return (
    <PaperText {...props} style={[
      style,
      {fontFamily: font, fontWeight: undefined, fontSize: fontSize, letterSpacing: 0.3, lineHeight: fontSize + 5}
    ]}>
      {props.children}
    </PaperText>
  );
}

export function EditableText({label, value, onChangeText, keyboardType}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <View style={styles.container}>
      {editMode?
        <TextInput
          label={label}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onEndEditing={() => {
            Keyboard.dismiss;
            setEditMode(false);
          }}
          style={{backgroundColor: 'transparent'}}
        />:
        <Text style={styles.text}>{value}</Text>
      }
      <IconButton
        icon="pencil"
        size={20}
        onPress={() => {
          setEditMode(!editMode);
        }}
      />
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
};
