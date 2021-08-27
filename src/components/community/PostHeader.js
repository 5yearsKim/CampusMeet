import React, {useState, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Modal, StyleSheet, Platform} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Nickname} from 'src/blocks/Board';
import Dialog from 'src/blocks/Dialog';
import ReportDialog from 'src/blocks/ReportDialog';
import {Button} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer, ImageSwipeOff} from 'src/blocks/ImageViewer';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {absoluteTime} from 'src/utils/Time';
import {makeLikePost, deletePost, makeBlock} from 'src/utils/Community';


function PostHeader({post, board, navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyLikeOpen, setAlreadyLikeOpen] = useState(false);
  const [page, setPage] = useState(0);
  const visTime = absoluteTime(post.createdAt);
  const likeList = post.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(likeList.includes(userSub));
  const [likeCnt, setLikeCnt] = useState(post.likes.items.length);
  const {refreshBoard, setRefreshBoard} = useContext(UserContext);


  const renderImage = ({item, index}) => {
    return (
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => {
          setPage(index);
          setModalVisible(true);
        }}>
          <KeyImage imgKey={item} style={styles.image} cached={true}/>
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

  const renderMenu = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [hideOpen, setHideOpen] = useState(false);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [menuShow, setMenuShow] = useState(false);

    const [abusiveUserOpen, setAbusiveUserOpen] = useState(false);

    const onDeletePost = async () => {
      try {
        await deletePost(post.id);
        setRefreshBoard(!refreshBoard);
        navigation.goBack();
      } catch (err) {
        console.warn(err);
      }
    };
    const onHidePost = async () => {
      try {
        await makeBlock(userSub, post.id, 'Post');
        setRefreshBoard(!refreshBoard);
        navigation.goBack();
      } catch (err) {
        console.warn(err);
      }
    };
    return (
      <View>
        <TouchableOpacity onPress={() => setMenuShow(true)}>
          <View style={{margin: 1}}>
            <MaterialCommunityIcons name='dots-vertical' size={25} color='black'/>
          </View>
        </TouchableOpacity>
        <Dialog visible={menuShow} onDismiss={() => setMenuShow(false)}>
          {userSub == post.userID ?
              <TouchableOpacity onPress={() => {
                setMenuShow(false);
                setDeleteOpen(true);
              }}>
                <Text style={styles.menuText}>게시글 삭제</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => {
                setMenuShow(false);
                setHideOpen(true);
              }}>
                <Text style={styles.menuText}>게시글 숨기기</Text>
              </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => {
            setReportDialogOpen(true);
            setMenuShow(false);
          }}>
            <Text style={styles.menuText}>게시글 신고</Text>
          </TouchableOpacity>
          {Platform.OS == 'ios' &&
            <TouchableOpacity onPress={() => {
              setAbusiveUserOpen(true);
              setMenuShow(false);
            }}>
              <Text style={styles.menuText}>작성자 글 차단</Text>
            </TouchableOpacity>
          }
        </Dialog>
        <ReportDialog
          visible={reportDialogOpen}
          onDismiss={() => setReportDialogOpen(false)}
          objectID={post.id}
          userID={post.userID}
          type='Post'
        />
        <SimpleAlert
          modalOpen={deleteOpen}
          setModalOpen={setDeleteOpen}
          title='게시글을 삭제'
          content='게시글을 삭제하면 게시판에 노출되지 않습니다.'
          onCancel={() => {}}
          onOk={async () => await onDeletePost()}
        />
        <SimpleAlert
          modalOpen={hideOpen}
          setModalOpen={setHideOpen}
          title='게시글 숨기기'
          content='게시글 숨기기를 적용될 시 더 이상 게시글이 게시판에 노출되지 않습니다.'
          onCancel={() => {}}
          onOk={async () => await onHidePost()}
        />
        <SimpleAlert
          modalOpen={abusiveUserOpen}
          setModalOpen={setAbusiveUserOpen}
          title='작성자 글 차단'
          content='작성자 글 차단이 적용될 시 해당 작성자의 게시글이 게시판에 노출되지 않습니다.'
          onCancel={() => {}}
          onOk={async () => await onHidePost()}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={[styles.titleText, {color: theme.text}]}>{post.title}</Text>
        {renderMenu()}
      </View>
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
          <ImageSwipeOff setModalVisible={setModalVisible}>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
              <ImageViewer imageKeys={post.imageKeys} page={page}/>
            </Modal>
          </ImageSwipeOff>
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
    margin: 15,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 10,
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
  menuText: {
    padding: 8,
    fontSize: 15,
  },
});
export default PostHeader;
