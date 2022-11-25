import React, {useState, useContext, useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import NotiText from 'src/blocks/NotiText';
import Text from 'src/blocks/Text';
import UploadPicture from './UploadPicture';
import {Button, TextInput, RadioButton, Snackbar} from 'react-native-paper';
import {MyContext, UserContext} from 'src/context';
import {bringUser, modifyUser} from 'src/utils/User';
import {imageListToS3} from 'src/utils/UploadPicture';
import {isNumeric} from 'src/utils/Misc';

function ModifyProfile({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {refreshMypage, setRefreshMypage} = useContext(UserContext);

  const [imgList, setImgList] = useState([]);
  const positions = useSharedValue({});
  // console.log(imgList);
  // console.log(positions.value);
  // console.log(positions.value, imgList);

  useEffect(() => {
    const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
    const initpos = Object.assign({}, ...imgIndex);
    positions.value = initpos;
  }, [imgList]);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [graduate, setGraduate] = useState('학부');
  const [campus, setCampus] = useState('');
  const [division, setDivision] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const [errText, setErrText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [descriptionHeight, setDescriptionHeight] = useState(0);

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

  const checkFormat = () => {
    if (name.trim() == '') {
      setErrText('이름을 적어주세요');
      return false;
    }
    if (!isNumeric(year)) {
      setErrText('학번을 바르게 기입해주세요');
      return false;
    }
    if (campus.trim() == '') {
      setErrText('캠퍼스를 바르게 입력해주세요');
      return false;
    }
    if (division.trim() == '') {
      setErrText('학과를 바르게 입력해주세요');
      return false;
    }
    if (imgList == '') {
      setErrText('프로필 사진을 1개 이상 등록해주세요!');
      return false;
    }
    if (profileMessage.trim() == '') {
      setErrText('프로필메세지를 적어주세요.');
      return false;
    }
    if (profileDescription.trim() == '') {
      setErrText('자기소개를 적어주세요.');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!checkFormat()) {
      return;
    }
    setErrText('');
    setSubmitting(true);
    const orderedImgList = Object.keys(positions.value).sort((a, b) => positions.value[a] - positions.value[b]);
    try {
      const newImgList = await imageListToS3(orderedImgList, `profile/${userSub}`);
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
      await modifyUser(userSub, newUser);
      setRefreshMypage(!refreshMypage);
      auth.setName(name);
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
        maxLength={30}
      />
      {graduateButton()}
      <TextInput
        label='학번'
        value={String(year)}
        keyboardType='numeric'
        onChangeText={(text) => setYear(text)}
        style={styles.textInput}
        maxLength={4}
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
        maxLength={20}
      />
      <TextInput
        label='프로필 메세지'
        value={profileMessage}
        onChangeText={(text) => setProfileMessage(text)}
        style={styles.textInput}
        maxLength={300}
      />
      <TextInput
        label='자기 소개'
        // mode='outlined'
        value={profileDescription}
        onChangeText={(text) => setProfileDescription(text)}
        onContentSizeChange={(event) => {
          var myheight = event.nativeEvent.contentSize.height;
          myheight = Math.min(160, myheight);
          setDescriptionHeight(myheight);
        }}
        style={styles.profileDescription}
        multiline={true}
        height={Math.max(65, descriptionHeight)}
        // numberOfLines={4}
        maxLength={3000}
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        style={{marginTop: 20}}
        disabled={submitting}
        labelStyle={{color: 'white'}}
      >
        {submitting ?
          '제출중..' :
          '제출하기'
        }
      </Button>
      <View>
        <Snackbar
          visible={errText.length > 0}
          onDismiss={() => setErrText('')}
          duration={2000}
          action={{
            label: '확인',
            onPress: () => {
              setErrText('');
            },
          }}>
            {errText}
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
  },
  profileDescription: {
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
