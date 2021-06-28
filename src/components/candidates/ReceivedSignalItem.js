import React, {useContext, useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
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
          source={require('assets/images/no_profile3.png')}
          style={[styles.avatar, {borderColor: sender.gender=='남자'?theme.men:theme.women}]}
        />
      }
    </TouchableOpacity>
  );
}


function ReceivedSignalItem({item, navigation}) {
  const [matchAlertOpen, setMatchAlertOpen] = useState(false);
  const [rejectAlertOpen, setRejectAlertOpen] = useState(false);
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const sender = item.sender;

  // exception handle
  if (sender.imageKeys == null) {
    sender.imageKeys = [];
  }
  // console.log(item);

  const onReject = () => {
    try {
      rejectSignal(item.id);
      item.alive = false;
    } catch (err) {
      console.warn(err);
    }
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
            onPress={() => setRejectAlertOpen(true)}
            labelStyle={styles.buttonText}
          >
            거절
          </Button>
          <Button
            onPress={() => setMatchAlertOpen(true)}
            labelStyle={styles.buttonText}
          >
            수락
          </Button>
        </View>
      </View>
      <SimpleAlert
        modalOpen={matchAlertOpen}
        setModalOpen={setMatchAlertOpen}
        title='Match!'
        content='Match가 되면 상대가 나를 확인할 수 있고 서로 쪽지를 보낼 수 있습니다.'
        onCancel={() => setMatchAlertOpen(false)}
        onOk={() => onMatch()}
      />
      <SimpleAlert
        modalOpen={rejectAlertOpen}
        setModalOpen={setRejectAlertOpen}
        title='거절'
        content='Signal을 거절하면 1달동안 같은 사람에게 Signal을 받을 수 없습니다.'
        onCancel={() => setRejectAlertOpen(false)}
        onOk={() => onReject()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    margin: 15,
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 3,
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
