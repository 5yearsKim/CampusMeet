import React, {useState, useContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {TextInput, Button} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import {MyContext} from 'src/context';
import {modifyUser} from 'src/utils/User';

function CreateProfile(props) {
  const auth = useContext(MyContext);
  // const departmentOptions = config.campus.departmentOptions;

  const [imgList, setImgList] = useState([]);
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  // const [department, setDepartment] = useState('');
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
  return (
    <View style={{padding: 20, flex: 1}}>
      <UploadPicture {...props} imgList={imgList} setImgList={setImgList}/>
      {/* <DropDownPicker
        items={departmentOptions.map((item) => ({label: item, value: item}))}
        defaultIndex={0}
        onChangeItem={(item) => setDepartment(item.value)}
        placeholder='단과대학'
        style={styles.department}
      /> */}
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
  department: {
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: 'transparent',
  },
});

export default CreateProfile;
