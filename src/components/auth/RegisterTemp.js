import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import {MyContext} from 'src/context';
import AutoComplete from 'src/blocks/AutoComplete';
import config from 'src/config';
import {handleSignup, confirmSignup, login} from 'src/utils/Auth';
import {makeUser} from 'src/utils/User';
import DropDownPicker from 'react-native-dropdown-picker';

const {width, height} = Dimensions.get('window');

function Register({navigation}) {
  const auth = useContext(MyContext);
  const departmentOptions = config.campus.departmentOptions;
  const [dropOpen, setDropOpen] = useState(false);
  const [dropItems, setDropItems] = useState(departmentOptions.map((item) => ({label: item, value: item})));
  const [currentStep, setCurrentStep] = useState(0);
  const [errText, setErrText] = useState('');

  const [gender, setGender] = useState('');
  const [userSub, setUserSub] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [graduate, setGraduate] = useState('학부');
  const [department, setDepartment] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [campusList, setCampusList] = useState([]);

  useEffect(() => {
    const bringCampusList = () => {
      fetch(`${config.api.campusURL}/find/campus`)
          .then((rsp) => {
            return rsp.json();
          })
          .then((data) => {
            setCampusList(data['data']);
          })
          .catch((err) => {
            console.log('error bringCampus', err);
          });
    };
    bringCampusList();
  }, []);

  const checkFormat = () => {
    if (currentStep == 0) {
      if (gender.length == 0) {
        setErrText('성별을 선택해주세요');
        return false;
      }
    }
    if (currentStep == 1) {
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
    if (currentStep == 2) {
      setUsername(username.trim());
      setEmail(email.trim());
      setEmailVerification(emailVerification.trim());
      if (username.length == 0) {
        setErrText('ID를 설정해주세요.');
        return false;
      }
      if (username.length < 4) {
        setErrText('ID가 너무 짧습니다');
        return false;
      }
      if (password.length < 8) {
        setErrText('비밀번호가 너무 짧습니다.');
        return false;
      }
      if (password.search(/[a-zA-Z]/) < 0) {
        setErrText('비밀번호는 최소 1개의 알파벳을 포함해야 합니다.');
        return false;
      }
      if (password.search(/\d/) < 0) {
        setErrText('비밀번호는 최소 1개의 숫자를 포함하여야 합니다.');
        return false;
      }
      if (password != passwordConfirm) {
        setErrText('비밀번호 확인이 일치하지 않습니다.');
        return false;
      }
      if (email.length == 0) {
        setErrText('메일을 입력해주세요.');
        return false;
      }
      if (email.length < 10) {
        setErrText('메일 포맷이 올바르지 않습니다.');
        return false;
      }
    }
    if (currentStep == 3) {
      if (emailVerification.length == 0) {
        setErrText('메일 인증 코드를 입력해주세요');
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
    if (currentStep === 2) {
      if (checkFormat() == false) {
        return;
      }
      try {
        const rsp = await handleSignup(username, password, email, gender);
        setUserSub(rsp.userSub);
        console.log(rsp);
        setErrText('');
        setCurrentStep(currentStep + 1);
      } catch (err) {
        if (err.code == 'UsernameExistsException') {
          setErrText('이미 존재하는 ID입니다.');
        }
        if (err.code == 'InvalidParameterException') {
          if (err.message == 'Invalid email address format.') {
            setErrText('올바른 이메일 형식이 아닙니다.');
          } else {
            setErrText('비밀번호가 올바르지 않습니다.');
          }
        }
        console.warn(err);
      }
    }
    if (currentStep === 3) {
      try {
        await confirmSignup(username, emailVerification);
        await login(auth, username, password);
        await makeUser(userSub, gender, name, campus, graduate, year, department, division);
        console.log('make user after login');
        setErrText('');
        setCurrentStep(currentStep + 1);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const _prev = () => {
    const newStep = currentStep <= 0? 0: currentStep - 1;
    setCurrentStep(newStep);
  };

  const step0 = () => {
    if (currentStep != 0) {
      return;
    }
    return (
      <View style={styles.genderContainer}>
        <Text style={styles.genderSelect}>성별을 선택해주세요.</Text>
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
              resizeMOde='stretch'
            />
          </TouchableOpacity>
        </View>
        {gender.length > 0 &&
          <Text style={styles.genderText}>'{gender}'</Text>
        }
      </View>
    );
  };
  const step1 = () => {
    if (currentStep !== 1) {
      return;
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
          placeholder='본명을 입력해주세요.'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <AutoComplete
          candList={campusList}
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
  const step2 = () => {
    if (currentStep < 2) {
      return;
    }
    return (
      <View>
        <TextInput
          mode='flat'
          label='ID'
          placeholder='6 ~ 15자리 영문 숫자 조합'
          keyboardType='email-address'
          defaultValue={username}
          onChangeText={(text) => setUsername(text)}
          left={<TextInput.Icon name='account'/>}
          style={styles.textInput}
        />
        <TextInput
          mode='flat'
          label='Password'
          placeholder='비밀번호'
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={(text) => setPassword(text)}
          left={<TextInput.Icon name='lock'/>}
          style={styles.textInput}
        />
        <TextInput
          mode='flat'
          label='Password confirmation'
          placeholder='비밀번호 확인'
          secureTextEntry={true}
          defaultValue={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          left={<TextInput.Icon name='lock-check'/>}
          style={styles.textInput}
        />
        <TextInput
          mode='flat'
          label='email'
          keyboardType='email-address'
          placeholder='본인 확인용 이메일'
          defaultValue={email}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name='email'/>}
          style={styles.textInput}
        />
      </View>
    );
  };
  const step3 = () => {
    if (currentStep !== 3) {
      return;
    }
    return (
      <View>
        <Text>메일로 인증코드가 발송되었습니다. 메일을 확인해주세요.</Text>
        <TextInput
          mode='flat'
          label='Verification Code'
          keyboardType='numeric'
          placeholder='메일 인증 코드'
          defaultValue={emailVerification}
          onChangeText={(text) => setEmailVerification(text)}
          left={<TextInput.Icon name='email-check'/>}
          style={styles.textInput}
        />
      </View>
    );
  };
  return (
    <View>
      {step0()}
      {step1()}
      {step2()}
      {step3()}
      {errText.length > 0 &&
        <Text style={styles.errText}>{errText}</Text>
      }
      <View style={styles.buttonWrapper}>
        {currentStep > 0 &&
          <Button
            mode='outlined'
            onPress={_prev}
            disabled={false}
          >
            <Text>이전</Text>
          </Button>
        }
        <Button
          mode='contained'
          onPress={_next}
          disabled={false}
        >
          {currentStep <= 1 &&
            <Text style={[styles.buttonText, {color: 'white'}]}>다음</Text>
          }
          {currentStep == 2 &&
            <Text style={styles.buttonText, {color: 'white'}}>메일인증</Text>
          }
          {currentStep == 3 &&
            <Text style={styles.buttonText, {color: 'white'}}>제출하기</Text>
          }
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
  },
  errText: {
    color: 'red',
  },
  genderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderSelect: {
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
  buttonWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },

});
export default Register;
