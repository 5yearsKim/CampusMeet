import React, {useState, useContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {TextInput, Button} from 'react-native-paper';
import Text from 'src/blocks/Text';
import {MyContext} from 'src/context';
import {modifyUser} from 'src/utils/User';

function CreateProfile(props) {
  const auth = useContext(MyContext);

  const [imgList, setImgList] = useState([]);
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const onSubmit = () => {
    const userID = auth.user.attributes.sub;
    const newUser = {
      imageKeys: imgList,
      profileMessage: profileMessage,
      profileDescription: profileDescription,
    };
    modifyUser(userID, newUser);
    props.navigation.navigate('Mypage');
  };
  const checkDisabled =() => {
    if (imgList == '') {
      return true;
    }
    return false;
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <Text style={styles.introText}>프로필 사진(최소 1장)과 자기소개를 등록해주세요!</Text>

      <UploadPicture imgList={imgList} setImgList={setImgList} positions={positions}/>
      <TextInput
        label='친구에게 한마디'
        value={profileMessage}
        onChangeText={(text) => setProfileMessage(text)}
        style={styles.textInput}
      />
      <TextInput
        label='자기 소개'
        value={profileDescription}
        onChangeText={(text) => setProfileDescription(text)}
        style={styles.textInput}
        multiline={true}
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={checkDisabled()}
        style={{marginTop: 20}}
        labelStyle={{color: 'white'}}
      >
        제출하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  department: {
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  introText: {
    fontSize: 16,
    margin: 10,
  },
});

export default CreateProfile;
