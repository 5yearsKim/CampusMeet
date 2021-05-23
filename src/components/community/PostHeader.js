import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, Alert, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {makeLikePost} from 'src/utils/Community';
import {absoluteTime} from 'src/utils/Time';
import {AntDesign} from '@expo/vector-icons';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer} from 'src/blocks/ImageViewer';
import {MyContext, ThemeContext} from 'src/context';


function PostHeader({post, board}) {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(0);
  const likeList = post.likes.items.map((item) => item.userID);
  const userSub = auth.user.attributes.sub;
  const visTime = absoluteTime(post.createdAt);

  useEffect(() => {
    setLikeCnt(post.likes.items.length);
    if (likeList.includes(userSub)) {
      setIsLike(true);
    }
  }, []);

  const modalSwitch = () => {
    setModalVisible(!modalVisible);
  };

  const renderImage = ({item, index}) => {
    return (
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => {
          setPage(index);
          setModalVisible(true);
        }}>
          <KeyImage imgKey={item} style={styles.image} cached={false}/>
        </TouchableOpacity>
      </View>
    );
  };

  const alreadyLikeAlert = () => {
    Alert.alert(
        '알림',
        '이미 좋아한 게시글입니다.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
    );
  };
  const onClickLike = async () => {
    if (isLike) {
      alreadyLikeAlert();
    } else {
      const likeData = await makeLikePost(userSub, post.id);
      if (likeData) {
        setIsLike(true);
        setLikeCnt(likeCnt + 1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, {color: theme.text}]}>{post.title}</Text>
      <Text style={[styles.timeText, {color: theme.subText}]}>{visTime}</Text>
      <Text style={[styles.contentText, {color: theme.subText}]}>{post.content}</Text>
      <Button icon={() => <AntDesign name='like2'/>} mode='outlined' onPress={onClickLike} style={styles.like}>
        {likeCnt}
      </Button>
      {post.imageKeys.length > 0 && (
        <View>
          <FlatList
            data={post.imageKeys}
            renderItem={renderImage}
            keyExtractor={(item) => item}
            horizontal
          />
          <Modal visible={modalVisible}>
            <ImageViewer imageKeys={post.imageKeys} page={page} modalSwitch={modalSwitch}/>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  like: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    width: 150,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 13,
  },
  contentText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 14,
  },
});
export default PostHeader;
