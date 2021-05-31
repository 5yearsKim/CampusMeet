import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import {makeComment, makeNestedComment, getNickname} from 'src/utils/Community';
import {Nickname} from 'src/blocks/Board';
import {FontAwesome} from '@expo/vector-icons';
import {MyContext, ChatContext} from 'src/context';

function CommentInput({board, post, refresh}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const nested = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState(0);
  const chatInput = useRef(null);
  const inputHeight = Math.max(Math.min(65, height), 30);
  const placeholder = nested.isNested?'대댓글을 입력해주세요':'댓글을 입력해주세요';

  useEffect(() => {
    const m_getNickname = async () => {
      const nicknameData = await getNickname(userSub, board.type, true);
      setNickname(nicknameData);
    };
    m_getNickname();
  }, []);

  useEffect(() => {
    if (nested.isNested) {
      // console.log(nested.isNested);
      chatInput.current.focus();
    }
  }, [nested.isNested]);

  const onSend = async () => {
    if (nested.isNested) {
      const nestedCommentData = await makeNestedComment(userSub, nested.isNested, nickname, message);
      if (nestedCommentData) {
        setMessage('');
        nested.setIsNested(false);
      }
    } else {
      const commentData = await makeComment(userSub, post.id, nickname, message);
      if (commentData) {
        setMessage('');
      }
    }
    refresh();
    Keyboard.dismiss();
  };

  return (
    // <View style={[styles.container, {height: inputHeight + 10, backgroundColor: nested.isNested?'green':'blue'}]}>
    <View style={[styles.container, {height: inputHeight + 10}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios'? 'padding': 'height'}
        keyboardVerticalOffset={100}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Nickname type={board.type} nickname={nickname} style={styles.nickname}/>
            <TextInput
              onChangeText={(text) => setMessage(text)}
              ref={chatInput}
              value={message}
              multiline={true}
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              onBlur={() => nested.setIsNested(false)}
              placeholder={placeholder}
              style={{height: Math.max(inputHeight, 30)}}
            />
          </View>
          <View style={{marginRight: 15}}>
            <TouchableOpacity
              onPress={onSend}
            >
              <FontAwesome
                name='send-o'
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    // backgroundColor: 'white',
    // justifyContent: 'flex-end',
  },
  nickname: {
    fontSize: 13,
    marginRight: 10,
  },
});

export default CommentInput;
