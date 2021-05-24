import React, {useEffect, useState, useContext} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Nickname} from 'src/blocks/Board';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {makeLikeComment} from 'src/utils/Community';
import {relativeTimePrettify} from 'src/utils/Time';
import {MyContext} from 'src/context';

function NestedComment({item, board}) {
  // console.log(item);
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const likeList = item.likes.items.map((item) => item.userID);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');

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
    <View style={{flexDirection: 'row'}}>
      <MaterialIcons name="subdirectory-arrow-right" size={15} color='#111155'/>
      <View style={styles.container}>
        <Nickname type={board.type} nickname={item.nickname} style={styles.nickname} />
        <Text>{item.content}</Text>
        <View style={styles.belowBox}>
          <Text>{visTime}</Text>
          <AntDesign color='green' onPress={onClickLike} name='like2' >
            {likeCnt}
          </AntDesign>
        </View>
      </View>
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
    backgroundColor: '#444444',
    borderRadius: 15,
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

export default NestedComment;
