import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import {Text as PaperText} from 'react-native-paper';
import {IconButton, TextInput} from 'react-native-paper';

export default function Text(props) {
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
    <PaperText {...props} style={[props.style, {fontFamily: font, fontWeight: undefined}]} >{props.children}</PaperText>
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
