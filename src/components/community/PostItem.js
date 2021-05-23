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
    return (
      <View>
      </View>
    );
  }
  return (
    <View style={styles.imageBackground}>
      <KeyImage imgKey={imageKeys[0]} cached={false}/>
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
            <FontAwesome name='picture-o' size={16} color='green'>
              {imgCount}
            </FontAwesome>
          </React.Fragment>
        }
        <FontAwesome name='thumbs-o-up' size={16} color='blue'>
          {likes.length}
        </FontAwesome>
        <FontAwesome name='comments-o' size={16} color='red'>
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
        <View style={styles.imageWrapper}>
          <View style={styles.textWrapper}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.title, {color: theme.text}]}>{item.title}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.content, {color: theme.subText}]}>{item.content}</Text>
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
    height: 60,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flex: 1,
  },
  imageBackground: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 3,
    margin: 3,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 13,
  },
  image: {
    width: 80,
    height: 60,
  },
  belowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
