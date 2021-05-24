import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {Nickname} from 'src/blocks/Board';
import {relativeTimePrettify} from 'src/utils/Time';
import {FontAwesome} from '@expo/vector-icons';
import {ThemeContext} from 'src/context';


function ImgPreview({imageKeys}) {
  if (imageKeys.length == 0) {
    return null;
  }
  return (
    <View style={{height: 60, justifyContent: 'center', alignItem: 'center'}}>
      <KeyImage style={styles.image} imgKey={imageKeys[0]} cached={false}/>
    </View>
  );
}


function BelowContent({type, createdAt, comments, likes, nickname, imageKeys}) {
  // console.log(comments, createdAt, like, nickname, imageKeys);
  const {theme} = useContext(ThemeContext);
  const imgCount = imageKeys.length;
  const commentCount = comments.length;
  const visTime = relativeTimePrettify(createdAt);
  return (
    <View style={styles.belowContainer}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.time, {color: theme.subText}]}>{visTime}  </Text>
        <Nickname type={type} nickname={nickname} style={styles.nickname}/>
      </View>
      <View style={styles.iconList}>
        {imgCount > 0 &&
          <React.Fragment>
            <FontAwesome style={styles.icon} name='picture-o' size={16} color='green'>
              {imgCount}
            </FontAwesome>
          </React.Fragment>
        }
        <FontAwesome style={styles.icon} name='thumbs-o-up' size={16} color='blue'>
          {likes.length}
        </FontAwesome>
        <FontAwesome style={styles.icon} name='comments-o' size={16} color='red'>
          {commentCount}
        </FontAwesome>
      </View>
    </View>
  );
}

function PostItem({item, board, navigation}) {
  const {theme} = useContext(ThemeContext);
  const onClickItem = () => {
    navigation.navigate('Post', {
      board: board,
      post: item,
    });
  };
  if (item.deleted == true) {
    return <View></View>;
  }
  return (
    <View style={[styles.container, {borderColor: theme.subText}]}>
      <TouchableOpacity
        onPress={() => onClickItem()}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.titleText, {color: theme.text}]}>{item.title}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.contentText, {color: theme.subText}]}>{item.content}</Text>
            <BelowContent type={board.type} createdAt={item.createdAt} likes={item.likes.items} nickname={item.nickname} comments={item.comments.items} imageKeys={item.imageKeys}/>
          </View>
          <ImgPreview imageKeys={item.imageKeys}/>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    padding: 5,
    borderBottomWidth: 1,
  },
  icon: {
    margin: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 2,
  },
  contentText: {
    fontSize: 13,
    margin: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  belowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
  },
  iconList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nickname: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
});

export default PostItem;
