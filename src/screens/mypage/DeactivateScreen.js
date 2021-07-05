import React, {useEffect, useContext} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Text from 'src/blocks/Text';
import {MyContext} from 'src/context';
import AuthBackground from 'src/blocks/AuthBackground';
import {modifyUser} from 'src/utils/User';

const {width, height} = Dimensions.get('window');

export default function DeactivateScreen({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type == 'RESET') {
        // console.log(e.data.action);
        return;
      }
      // console.log(e.data.action.type);
      e.preventDefault();
    });
    return unsubscribe;
  }, []);

  const activate = async () => {
    try {
      await modifyUser(userSub, {status: 'active'});
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <AuthBackground/>
      <View style={styles.box}>
        <Text style={styles.titleText}>휴면계정</Text>
        <Text style={styles.subtitleText}>다시 서비스를 이용하시려면 휴면계정을 해지해주세요.</Text>
        <Button
          onPress={() => activate()}
        >
          휴면해지하기
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.8,
    padding: 20,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitleText: {
    fontSize: 16,
  },
});
