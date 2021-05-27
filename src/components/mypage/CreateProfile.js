import React, {useState, useContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {Dimensions, ScrollView, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import UploadPicture from './UploadPicture';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import Text from 'src/blocks/Text';
import AutoComplete from 'src/blocks/AutoComplete';
import {makeUser} from 'src/utils/User';
import {MyContext} from 'src/context';
import campusList from 'src/assets/campusLogos';
import DropDownPicker from 'react-native-dropdown-picker';

const {width, height} = Dimensions.get('window');

function CreateProfile({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;

  const [imgList, setImgList] = useState([]);
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  const departmentOptions = config.campus.departmentOptions;
  const [dropOpen, setDropOpen] = useState(false);
  const [dropItems, setDropItems] = useState(departmentOptions.map((item) => ({label: item, value: item})));
  const campusCand = campusList.map((item) => item.name);

  const [currentStep, setCurrentStep] = useState(1);
  const [errText, setErrText] = useState('');

  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [graduate, setGraduate] = useState('학부');
  const [department, setDepartment] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

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
    }
    return true;
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
        await makeUser(userSub, gender, name, campus, graduate, year, department, division, imgList, profileMessage, profileDescription);
        navigation.goBack();
      } catch (err) {
        console.warn(err);
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
            <Image
              source={require('src/assets/images/male.png')}
              style={[styles.genderImage, gender=='남자'&& styles.genderClicked]}
              resizeMode='stretch'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('여자')}>
            <Image
              source={require('src/assets/images/female.png')}
              style={[styles.genderImage, gender=='여자'&& styles.genderClicked]}
              resizeMode='stretch'
            />
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
          <View style={styles.graduateItem}>
            <Text style={styles.graduateText}>학부</Text>
            <RadioButton
              value='학부'
              status={graduate === '학부' ? 'checked' : 'unchecked' }
              onPress={() => setGraduate('학부')}
              color='pink'
            />
          </View>
          <View style={styles.graduateItem}>
            <Text style={styles.graduateText}>대학원</Text>
            <RadioButton
              value='대학원'
              status={graduate === '대학원' ? 'checked' : 'unchecked' }
              onPress={() => setGraduate('대학원')}
              color='pink'
            />
          </View>
        </View>
      );
    };
    return (
      <View>
        <TextInput
          mode='flat'
          label='이름'
          placeholder='이름을 입력해주세요.'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <AutoComplete
          candList={campusCand}
          value={campus}
          onClickText={(text) => {
            setCampus(text);
          }}
          onChangeText={(text) => {
            setCampus(text);
          }}
          placeholder='campus'
        />
        {graduateButton()}
        <DropDownPicker
          open={dropOpen}
          value={department}
          items={dropItems}
          setOpen={setDropOpen}
          setValue={setDepartment}
          setItems={setDropItems}
          placeholder='단과대학'
          // style={styles.department}
          // containerStyle={styles.departmentContainer}
          dropDownContainerStyle={{backgroundColor: 'white'}}
        />
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
      </View>
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
        <Button
          mode="contained"
          onPress={_next}
          style={{marginTop: 20}}
          labelStyle={{color: 'white'}}
        >
          등록하기
        </Button>
      </ScrollView>
    );
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      {step1()}
      {step2()}
      {step3()}
      {errText.length > 0 && currentStep <= 2 &&
        <Text style={styles.errText}>{errText}</Text>
      }
      {currentStep <= 2 &&
      <Button
        mode="contained"
        onPress={_next}
        style={{marginTop: 20}}
        labelStyle={{color: 'white'}}
      >
        다음
      </Button>
      }
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
    width: width* 0.3,
    height: height* 0.25,
    opacity: 0.3,
  },
  genderClicked: {
    opacity: 1,
    borderWidth: 3,
    borderRadius: 20,
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
