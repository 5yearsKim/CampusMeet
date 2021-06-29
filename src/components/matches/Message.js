import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {strTime2Min, strTime2Date} from 'src/utils/Time';
import {KeyImage} from 'src/blocks/Image';
import {TextMessage, GifMessage, ImageMessage, AdminMessage} from './MessageCategory';
import {MyContext} from 'src/context';

function LeftContent({user, showTime, navigation}) {
  if (!user) {
    return <View></View>;
  }
  // console.log(user);
  return (
    <View style={styles.leftContainer}>
      {showTime &&
      <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: user.id})}>
        {user.imageKeys.length > 0 ?
          <KeyImage
            imgKey={user.imageKeys[0]}
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
      }
    </View>
  );
}

function Message({item, showTime, showDate, navigation}) {
  const auth = useContext(MyContext);
  const isMyMessage = (item.userID == auth.user.attributes.sub);
  if (item == 'undefined') {
    return (
      <View></View>
    );
  }
  const messageContent = (type, content) => {
    if (type == 'text') {
      return (
        <TextMessage text={content} isMyMessage={isMyMessage}/>
      );
    } else if (type == 'gif') {
      return (
        <GifMessage gifUrl={content} isMyMessage={isMyMessage}/>
      );
    } else if (type == 'image') {
      return (
        <ImageMessage imageKey={content} isMyMessage={isMyMessage}/>
      );
    }
  };
  const renderDate = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.date}>{strTime2Date(item.createdAt)}</Text>
      </View>
    );
  };
  if (item.type == 'admin') {
    return (
      <View>
        {showDate && renderDate()}
        <AdminMessage content={item.content}/>
      </View>
    );
  }
  return (
    <View>
      {showDate && renderDate()}
      <View style={[
        styles.container, {
          flexDirection: isMyMessage?'row-reverse': 'row',
        },
      ]}>
        {!isMyMessage && <LeftContent user={item.user} showTime={showTime} navigation={navigation}/>}
        {messageContent(item.type, item.content)}
        {showTime && <Text style={styles.time}>{strTime2Min(item.createdAt)}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    height: 45,
    width: 45,
  },
  avatar: {
    margin: 2,
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  container: {
    padding: 2,
    alignItems: 'flex-end',
  },
  time: {
    color: 'black',
    margin: 5,
  },
  date: {
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#BFEEEE',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default Message;
