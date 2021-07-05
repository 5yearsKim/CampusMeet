import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Nickname} from 'src/blocks/Board';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {makeLikeComment} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import {MyContext, ThemeContext} from 'src/context';

function NestedComment({item, board}) {
  // console.log(item);
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

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
    <View style={{flexDirection: 'row'}}>
      <MaterialIcons name="subdirectory-arrow-right" size={15} color='#111155'/>
      <View style={[styles.container, {backgroundColor: theme.nestedComment}]}>
        <Nickname type={board.type} nickname={item.nickname} userID={item.userID} style={styles.nickname} />
        <Text>{item.content}</Text>
        <View style={styles.belowBox}>
          <Text>{visTime}</Text>
          <AntDesign color='green' size={15} onPress={onClickLike} name='like2' >
            {likeCnt}
          </AntDesign>
        </View>
      </View>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
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
  belowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NestedComment;
