import React, {useState, useContext, useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import NotiText from 'src/blocks/NotiText';
import Text from 'src/blocks/Text';
import UploadPicture from './UploadPicture';
import {Button, TextInput, RadioButton} from 'react-native-paper';
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
  const [graduate, setGraduate] = useState('학부');
  const [campus, setCampus] = useState('');
  const [division, setDivision] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const [loading, setLoading] = useState(true);

  const m_bringUser = async () => {
    const userData = await bringUser(userSub);
    setImgList(userData.imageKeys);
    setName(userData.name);
    setGraduate(userData.graduate);
    setYear(userData.year);
    setCampus(userData.campus);
    setDivision(userData.division);
    setProfileMessage(userData.profileMessage);
    setProfileDescription(userData.profileDescription);
    setLoading(false);
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
      graduate: graduate,
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

  const graduateButton = () => {
    return (
      <View style={styles.graduateWrapper}>
        <TouchableOpacity onPress={() => setGraduate('학부')}>
          <View style={styles.graduateItem}>
            <Text style={styles.graduateText}>학부</Text>
            <RadioButton
              onPress={() => setGraduate('학부')}
              value='학부'
              status={graduate === '학부' ? 'checked' : 'unchecked' }
              color='pink'
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGraduate('대학원')}>
          <View style={styles.graduateItem}>
            <Text style={styles.graduateText}>대학원</Text>
            <RadioButton
              onPress={() => setGraduate('대학원')}
              value='대학원'
              status={graduate === '대학원' ? 'checked' : 'unchecked' }
              color='pink'
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (loading) {
    return (
      <NotiText content='Loading..'/>
    );
  }
  return (
    <View style={{padding: 20}}>
      <UploadPicture imgList={imgList} setImgList={setImgList} positions={positions}/>
      <TextInput
        label='이름'
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      {graduateButton()}
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
  graduateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 50,
  },
  graduateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  graduateText: {
    fontWeight: 'bold',
  },
});

export default ModifyProfile;
