import React, {useState, useContext} from 'react';
import {ScrollView, View, Image, Alert, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SendSignalModal from 'src/blocks/SendSignalModal';
import {Button} from 'react-native-paper';
import config from 'src/config';
import {MyContext, ThemeContext, UserContext} from 'src/context';

function CandidateDetail({item, useAction}) {
  // const auth = useContext(MyContext);
  // const userSub = auth.user.attributes.sub;
  // const {theme} = useContext(ThemeContext);
  const {signalCnt} = useContext(UserContext);
  const [popupVisible, setPopupVisible] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{item.campus} {item.graduate}</Text>
        <Text style={styles.subtitleText}>{item.division} {item.year}학번</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('src/assets/images/no_profile3.png')}
            style={[styles.avatar, {borderColor: item.gender=='남자'?config.colors.main.men: config.colors.main.women}]}
          />
          <Text style={styles.messageText}>{item.profileMessage}</Text>
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
        </View>
      </View>
      {useAction == true &&
        <View style={styles.bottomContainer}>
          <Button
            mode='text'
            onPress={() => {
              if (signalCnt >= config.manage.signalMax) {
                Alert.alert(
                    'Signal 이 부족합니다.',
                    'Signal은 매일 새로 충전됩니다.',
                );
              } else {
                setPopupVisible(true);
              }
            }}
          >
            Signal 보내기
          </Button>
        </View>
      }
      <SendSignalModal toID={item.id} popupVisible={popupVisible} setPopupVisible={setPopupVisible}/>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
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
    borderWidth: 5,
  },
  messageText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  itemWrapper: {
    margin: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 14,
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
