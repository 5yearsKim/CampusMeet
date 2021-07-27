import React, {useState, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Nickname} from 'src/blocks/Board';
import {Button} from 'react-native-paper';
import {makeLikePost, deletePost} from 'src/utils/Community';
import {absoluteTime} from 'src/utils/Time';
import {AntDesign} from '@expo/vector-icons';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer} from 'src/blocks/ImageViewer';
import {MyContext, ThemeContext} from 'src/context';


function PostHeader({post, board, navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyLikeOpen, setAlreadyLikeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(0);
  const visTime = absoluteTime(post.createdAt);
  const likeList = post.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(likeList.includes(userSub));
  const [likeCnt, setLikeCnt] = useState(post.likes.items.length);

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
      setAlreadyLikeOpen(true);
    } else {
      try {
        await makeLikePost(userSub, post.id);
        setIsLike(true);
        setLikeCnt(likeCnt + 1);
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const onDeletePost = async () => {
    try {
      await deletePost(post.id);
      navigation.goBack();
    } catch (err) {
      console.warn(err);
    }
  };

  const renderDelete = () => {
    if (userSub != post.userID) {
      return null;
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => setDeleteOpen(true)}>
          <Text style={styles.deleteText}>게시글 삭제</Text>
        </TouchableOpacity>
        <SimpleAlert
          modalOpen={deleteOpen}
          setModalOpen={setDeleteOpen}
          title='게시글을 삭제하시겠습니까?'
          content='게시글을 삭제하면 게시판에 노출되지 않습니다.'
          onCancel={() => {}}
          onOk={() => onDeletePost()}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, {color: theme.text}]}>{post.title}</Text>
      {renderDelete()}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
        <Nickname type={board.type} nickname={post.nickname} userID={userSub} style={styles.nicknameText}/>
        <Text style={[styles.timeText, {color: theme.subText}]}>{visTime}</Text>
      </View>
      <Text style={[styles.contentText, {color: theme.subText}]}>{post.content}</Text>
      <Button
        icon={() => <AntDesign name='like2' size={15}/>}
        mode='outlined'
        onPress={onClickLike}
        style={styles.like}
      >
        {String(likeCnt)}
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
        modalOpen={alreadyLikeOpen}
        setModalOpen={setAlreadyLikeOpen}
        title='알림'
        content='이미 좋아한 게시글입니다.'
        onOk={() => {}}
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
    minHeight: 30,
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
  deleteText: {
    color: '#aaaaaa',
  },
});
export default PostHeader;
