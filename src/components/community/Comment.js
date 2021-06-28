import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Portal, Dialog} from 'react-native-paper';
import {Nickname} from 'src/blocks/Board';
import {AntDesign} from '@expo/vector-icons';
import {makeLikeComment} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import NestedComment from './NestedComment';
import {MyContext, ChatContext, ThemeContext} from 'src/context';

function Comment({item, index, board, focusComment}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const nested = useContext(ChatContext);
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [dialog, setDialog] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  // console.log('board ', board) ;

  useEffect(() => {
    setLikeCnt(likeList.length);
    setIsLike(likeList.includes(userSub));
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

  const visTime = relativeTimePrettify(item.createdAt);
  return (
    <View>
      <TouchableWithoutFeedback
        onLongPress={() => setDialog(true)}
      >
        <View style={[
          styles.container,
          nested.isNested == item.id && {backgroundColor: theme.nestedComment},
          {borderColor: theme.subText},
        ]}>
          <Nickname type={board.type} nickname={item.nickname} userID={item.userID} style={styles.nickname} />
          <View>
            <Text style={{color: theme.subText}}>{item.content}</Text>
          </View>
          <View style={styles.belowBox}>
            <Text style={{color: theme.subText}}>{visTime}</Text>
            <AntDesign color='green' onPress={onClickLike} name='like2' >
              {likeCnt}
            </AntDesign>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Portal>
        <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
          <Dialog.Content>
            <TouchableOpacity onPress={() => {
              nested.setIsNested(item.id);
              setDialog(false);
              focusComment(index);
            }}>
              <Text style={{color: 'black'}}>대댓글 달기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'black'}}>신고</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='알림'
        content='이미 좋아한 댓글입니다'
        onOk={() => setAlertOpen(false)}
      />
      <FlatList
        data={item.nestedComments.items}
        renderItem={({item}) => <NestedComment item={item} board={board}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingLeft: 15,
    borderTopWidth: 1,
  },
  belowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Comment;
