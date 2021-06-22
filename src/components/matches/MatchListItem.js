import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {absoluteTimePrettify} from 'src/utils/Time';
import {KeyImage} from 'src/blocks/Image';
import {ThemeContext} from 'src/context';

function LeftContent({navigation, matcher}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: matcher.id})}>
      {matcher.imageKeys.length > 0 ?
        <KeyImage
          imgKey={matcher.imageKeys[0]}
          cached={false}
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


function MatchListItem({item, navigation}) {
  const matcher = item.matcher;
  const chatRoom = item.chatRoom;
  const {theme} = useContext(ThemeContext);
  // console.log(item);
  const onClickItem = () => {
    navigation.push('ChatRoom', {
      chatRoomID: item.chatRoomID,
      name: matcher.name,
    });
  };
  if (matcher == null ) {
    return <Text> null </Text>;
  }
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
    return <Text style={[styles.messageText, {color: theme.subText}]}>{content}</Text>;
  };
  return (
    <TouchableOpacity onPress={() => onClickItem()}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LeftContent matcher={item.matcher} navigation={navigation}/>
          <View style={styles.textWrapper}>
            <Text style={[styles.nameText, {color: theme.text}]}>{matcher.name}</Text>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
              {lastMessage()}
              <Text style={[styles.timeText, {color: theme.subText}]}>{absoluteTimePrettify(chatRoom.lastMessage.createdAt)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  timeText: {
    fontSize: 12,
    marginRight: 5,
  },
});
export default MatchListItem;
