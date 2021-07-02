import React, {useState, useContext} from 'react';
import {Dimensions, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Portal, Dialog} from 'react-native-paper';
import Text from 'src/blocks/Text';
import Badge from 'src/blocks/Badge';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {relativeTimePrettify} from 'src/utils/Time';
import {modifyMatch} from 'src/utils/Match';
import {KeyImage} from 'src/blocks/Image';
import {MyContext, ThemeContext, UserContext} from 'src/context';

const {width, height} = Dimensions.get('window');

function LeftContent({navigation, matcher}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: matcher.id})}>
      {matcher.imageKeys.length > 0 ?
        <KeyImage
          imgKey={matcher.imageKeys[0]}
          cached={true}
          resizemode='contain'
          style={styles.avatar}
        /> :
        <Image
          source={require('assets/images/no_profile3.png')}
          style={styles.avatar}
        />
      }
    </TouchableOpacity>
  );
}


function MatchListItem({item, navigation, deleteMatch}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const [menuShow, setMenuShow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const matcher = item.matcher;
  const chatRoom = item.chatRoom;
  const {refreshMatch, setRefreshMatch} = useContext(UserContext);
  // console.log(item);

  const lastMsg = item.chatRoom.lastMessage;

  const isChecked = item.checked;
  const isNew = (lastMsg.userID != userSub) && lastMsg.type != 'admin' && !lastMsg.checked;

  const onClickItem = async () => {
    if (!isChecked) {
      try {
        await modifyMatch(item.id, {checked: true});
        setRefreshMatch(!refreshMatch);
      } catch (err) {
        console.warn(err);
      }
    }
    navigation.push('ChatRoom', {
      chatRoomID: item.chatRoomID,
      name: matcher.name,
    });
  };

  const onDeleteItem = () => {
    deleteMatch(item.id);
  };

  const lastMessage = () => {
    const message = chatRoom.lastMessage;
    let content = '';
    if (message.type == 'image') {
      content = 'Image';
    } else if (message.type == 'gif') {
      content = 'GIF';
    } else {
      content = message.content;
    }
    return <Text ellipsizeMode='tail' numberOfLines={3} style={[styles.messageText, {color: theme.subText}]}>{content}</Text>;
  };

  if (matcher == null ) {
    return <Text> null </Text>;
  }
  const renderBadge = () => {
    if (!isChecked) {
      return <Badge content='New!' containerStyle={{backgroundColor: '#eedd00'}}/>;
    } else if (isNew) {
      return <Badge/>;
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => onClickItem()} onLongPress={() => setMenuShow(true)}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <LeftContent matcher={item.matcher} navigation={navigation}/>
            <View style={styles.textWrapper}>
              <Text style={[styles.nameText, {color: theme.text}]}>{matcher.name}</Text>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                {lastMessage()}
                <View style={{flexDirection: 'row'}}>
                  {renderBadge()}
                  <Text style={[styles.timeText, {color: theme.subText}]}>{relativeTimePrettify(chatRoom.lastMessage.createdAt, 'week')}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={menuShow} onDismiss={() => setMenuShow(false)}>
          <Dialog.Content>
            <TouchableOpacity onPress={() => setDeleteAlert(true)}>
              <Text style={styles.menuText}>매칭 삭제</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <SimpleAlert
        modalOpen={deleteAlert}
        setModalOpen={setDeleteAlert}
        title='매칭을 삭제하시겠습니까?'
        content='매칭을 삭제하면 더 이상 쪽지를 보낼 수 없습니다.'
        onCancel={() => setMenuShow(false)}
        onOk={() => {
          setMenuShow(false);
          onDeleteItem();
        }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textWrapper: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
  messageText: {
    fontSize: 13,
    marginLeft: 5,
    maxWidth: width - 200,
  },
  timeText: {
    fontSize: 12,
    marginRight: 8,
    marginLeft: 8,
  },
  menuText: {
    color: 'black',
  },
});
export default MatchListItem;
