import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import Dialog from 'src/blocks/Dialog';
import ReportDialog from 'src/blocks/ReportDialog';
import {Nickname} from 'src/blocks/Board';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {makeLikeComment, makeBlock} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import {MyContext, ThemeContext} from 'src/context';

function NestedComment({item, board}) {
  // console.log(item);
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [alreadyLikeAlert, setAlreadyLikeAlert] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isHide, setIsHide] = useState(false);

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
      setAlertOpen(true);
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
      await makeBlock(userSub, item.id, 'NestedComment');
      setIsHide(true);
    } catch (err) {
      console.warn(err);
    }
  };

  if (isHide) {
    return null;
  }
  const visTime = relativeTimePrettify(item.createdAt);
  return (
    <View style={{flexDirection: 'row'}}>
      <MaterialIcons name="subdirectory-arrow-right" size={15} color='#111155'/>
      <TouchableWithoutFeedback onLongPress={() => setMenuOpen(true)}>
        <View style={[styles.container, {backgroundColor: theme.nestedComment}]}>
          <View style={styles.topBox}>
            <Nickname type={board.type} nickname={item.nickname} userID={item.userID} style={styles.nickname} />
          </View>
          <View style={styles.middleBox}>
            <Text>{item.content}</Text>
          </View>
          <View style={styles.belowBox}>
            <Text>{visTime}</Text>
            <AntDesign color='green' size={15} onPress={onClickLike} name='like2' >
              {likeCnt}
            </AntDesign>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Dialog visible={menuOpen} onDismiss={() => setMenuOpen(false)}>
        <TouchableOpacity onPress={() => {
          setReportDialogOpen(true);
          setMenuOpen(false);
        }}>
          <Text style={styles.menuText}>대댓글 신고</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          onHideComment();
          setMenuOpen(false);
        }}>
          <Text style={styles.menuText}>대댓글 숨기기</Text>
        </TouchableOpacity>
      </Dialog>
      <ReportDialog
        visible={reportDialogOpen}
        onDismiss={() => setReportDialogOpen(false)}
        objectID={item.id}
        userID={item.userID}
        type='NestedComment'
      />
      <SimpleAlert
        modalOpen={alreadyLikeAlert}
        setModalOpen={setAlreadyLikeAlert}
        title='알림'
        content='이미 좋아한 대댓글입니다.'
        onOk={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    marginRight: 5,
    margin: 1,
    borderRadius: 15,
  },
  topBox: {
    padding: 3,
  },
  middleBox: {
    padding: 3,
  },
  belowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 14,
    margin: 10,
  },
});

export default NestedComment;
