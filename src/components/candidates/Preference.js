import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, View, ScrollView, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import Text from 'src/blocks/Text';
import AutoComplete from 'src/blocks/AutoComplete';
import Slider from '@react-native-community/slider';
import {MyContext, ThemeContext} from 'src/context';
import campusList from 'assets/campusLogos';
import {AntDesign} from '@expo/vector-icons';
import MyPicker from 'src/blocks/Picker';
import {bringPreference, makePreference, modifyPreference} from 'src/utils/User';
import config from 'src/config';

const {width, height} = Dimensions.get('window');

export default function Preference({filterOpen, setFilterOpen}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const [exist, setExist] = useState(false);
  const [genderLike, setGenderLike] = useState(0);
  const [campus, setCampus] = useState('');
  const [campusLike, setCampusLike] = useState([]);
  const [graduateLike, setGraduateLike] = useState(false);
  const [departmentLike, setDepartmentLike] = useState([]);

  const departmentOptions = config.campus.departmentOptions;
  const campusCand = campusList.map((item) => item.name);

  useEffect(() => {
    const m_bringPreference = async () => {
      try {
        const pref = await bringPreference(userSub);
        if (pref) {
          setGenderLike(pref.likeGender);
          setGraduateLike(pref.likeGraduate);
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
          likeGraduate: graduateLike,
          likeCampus: campusLike,
          likeDepartment: departmentLike,
        };
        modifyPreference(userSub, input);
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        makePreference(userSub, genderLike, graduateLike, campusLike, departmentLike);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <View>
      <Modal visible={filterOpen} onRequestClose={() => setFilterOpen(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setFilterOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.filterContainer, {backgroundColor: theme.background}]}>
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
                  <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20}}>
                    <Checkbox
                      status={graduateLike ? 'checked' : 'unchecked'}
                      onPress={() => setGraduateLike(!graduateLike)}
                      color='pink'
                    />
                    <Text>대학원 선호</Text>
                  </View>
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
                      <MyPicker
                        candidate={departmentOptions.map((item) => ({label: item, value: item}))}
                        placeholder='선택'
                        onSelectItem={(item) => {
                          if (!departmentLike.includes(item.value)) {
                            setDepartmentLike([...departmentLike, item.value]);
                          }
                        }}
                      />
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
                      onPress={() => setFilterOpen(false)}
                    >
                    취소
                    </Button>
                    <Button
                      mode="contained"
                      style={{width: 100, margin: 5}}
                      onPress={() => {
                        onSave();
                        setFilterOpen(false);
                      }}
                      labelStyle={{color: 'white', fontWeight: 'bold'}}
                    >
                    저장
                    </Button>
                  </View>

                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  filterContainer: {
    width: width*0.85,
    // height: height*0.7,
    borderRadius: 15,
  },
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
