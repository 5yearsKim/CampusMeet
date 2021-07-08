import React, {useState, useEffect, useContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {ScrollView, View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import AutoComplete from 'src/blocks/AutoComplete';
import {makeUser} from 'src/utils/User';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {setupIndividual} from 'src/utils/User';
import MyPicker from 'src/blocks/Picker';
import campusList from 'assets/campusLogos';
import {imageListToS3} from 'src/utils/UploadPicture';


function CreateProfile({navigation}) {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const {refreshCandidate, setRefreshCandidate} = useContext(UserContext);
  const userSub = auth.user.attributes.sub;

  const [imgList, setImgList] = useState([]);
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  const departmentOptions = config.campus.departmentOptions;
  const campusCand = campusList.map((item) => item.name);

  const [currentStep, setCurrentStep] = useState(1);
  const [errText, setErrText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [graduate, setGraduate] = useState('학부');
  const [department, setDepartment] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type == 'RESET') {
        // console.log(e.data.action);
        return;
      }
      // console.log(e.data.action.type);
      e.preventDefault();
      setAlertOpen(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return () => setRefreshCandidate(!refreshCandidate);
  }, []);

  const checkFormat = () => {
    if (currentStep == 1) {
      if (gender.length == 0) {
        setErrText('성별을 선택해주세요');
        return false;
      }
    }
    if (currentStep == 2) {
      setName(name.trim());
      setCampus(campus.trim());
      setDivision(division.trim());
      if (name.length == 0) {
        setErrText('이름을 입력해주세요');
        return false;
      }
      if (campus.length == 0) {
        setErrText('캠퍼스를 입력해주세요');
        return false;
      }
      if (department.length == 0) {
        setErrText('단과대를 선택해주세요');
        return false;
      }
      if (division.length == 0) {
        setErrText('학과를 입력해주세요');
        return false;
      }
      if (year.length == 0) {
        setErrText('학번을 입력해주세요');
        return false;
      }
    }
    if (currentStep == 3) {
      if (imgList == '') {
        setErrText('프로필 사진을 1개 이상 등록해주세요!');
        return false;
      }
      if (profileMessage == '') {
        setErrText('친구에게 한마디를 간단히 적어주세요.');
        return false;
      }
      if (profileMessage == '') {
        setErrText('자기소개를 적어주세요.');
        return false;
      }
    }
    return true;
  };

  const _prev = () => {
    if (currentStep == 2 || currentStep == 3) {
      setCurrentStep(currentStep - 1);
    }
  };

  const _next = async () => {
    if (currentStep <= 1) {
      if (checkFormat() == false) {
        return;
      }
      setErrText('');
      setCurrentStep(currentStep + 1);
    }
    if (currentStep == 2) {
      if (checkFormat() == false) {
        return;
      }
      setErrText('');
      setCurrentStep(currentStep + 1);
    }
    if (currentStep == 3) {
      if (checkFormat() == false) {
        return;
      }
      try {
        setSubmitting(true);
        const orderedImgList = Object.keys(positions.value).sort((a, b) => positions.value[a] - positions.value[b]);
        const newImgList = await imageListToS3(orderedImgList, `profile/${userSub}`);
        await makeUser(userSub, gender, name, campus, graduate, year, department, division, newImgList, profileMessage, profileDescription);
        await setupIndividual();
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } catch (err) {
        console.warn(err);
        setSubmitting(false);
      }
    }
  };

  const step1 = () => {
    if (currentStep != 1) {
      return null;
    }
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.genderSelectText}>성별을 선택해주세요.</Text>
        <View style={styles.genderWrapper}>
          <TouchableOpacity onPress={() => setGender('남자')}>
            <View style={[styles.genderImage, gender=='남자'&& styles.genderClicked]}>
              <MaterialCommunityIcons name="face" size={80} color={theme.men} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('여자')}>
            <View style={[styles.genderImage, gender=='여자'&& styles.genderClicked]}>
              <MaterialCommunityIcons name="face-woman" size={80} color={theme.women} />
            </View>
          </TouchableOpacity>
        </View>
        {gender.length > 0 &&
          <Text style={styles.genderText}>{gender}</Text>
        }
      </View>
    );
  };
  const step2 = () => {
    if (currentStep !== 2) {
      return null;
    }
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
    return (
      <ScrollView>
        <TextInput
          mode='flat'
          label='이름'
          placeholder='이름을 입력해주세요.'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <View style={{marginTop: 10, marginBottom: 5}}>
          <AutoComplete
            candList={campusCand}
            value={campus}
            onClickText={(text) => setCampus(text)}
            onChangeText={(text) => setCampus(text)}
            placeholder='캠퍼스'
          />
        </View>
        {graduateButton()}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', marginLeft: 20, margin: 10}}>단과대학 선택: </Text>
          <Text style={{fontWeight: 'bold', marginRight: 20}}>{department}</Text>
          <MyPicker
            candidate={departmentOptions.map((item) => ({label: item, value: item}))}
            placeholder='선택'
            onSelectItem={(item) => setDepartment(item.value)}
          />
        </View>
        <View>
          <TextInput
            mode='flat'
            label='학과'
            placeholder='학과를 입력해주세요.'
            defaultValue={division}
            onChangeText={(text) => setDivision(text)}
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            mode='flat'
            label='학번'
            placeholder='ex)20'
            keyboardType='numeric'
            defaultValue={year}
            onChangeText={(text) => setYear(String(text))}
            style={styles.textInput}
          />
        </View>
      </ScrollView>
    );
  };
  const step3 = () => {
    if (currentStep != 3) {
      return null;
    }
    return (
      <ScrollView contentContainerStyle={{flex: 0}}>
        <Text style={styles.introText}>프로필 사진(최소 1장)과 자기소개를 등록해주세요!</Text>

        <UploadPicture imgList={imgList} setImgList={setImgList} positions={positions}/>
        <TextInput
          label='프로필 메세지'
          value={profileMessage}
          onChangeText={(text) => setProfileMessage(text)}
          style={styles.textInput}
        />
        <TextInput
          label='자기 소개'
          value={profileDescription}
          onChangeText={(text) => setProfileDescription(text)}
          style={[styles.textInput, {height: 80}]}
          multiline={true}
        />
        {errText.length > 0 &&
          <Text style={styles.errText}>{errText}</Text>
        }
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      {step1()}
      {step2()}
      {step3()}
      {errText.length > 0 && currentStep <= 2 &&
        <View style={{alignItems: 'center'}}>
          <Text style={styles.errText}>{errText}</Text>
        </View>
      }
      <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
        {currentStep > 1 &&
        <Button
          mode="outlined"
          onPress={_prev}
          style={styles.buttonStyle}
        >
          이전
        </Button>
        }
        <Button
          mode="contained"
          onPress={_next}
          style={styles.buttonStyle}
          labelStyle={{color: 'white'}}
          disabled={submitting}
        >
          {currentStep <= 2 ?
            '다음' :
            submitting ?
              '등록중..' :
              '등록하기'
          }
        </Button>
      </View>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='프로필 등록'
        content='프로필을 등록하지 않으면 캠퍼스밋을 이용할 수 없습니다.'
        onOk={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  genderSelectText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  genderWrapper: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  genderImage: {
    padding: 20,
    opacity: 0.3,
  },
  genderClicked: {
    opacity: 1,
    borderWidth: 3,
    borderRadius: 40,
    borderColor: 'gray',
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
  department: {
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    marginTop: 20,
    width: 120,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  introText: {
    fontSize: 16,
    margin: 10,
  },
  errText: {
    color: 'red',
  },
});

export default CreateProfile;
