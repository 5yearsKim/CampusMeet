import React, {useState, useContext, useRef} from 'react';
import {ScrollView, Animated, View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import SendSignalModal from 'src/blocks/SendSignalModal';
import {Button} from 'react-native-paper';
import config from 'src/config';
import {ThemeContext, UserContext} from 'src/context';
import {relativeTimePrettify} from 'src/utils/Time';

function CandidateDetail({item, useAction, clearModal}) {
  // const auth = useContext(MyContext);
  // const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const {signalCnt} = useContext(UserContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onImageClicked = () => {
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{item.campus} {item.graduate}</Text>
        <Text style={styles.subtitleText}>{item.division} {item.year}학번</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageWrapper}>
          <TouchableWithoutFeedback onPress={() => onImageClicked()}>
            <Image
              source={require('assets/images/no_profile3.png')}
              style={[styles.avatar, {borderColor: item.gender=='남자'?theme.men: theme.women}]}
            />
          </TouchableWithoutFeedback>
          <Animated.View style={{opacity: fadeAnim}}>
            <Text style={{fontSize: 13, color: 'red'}}>매칭 이전에 프로필 사진을 볼 수 없습니다.</Text>
          </Animated.View>
        </View>
        <View style={{padding: 5}}>
          <View style={styles.itemWrapper}>
            <Text style={styles.categoryText}>성별</Text>
            <Text style={styles.detailText}>{item.gender}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.categoryText}>소개</Text>
            <Text style={styles.detailText}>{item.profileDescription}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.categoryText}>마지막 접속일</Text>
            <Text style={styles.detailText}>{relativeTimePrettify(item.updatedAt)}</Text>
          </View>
        </View>
      </View>
      {useAction == true &&
        <View style={styles.bottomContainer}>
          <Button
            mode='text'
            onPress={() => {
              if (signalCnt >= config.manage.signalMax) {
                setAlertOpen(true);
              } else {
                setPopupVisible(true);
              }
            }}
          >
            Signal 보내기
          </Button>
        </View>
      }
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='Signal 이 부족합니다.'
        content='Signal은 매일 새로 충전됩니다.'
        onOk={() => clearModal()}
      />
      <SendSignalModal
        toID={item.id}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        onConfirmSend={() => clearModal()}
      />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  topContainer: {
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  titleText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleText: {
    marginTop: 3,
    fontSize: 14,
    color: 'gray',
  },
  middleContainer: {
    padding: 10,
    // backgroundColor: 'pink',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 50,
    borderWidth: 3,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  detailText: {
    color: 'gray',
    fontSize: 14,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  sentText: {
    fontWeight: 'bold',
    color: config.colors.main.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
  },
});

export default CandidateDetail;
