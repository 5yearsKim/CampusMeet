import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {TextInput, Button} from 'react-native-paper';
import {MyContext} from 'src/context';


export default function VerifyCampus() {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(2);
  const [sentMsg, setSentMsg] = useState('메일로 인증코드가 전송되었습니다. 인증해주세요');

  const renderButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.notiBox}>
        <Text style={styles.titleText}>학교 메일을 인증해주세요!</Text>
        <Text style={styles.contentText}>다른 사용자에게 내가 다니는 캠퍼스를 인증할 수 있어요. 학교 메일을 통해 인증할 수 있어요.</Text>
      </View>
      <TextInput
        label='학교 인증 메일'
        style={styles.textInput}
        value={email}
        autoCapitalize='none'
        left={<TextInput.Icon name='email'/>}
        onChangeText={(text) => setEmail(text)}
      />
      {step == 2 &&
        <View>
          <Text style={styles.sentText}>{sentMsg}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              label='메일 인증 코드'
              style={styles.textInput}
              value={code}
              autoCapitalize='none'
              keyboardType='numeric'
              left={<TextInput.Icon name='email-check'/>}
              onChangeText={(text) => setCode(text)}
            />
            <Button>재전송</Button>
          </View>
        </View>
      }
      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  notiBox: {
    backgroundColor: '#eeeecc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 15,
  },
  sentText: {
    fontSize: 14,
    color: 'blue',
  }
});
