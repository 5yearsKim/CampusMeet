import React, {useState} from 'react';
import {View, Dimensions, Text, Image, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Dialog from './Dialog';

const {width} = Dimensions.get('window')

export default function Agreement({visible, onDismiss, onOk}) {
  const [valid, setValid] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <Dialog visible={visible} onDismiss={onDismiss} width={width*0.8}>
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
          <View style={styles.termBox}>
            <Text>캠퍼스밋 이용약관 동의(필수)</Text>
            <Checkbox
              status={}
            />
          </View>
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
  termBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notiText: {
    color: '#aaaaaa',
    padding: 10,
    textAlign: 'center',
  },
})