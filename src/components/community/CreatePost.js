import React, {useState, useContext} from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';
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

  const {board} = route.params;

  const onSubmit = async () => {
    const userSub = auth.user.attributes.sub;
    const nickname = await getNickname(userSub, board.type);
    const newImgList = await imageListToS3(imgList, `board/${board.id}`);
    const postData = await makePost(userSub, board.id, nickname, title, content, newImgList);
    if (postData) {
      setRefreshBoard(!refreshBoard);
      navigation.goBack();
    }
  };
  const checkDisabled= () => {
    if (title == '') {
      return true;
    } else if (content == '') {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <PaperTextInput
        // label='제목'
        type='flat'
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder='제목'
        style={styles.titleInput}
      />
      <View style={styles.contentBox}>
        <TextInput
          value={content}
          multiline={true}
          placeholderTextColor={theme.subText}
          onChangeText={(text) => setContent(text)}
          placeholder='내용을 입력해주세요.'
          style={[styles.contentInput, {color: theme.text}]}
        />
      </View>
      <Text style={{color: theme.subText}}>욕설 금지! 비방어 금지! 이쁜말만 써주세요</Text>
      {/* </ScrollView> */}
      <View style={{alignItems: 'center'}}>
        <Button
          mode='contained'
          onPress={() => onSubmit()}
          dark={true}
          compact={true}
          style={styles.submitButton}
          disabled={checkDisabled()}
        >
          submit
        </Button>
      </View>
      <PostImagesView imgList={imgList}/>
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
});

export default CreatePost;
