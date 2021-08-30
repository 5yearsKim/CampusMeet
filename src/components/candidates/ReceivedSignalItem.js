import React, {useContext, useState} from 'react';
import {View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import Badge from 'src/blocks/Badge';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {Button} from 'react-native-paper';
import {KeyImage} from 'src/blocks/Image';
import {ThemeContext, UserContext} from 'src/context';
import {relativeTimePrettify} from 'src/utils/Time';
import {checkSignal} from 'src/utils/Signal';


function LeftContent({sender, navigation}) {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: sender.id})}>
      {sender.imageKeys.length > 0 ?
        <KeyImage
          imgKey={sender.imageKeys[0]}
          cached={true}
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


function ReceivedSignalItem({item, navigation, onReject, onMatch}) {
  const [matchAlertOpen, setMatchAlertOpen] = useState(false);
  const [rejectAlertOpen, setRejectAlertOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const {theme} = useContext(ThemeContext);
  const {refreshReceivedSignal, setRefreshReceivedSignal} = useContext(UserContext);
  const sender = item.sender;

  // console.log(item);

  const handleReject = () => onReject(item.id);
  const handleMatch = () => onMatch(item.id, sender.id);

  const onClick = async () => {
    if (!item.checked) {
      try {
        await checkSignal(item.id);
        setRefreshReceivedSignal(!refreshReceivedSignal);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // exception handle
  if (sender.imageKeys == null) {
    sender.imageKeys = [];
  }

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LeftContent sender={sender} navigation={navigation}/>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alighItems: 'center'}}>
              <Text style={[styles.titleText, {color: theme.text}]}>{sender.campus} {sender.division}</Text>
              {!item.checked && <Badge containerStyle={{margin: 5}}/>}
            </View>
            <Text style={[styles.subtitleText, {color: theme.subText}]}>{sender.graduate} {sender.year}학번</Text>
            <TouchableWithoutFeedback onPress={() => setShowMessage(!showMessage)}>
              <Text style={[styles.messageText]} numberOfLines={showMessage ? undefined : 5}>{item.message}</Text>
            </TouchableWithoutFeedback>
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
          onCancel={() => {}}
          onOk={() => handleMatch()}
        />
        <SimpleAlert
          modalOpen={rejectAlertOpen}
          setModalOpen={setRejectAlertOpen}
          title='거절'
          content='Signal을 거절하면 1달동안 같은 사람에게 Signal을 받을 수 없습니다.'
          onCancel={() => {}}
          onOk={() => handleReject()}
        />
      </View>
    </TouchableWithoutFeedback>
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
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: 5,
    // marginLeft: 70,
  },
  messageText: {
    marginTop: 10,
    fontSize: 14,
    marginLeft: 5,
    color: 'gray',
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
