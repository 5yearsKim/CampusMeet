import React, {useState, useContext, useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View} from 'react-native';
import UploadPicture from './UploadPicture';
import {Button} from 'react-native-paper';
import {EditableText} from 'src/blocks/Text';
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

  const onSubmit = () => {
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
    modifyUser(userSub, newUser);
    navigation.navigate('Mypage');
  };
  return (
    <View style={{padding: 20, flex: 1}}>
      <UploadPicture imgList={imgList} setImgList={setImgList} positions={positions}/>
      <EditableText
        label='이름'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <EditableText
        label='학번'
        value={String(year)}
        keyboardType='numeric'
        onChangeText={(text) => setYear(text)}
      />
      <EditableText
        label='캠퍼스'
        value={campus}
        onChangeText={(text) => setCampus(text)}
      />
      <EditableText
        label='학과'
        value={division}
        onChangeText={(text) => setDivision(text)}
      />
      <EditableText
        label='친구에게 한마디'
        value={profileMessage}
        onChangeText={(text) => setProfileMessage(text)}
      />
      <EditableText
        label='자기 소개'
        value={profileDescription}
        onChangeText={(text) => setProfileDescription(text)}
      />
      <Button
        mode="outlined"
        onPress={onSubmit}
      >
        제출하기
      </Button>
    </View>
  );
}

export default ModifyProfile;
