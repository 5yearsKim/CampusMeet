import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import Dialog from 'src/blocks/Dialog';
import ReportDialog from 'src/blocks/ReportDialog';
import {Nickname} from 'src/blocks/Board';
import {AntDesign} from '@expo/vector-icons';
import {makeLikeComment, deleteComment, makeBlock} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import NestedComment from './NestedComment';
import {MyContext, ChatContext, ThemeContext} from 'src/context';

function Comment({item, index, board, focusComment, refresh}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const nested = useContext(ChatContext);
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [alreadyLikeOpen, setAlreadyLikeOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isHide, setIsHide] = useState(false);
  // console.log('board ', board) ;

  const nestedComments = item.nestedComments.items.filter((item) => item.isHide !== true);

  useEffect(() => {
    setLikeCnt(likeList.length);
    setIsLike(likeList.includes(userSub));
  }, []);

  useEffect(() => {
    if (item.isHide) {
      setIsHide(true);
    }
  }, []);


  const onClickLike = async () => {
    if (isLike) {
      setAlreadyLikeOpen(true);
    } else {
      const likeData = await makeLikeComment(userSub, item.id);
      if (likeData) {
        setIsLike(true);
        setLikeCnt(likeCnt + 1);
      }
    }
  };
  const onHideComment = async () => {
    try {
      await makeBlock(userSub, item.id, 'Comment');
      setIsHide(true);
    } catch (err) {
      console.warn(err);
    }
  };

  const onDeleteComment = async () => {
    try {
      await deleteComment(item.id);
      refresh();
    } catch (err) {
      console.warn(err);
    }
  };

  const renderDelete = () => {
    if (userSub != item.userID) {
      return null;
    }
    if (item.nestedComments.items.length > 0) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity onPress={() => setDeleteOpen(true)}>
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
        <SimpleAlert
          modalOpen={deleteOpen}
          setModalOpen={setDeleteOpen}
          title='댓글을 삭제하시겠습니까?'
          content='댓글이 게시글로부터 삭제됩니다.'
          onCancel={() => {}}
          onOk={() => onDeleteComment()}
        />
      </View>
    );
  };

  const renderNestedComment = () => {
    return (
      <FlatList
        data={nestedComments}
        renderItem={({item}) => <NestedComment item={item} board={board}/>}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const visTime = relativeTimePrettify(item.createdAt);

  if (isHide && nestedComments.length == 0) {
    return null;
  }
  if (isHide && nestedComments.length > 0) {
    return (
      <View>
        <View style={[
          styles.container,
          {borderColor: theme.subText},
        ]}>
          <Text style={{color: theme.subText}}>숨겨진 댓글입니다.</Text>
        </View>
        {renderNestedComment()}
      </View>
    );
  }
  return (
    <View>
      <TouchableWithoutFeedback onLongPress={() => setMenuOpen(true)}>
        <View style={[
          styles.container,
          nested.isNested == item.id && {backgroundColor: 'rgba(240, 200, 50, 0.2)'},
          {borderColor: theme.subText},
        ]}>
          <View style={styles.topBox}>
            <Nickname type={board.type} nickname={item.nickname} userID={item.userID} style={styles.nickname} />
            {renderDelete()}
          </View>
          <View style={styles.middleBox}>
            <Text style={{color: theme.subText}}>{item.content}</Text>
          </View>
          <View style={styles.belowBox}>
            <Text style={{color: theme.subText}}>{visTime}</Text>
            <AntDesign color='green' size={16} onPress={onClickLike} name='like2' >
              {likeCnt}
            </AntDesign>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Dialog visible={menuOpen} onDismiss={() => setMenuOpen(false)}>
        <TouchableOpacity onPress={() => {
          nested.setIsNested(item.id);
          setMenuOpen(false);
          focusComment(index);
        }}>
          <Text style={styles.menuText}>대댓글 달기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setReportDialogOpen(true);
          setMenuOpen(false);
        }}>
          <Text style={styles.menuText}>댓글 신고</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          onHideComment();
          setMenuOpen(false);
        }}>
          <Text style={styles.menuText}>댓글 숨기기</Text>
        </TouchableOpacity>
      </Dialog>
      <ReportDialog
        visible={reportDialogOpen}
        onDismiss={() => setReportDialogOpen(false)}
        objectID={item.id}
        userID={item.userID}
        type='Comment'
      />
      <SimpleAlert
        modalOpen={alreadyLikeOpen}
        setModalOpen={setAlreadyLikeOpen}
        title='알림'
        content='이미 좋아한 댓글입니다'
        onOk={() => {}}
      />
      {renderNestedComment()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  middleBox: {
    padding: 3,
  },
  belowBox: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 14,
    margin: 10,
  },
  deleteText: {
    color: '#aaaaaa',
  },
});

export default Comment;
