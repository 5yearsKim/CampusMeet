import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text as NativeText} from 'react-native';
import {MyContext, ThemeContext} from 'src/context';
import {makeLikeComment, removeLikeComment} from 'src/utils/Community';
import {AntDesign} from '@expo/vector-icons';
import SimpleAlert from 'src/blocks/SimpleAlert';

export default function LikeComment({likeList, commentID}) {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const userSub = auth.user.sub;
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState('');
  const [alreadyLikeOpen, setAlreadyLikeOpen] = useState(false);

  const [tmpLikes, setTmpLikes] = useState([]);

  useEffect(() => {
    setLikeCnt(likeList.length);
    setIsLike(likeList.map((item) => item.userID).includes(userSub));
    setTmpLikes(likeList);
  }, []);

  const onClickLike = async () => {
    if (isLike) {
      setAlreadyLikeOpen(true);
    } else {
      try {
        const likeData = await makeLikeComment(userSub, commentID);
        setTmpLikes([...tmpLikes, likeData]);
        setIsLike(true);
        setLikeCnt(likeCnt + 1);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const onDeleteLike = async () => {
    var mylike = tmpLikes.filter((item) => item.userID == userSub);
    if (mylike == []) {
      return ;
    }
    try {
      mylike = mylike[0];
      const data = await removeLikeComment(mylike.id);
      setIsLike(false);
      setLikeCnt(likeCnt - 1);
    } catch (err) {
      console.warn(err);
    }
  }

  const mystyle = isLike ? {color: theme.primary} : {color: '#888888'};

  return (
    <View>
      <TouchableOpacity onPress={onClickLike}>
        <View style={styles.likeBox}>
          <AntDesign color={mystyle.color} size={14} name={isLike ? 'like1' : 'like2'} />
          <NativeText style={mystyle}>
            {likeCnt}
          </NativeText>
        </View>
      </TouchableOpacity>
      <SimpleAlert
        modalOpen={alreadyLikeOpen}
        setModalOpen={setAlreadyLikeOpen}
        title='알림'
        content='이미 좋아한 댓글입니다. 좋아요를 취소하시겠습니까?'
        onCancel={() => {}}
        onOk={async () => {
          await onDeleteLike();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  likeBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 40,
    paddingRight: 5,
  }
})