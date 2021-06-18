import React, {useEffect, useState, useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Text from 'src/blocks/Text';
import AutoComplete from 'src/blocks/AutoComplete';
import Slider from '@react-native-community/slider';
import {MyContext, ThemeContext} from 'src/context';
import campusList from 'assets/campusLogos';
import {AntDesign} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import {bringPreference, makePreference, modifyPreference} from 'src/utils/User';
import config from 'src/config';

export default function Preference({onClose}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const [exist, setExist] = useState(false);
  const [genderLike, setGenderLike] = useState(0);
  const [campus, setCampus] = useState('');
  const [campusLike, setCampusLike] = useState([]);
  const [department, setDepartment] = useState('');
  const [departmentLike, setDepartmentLike] = useState([]);

  const departmentOptions = config.campus.departmentOptions;
  const campusCand = campusList.map((item) => item.name);

  useEffect(() => {
    const m_bringPreference = async () => {
      try {
        const pref = await bringPreference(userSub);
        if (pref) {
          setGenderLike(pref.likeGender);
          setCampusLike(pref.likeCampus);
          setDepartmentLike(pref.likeDepartment);
          setExist(true);
        } else {
          setExist(false);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringPreference();
  }, []);

  const onSave = () => {
    if (exist) {
      try {
        const input = {
          likeGender: genderLike,
          likeCampus: campusLike,
          likeDepartment: departmentLike,
        };
        modifyPreference(userSub, input);
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        makePreference(userSub, genderLike, campusLike, departmentLike);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Text style={styles.titleText}>나와 맞는 친구는?</Text>
      <Text style={styles.subtitleText}>선호도를 반영해 매일 카드가 업데이트 됩니다.</Text>
      <Text style={styles.sectionText}>선호 성별</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.genderText, {color: theme.women}]}>여자 선호</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={-1}
          maximumValue={1}
          minimumTrackTintColor={theme.men}
          maximumTrackTintColor={theme.women}
          value={genderLike}
          thumbTintColor="#006644"
          onSlidingComplete={(value) => setGenderLike(value)}
          step={0.25}
        />
        <Text style={[styles.genderText, {color: theme.men}]}>남자 선호</Text>
      </View>
      <Text style={styles.sectionText}>선호 대학</Text>
      <AutoComplete
        candList={campusCand}
        value={campus}
        onClickText={(text) => {
          setCampus('');
          if (!campusLike.includes(text)) {
            setCampusLike([...campusLike, text]);
          }
        }}
        onChangeText={(text) => setCampus(text)}
        placeholder='campus'
        style={{width: 250}}
      />
      <View style={{flexWrap: 'wrap', flexDirection: 'row', minHeight: 40}}>
        {campusLike.map((item, idx) => {
          return (
            <View style={styles.chip} key={idx}>
              <Text style={theme.subtitleText}>{item}</Text>
              <AntDesign color={theme.subtitleText} size={16} name='close' onPress={() => {
                setCampusLike(campusLike.filter((campus) => campus != item));
              }}/>
            </View>
          );
        })}
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.sectionText, {margin: 20}]}>선호 학과: </Text>
        <View style={{backgroundColor: 'white', borderRadius: 10}}>
          <Picker
            selectedValue={department}
            onValueChange={(value) => {
              setDepartment(value);
              if (!departmentLike.includes(value)) {
                setDepartmentLike([...departmentLike, value]);
              }
            }}
            style={{width: 150, height: 50}}
          >
            {departmentOptions.map((item) => {
              return (
                <Picker.Item label={item} value={item} key={item}/>
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{flexWrap: 'wrap', flexDirection: 'row', minHeight: 20}}>
        {departmentLike.map((item, idx) => {
          return (
            <View style={styles.chip} key={idx}>
              <Text style={theme.subtitleText}>{item}</Text>
              <AntDesign color={theme.subtitleText} size={16} name='close' onPress={() => {
                setDepartmentLike(departmentLike.filter((department) => department!= item));
              }}/>
            </View>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', margin: 25}}>
        <Button
          mode="outlined"
          style={{width: 100, margin: 5}}
          onPress={onClose}
        >
          취소
        </Button>
        <Button
          mode="contained"
          style={{width: 100, margin: 5}}
          onPress={() => {
            onSave();
            onClose();
          }}
          labelStyle={{color: 'white', fontWeight: 'bold'}}
        >
          저장
        </Button>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 14,
    color: '#444444',
    margin: 5,
  },
  genderText: {
    fontWeight: 'bold',
  },
  sectionText: {
    margin: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  chip: {
    flexDirection: 'row',
    margin: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: config.colors.main.primary,
  },
});