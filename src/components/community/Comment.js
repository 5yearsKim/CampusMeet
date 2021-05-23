import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity, Alert, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Portal, Dialog} from 'react-native-paper';
import {Nickname} from 'src/blocks/Board';
import {AntDesign} from '@expo/vector-icons';
import {makeLikeComment} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import NestedComment from './NestedComment';
import {MyContext, ChatContext, ThemeContext} from 'src/context';

function Comment({item, board}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const nested = useContext(ChatContext);
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [dialog, setDialog] = useState(false);
  // console.log('board ', board) ;

  useEffect(() => {
    setLikeCnt(likeList.length);
    setIsLike(likeList.includes(userSub));
  }, []);

  const alreadyLikeAlert = () => {
    Alert.alert(
        '알림',
        '이미 좋아한 댓글입니다.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
    );
  };

  const onClickLike = async () => {
    if (isLike) {
      alreadyLikeAlert();
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
          nested.isNested == item.id && styles.nestFocus,
          {borderColor: theme.subText},
        ]}>
          <Nickname type={board.type} nickname={item.nickname} style={styles.nickname} />
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
            }}>
              <Text>대댓글 달기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text>신고</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
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
  nestFocus: {
    backgroundColor: '#ffffdd',
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
