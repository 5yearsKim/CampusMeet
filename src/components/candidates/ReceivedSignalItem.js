import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {KeyImage} from 'src/blocks/Image';
import {MyContext, ThemeContext} from 'src/context';
import {makeMatch} from 'src/utils/Match';
import {removeSignal, rejectSignal} from 'src/utils/Signal';
import {relativeTimePrettify} from 'src/utils/Time';

function LeftContent({sender, navigation}) {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: sender.id})}>
      {sender.imageKeys.length > 0 ?
        <KeyImage
          imgKey={sender.imageKeys[0]}
          cached={false}
          resizemode='contain'
          style={[styles.avatar, {borderColor: sender.gender=='남자'?theme.men:theme.women}]}
        /> :
        <Image
          source={require('src/assets/images/no_profile3.png')}
          style={[styles.avatar, {borderColor: sender.gender=='남자'?theme.men:theme.women}]}
        />
      }
    </TouchableOpacity>
  );
}


function ReceivedSignalItem({item, navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const sender = item.sender;

  // exception handle
  if (sender.imageKeys == null) {
    sender.imageKeys = [];
  }
  // console.log(item);

  const alertReject = () => {
    Alert.alert(
        '거절',
        'Signal을 거절하면 1달동안 동일인에게 Signal을 받을 수 없습니다.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => onReject()},
        ],
    );
  };
  const onReject = () => {
    try {
      rejectSignal(item.id);
      item.alive = false;
    } catch (err) {
      console.warn(err);
    }
  };

  const alertMatch = () => {
    Alert.alert(
        'Match',
        'Match가 되면 상대가 나를 확인할 수 있고 채팅방이 개설됩니다.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => onMatch()},
        ],
    );
  };
  const onMatch = () => {
    try {
      makeMatch(userSub, sender.id);
      removeSignal(item.id);
    } catch (err) {
      console.warn(err);
    }
  };
  if (sender == null || item.alive == false) {
    return (
      <View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <LeftContent sender={sender} navigation={navigation}/>
        <View>
          <Text style={[styles.titleText, {color: theme.text}]}>{sender.campus} {sender.graduate}</Text>
          <Text style={[styles.subtitleText, {color: theme.subText}]}>{sender.division} {sender.year}학번</Text>
          <Text style={[styles.messageText, {color: theme.subText}]}>{item.message}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={[styles.timeText, {color: theme.subText}]}>{relativeTimePrettify(item.createdAt, 'week')}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => alertReject()}
            labelStyle={styles.buttonText}
          >
            거절
          </Button>
          <Button
            onPress={() => alertMatch()}
            // labelStyle={styles.buttonText}
          >
            Match!
          </Button>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    margin: 15,
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 5,
  },
  container: {
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  messageText: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#444444',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginLeft: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ReceivedSignalItem;
