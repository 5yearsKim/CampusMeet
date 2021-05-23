import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {TextInput, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {EditableText} from 'src/blocks/Text';
import {MyContext} from 'src/context';
import {bringUser, modifyUser} from 'src/utils/User';
import config from 'src/config';

function CreateProfile(props) {
  const auth = useContext(MyContext);
  const departmentOptions = config.campus.departmentOptions;
  const [imgList, setImgList] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [campus, setCampus] = useState('');
  const [department, setDepartment] = useState('');
  const [division, setDivision] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const m_bringUser = async () => {
    const userID = auth.user.attributes.sub;
    const userData = await bringUser(userID);
    setName(userData.name);
    setYear(userData.year);
    setCampus(userData.campus);
    setDivision(userData.division);
  };

  useEffect(() => {
    m_bringUser();
  }, []);

  const onSubmit = () => {
    const userID = auth.user.attributes.sub;
    const newUser = {
      imageKeys: imgList,
      name: name,
      year: year,
      campus: campus,
      division: division,
      profileMessage: profileMessage,
      profileDescription: profileDescription,
    };
    modifyUser(userID, newUser);
    props.navigation.navigate('Mypage');
  };
  return (
    <View>
      <UploadPicture {...props} imgList={imgList} setImgList={setImgList}/>
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
      <DropDownPicker
        items={departmentOptions.map((item) => ({label: item, value: item}))}
        defaultIndex={0}
        onChangeItem={(item) => setDepartment(item.value)}
        placeholder='단과대학'
        style={styles.department}
      />

      <TextInput
        label='친구에게 한마디'
        value={profileMessage}
        onChangeText={(text) => setProfileMessage(text)}
      />
      <TextInput
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

const styles = StyleSheet.create({
  department: {
    backgroundColor: 'white',
  }
})

export default CreateProfile;
