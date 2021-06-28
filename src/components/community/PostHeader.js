import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Nickname} from 'src/blocks/Board';
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
  const [alertOpen, setAlertOpen] = useState(false);
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

  const onClickLike = async () => {
    if (isLike) {
      setAlertOpen(true);
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
        <Nickname type={board.type} nickname={post.nickname} userID={userSub} style={styles.nicknameText}/>
        <Text style={[styles.timeText, {color: theme.subText}]}>{visTime}</Text>
      </View>
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
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='알림'
        content='이미 좋아한 게시글입니다.'
        onOk={() => setAlertOpen(false)}
      />
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
    fontSize: 12,
  },
  nicknameText: {
    fontSize: 12,
  },
  contentText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
  },
});
export default PostHeader;
