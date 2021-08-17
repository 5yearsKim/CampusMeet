import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import Dialog from './Dialog';
import config from 'src/config';
import {termsOfService, privacyPolicy} from 'assets/policy';

const {width, height} = Dimensions.get('window');

export default function Agreement({visible, onDismiss, onOk}) {
  const [valid, setValid] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    checkValid();
  }, [agreeService, agreePrivacy]);

  const agreeAll = () => {
    if (valid) {
      setAgreePrivacy(false);
      setAgreeService(false);
    } else {
      setAgreePrivacy(true);
      setAgreeService(true);
    }
  };

  const checkValid = () => {
    if (agreeService & agreePrivacy) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss} width={width*0.85}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('assets/images/no-background-logo.png')}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.notiText}>서비스 이용을 위한 최초 1회 동의와 개인정보 수집에 대한 동의가 필요합니다.</Text>
        <View>
          <View style={styles.listBox}>
            <Text style={styles.listText}>이용약관, 개인정보 수집에 모두 동의</Text>
            <Checkbox.Android
              status={valid ? 'checked' : 'unchecked'}
              onPress={() => agreeAll()}
              color={config.colors.main.primary}
            />
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={styles.listBox}>
            <Text style={styles.listText}>캠퍼스밋 이용약관 동의(필수)</Text>
            <Checkbox.Android
              status={agreeService ? 'checked' : 'unchecked'}
              onPress={() => setAgreeService(!agreeService)}
              color={config.colors.main.primary}
            />
          </View>
          <View style={styles.termBox}>
            <ScrollView>
              <View onStartShouldSetResponder={() => true}>
                <Text>{termsOfService}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.listBox}>
            <Text style={styles.listText}>캠퍼스밋 개인정보 수집 동의(필수)</Text>
            <Checkbox.Android
              status={agreePrivacy ? 'checked' : 'unchecked'}
              onPress={() => setAgreePrivacy(!agreePrivacy)}
              color={config.colors.main.primary}
            />
          </View>
          <View style={styles.termBox}>
            <ScrollView>
              <View onStartShouldSetResponder={() => true}>
                <Text>{privacyPolicy}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            mode='outlined'
            style={styles.buttonBox}
            onPress={onDismiss}
          >
            동의 안함
          </Button>
          <Button
            mode='contained'
            style={styles.buttonBox}
            labelStyle={{color: 'white'}}
            disabled={!valid}
            onPress={() => {
              onDismiss();
              onOk();
            }}
          >
            동의
          </Button>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  logo: {
    height: 80,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 10,
  },
  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termBox: {
    padding: 3,
    height: height * 0.15,
    backgroundColor: '#dddddd',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonBox: {
    width: width*0.3,
    margin: 5,
  },
  notiText: {
    color: '#aaaaaa',
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  listText: {
    fontSize: 15,
  },
});
