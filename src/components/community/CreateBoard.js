import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Text from 'src/blocks/Text';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {makeBoard} from 'src/utils/Community';
import {MyContext} from 'src/context';
import config from 'src/config';

const boardOptions = config.community.boardOptions;

function CreateBoard({navigation}) {
  const auth = useContext(MyContext);
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [optionIndex, setOptionIndex] = useState(0);

  const checkFormat = () => {
    if (boardName == '') {
      return '이름을 입력해 주세요.';
    }
    if (boardDescription == '') {
      return '설명을 입력해 주세요.';
    }
    return false;
  };

  const onSubmit = () => {
    const errMsg = checkFormat();
    if (errMsg) {
      Alert.alert(
          'alert',
          errMsg,
          [
            {text: 'OK', onPress: () => console.log('pressed ok')},
          ],
      );
    } else {
      const userSub = auth.user.sub;
      makeBoard(userSub, boardName, boardDescription, boardOptions[optionIndex]);
      navigation.goBack();
    }
  };

  return (
    <View>
      <TextInput
        label='이름'
        value={boardName}
        onChangeText={(text) => setBoardName(text)}
      />
      <TextInput
        label='설명'
        value={boardDescription}
        onChangeText={(text) => setBoardDescription(text)}
      />
      <View style={styles.radioContainer}>
        <RadioButton
          value={boardOptions[0]}
          status={optionIndex == 0 ? 'checked': 'unchecked'}
          onPress={() => setOptionIndex(0)}
        />
        <Text>{boardOptions[0]}</Text>
        <RadioButton
          value={boardOptions[1]}
          status={optionIndex == 1? 'checked': 'unchecked'}
          onPress={() => setOptionIndex(1)}
        />
        <Text>{boardOptions[1]}</Text>
      </View>
      <Button
        mode='outlined'
        onPress={onSubmit}
      >
        완료
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    borderWidth: 1,
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
});

export default CreateBoard;
