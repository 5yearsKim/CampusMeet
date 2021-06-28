import React, {useState, useContext, useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {Button, TextInput} from 'react-native-paper';
import {MyContext} from 'src/context';
import {bringUser, modifyUser} from 'src/utils/User';

function ModifyProfile({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;

  const [imgList, setImgList] = useState([]);
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [campus, setCampus] = useState('');
  const [division, setDivision] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const m_bringUser = async () => {
    const userData = await bringUser(userSub);
    setImgList(userData.imageKeys);
    setName(userData.name);
    setYear(userData.year);
    setCampus(userData.campus);
    setDivision(userData.division);
    setProfileMessage(userData.profileMessage);
    setProfileDescription(userData.profileDescription);
  };

  useEffect(() => {
    m_bringUser();
  }, []);

  const onSubmit = async () => {
    const newImgList = Object.keys(positions.value).sort((a, b) => positions.value[a] - positions.value[b]);
    const newUser = {
      imageKeys: newImgList,
      name: name,
      year: year,
      campus: campus,
      division: division,
      profileMessage: profileMessage,
      profileDescription: profileDescription,
    };
    try {
      await modifyUser(userSub, newUser);
      navigation.navigate('Mypage');
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={{padding: 20}}>
      <UploadPicture imgList={imgList} setImgList={setImgList} positions={positions}/>
      <TextInput
        label='이름'
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      <TextInput
        label='학번'
        value={String(year)}
        keyboardType='numeric'
        onChangeText={(text) => setYear(text)}
        style={styles.textInput}
      />
      <TextInput
        label='캠퍼스'
        value={campus}
        onChangeText={(text) => setCampus(text)}
        style={styles.textInput}
      />
      <TextInput
        label='학과'
        value={division}
        onChangeText={(text) => setDivision(text)}
        style={styles.textInput}
      />
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
        style={{marginTop: 20}}
        labelStyle={{color: 'white'}}
      >
        제출하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
  },
});

export default ModifyProfile;
