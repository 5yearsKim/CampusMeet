import React, {useState, useContext} from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {View, ScrollView, TextInput, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {PostImagesCreate, PostImagesView} from './PostImages';
import {getNickname, makePost} from 'src/utils/Community';
import {imageListToS3} from 'src/utils/UploadPicture';
import {MyContext, ThemeContext, UserContext} from 'src/context';


function CreatePost({navigation, route}) {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const {refreshBoard, setRefreshBoard} = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgList, setImgList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {board} = route.params;

  const onSubmit = async () => {
    setSubmitting(true);
    const userSub = auth.user.sub;
    const nickname = await getNickname(userSub, board.type);
    const newImgList = await imageListToS3(imgList, `board/${board.id}`);
    await makePost(userSub, board.id, nickname, title.trim(), content.trim(), newImgList);
    setRefreshBoard(!refreshBoard);
    navigation.goBack();
  };
  const checkDisabled= () => {
    if (title.trim() == '') {
      return true;
    } else if (content.trim() == '') {
      return true;
    }
    return false;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <PaperTextInput
          // label='제목'
          type='flat'
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder='제목'
          style={styles.titleInput}
          maxLength={100}
        />
        <View style={styles.contentBox}>
          <TextInput
            value={content}
            multiline={true}
            // placeholderTextColor={theme.subText}
            onChangeText={(text) => setContent(text)}
            placeholder='내용을 입력해주세요.'
            placeholderTextColor='#bbbbbb'
            style={[styles.contentInput]}
            maxLength={2000}
          />
        </View>
        {/* </ScrollView> */}
        <View style={{alignItems: 'center'}}>
          <Button
            mode='contained'
            onPress={() => onSubmit()}
            dark={true}
            compact={true}
            style={styles.submitButton}
            disabled={checkDisabled() || submitting}
          >
            {submitting ?
              'Loading..' :
              'submit'
            }
          </Button>
        </View>
        <PostImagesView imgList={imgList}/>
        <View style={styles.notiBox}>
          <Text style={[styles.notiTitle, {color: theme.subText}]}>캠퍼스밋 커뮤니티 수칙</Text>
          <Text style={[styles.notiItem, {color: theme.subText}]}>1. 욕설과 비방은 금지! 이쁜말만 써주세요.</Text>
          <Text style={[styles.notiItem, {color: theme.subText}]}>2. 홍보 및 판매 목적의 글은 삼가주세요. </Text>
          <Text style={[styles.notiItem, {color: theme.subText}]}>3. 그 밖에 타인에게 불쾌감을 주는 글은 운영자에게 삭제될 수 있어요.</Text>
        </View>
      </ScrollView>
      <PostImagesCreate boardID={board.id} imgList={imgList} setImgList={setImgList}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
  },
  titleInput: {
    backgroundColor: 'transparent',
  },
  contentBox: {
    minHeight: 100,
    justifyContent: 'center',
  },
  contentInput: {
    minHeight: '10%',
    fontSize: 15,
  },
  submitButton: {
    borderRadius: 40,
    width: 250,
    marginTop: 10,
  },
  notiBox: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 0, 0.1)',
  },
  notiTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notiItem: {
    marginBottom: 3,
  },
});

export default CreatePost;
