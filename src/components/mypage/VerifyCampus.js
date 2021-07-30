import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {TextInput, Button} from 'react-native-paper';
import {MyContext} from 'src/context';


export default function VerifyCampus() {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [sentAlertOpen, setSentAlertOpen] = useState(false);

  const onButtonPress = () => {
    if (step == 1) {
      setStep(step + 1);
    } else if (step == 2) {
      setStep(step + 1);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.notiBox}>
        <Text style={styles.titleText}>학교 메일을 인증해주세요!</Text>
        <Text style={styles.contentText}>학교 메일을 통해 다른 사용자에게 내가 다니는 캠퍼스를 인증할 수 있어요.</Text>
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
        <View style={{paddingTop: 10}}>
          <Text style={styles.sentText}>메일로 인증코드가 전송되었습니다.</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              label='메일 인증 코드'
              style={[styles.textInput, {flex: 1}]}
              value={code}
              autoCapitalize='none'
              keyboardType='numeric'
              left={<TextInput.Icon name='email-check'/>}
              onChangeText={(text) => setCode(text)}
            />
            <Button
              compact
              onPress={() => setSentAlertOpen(true)}
            >
              재전송
            </Button>
          </View>
        </View>
      }
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode='contained'
          style={{flex: 1, marginTop: 10}}
          labelStyle={{color: 'white'}}
          onPress={onButtonPress}
        >
          {step == 1 ?
            '메일 인증':
            '제출하기'
          }
        </Button>
      </View>
      <SimpleAlert
        modalOpen={sentAlertOpen}
        setModalOpen={setSentAlertOpen}
        title='인증 메일이 전송되었습니다'
        content='메일을 확인해주세요.'
        onOk={() => {}}
      />
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
