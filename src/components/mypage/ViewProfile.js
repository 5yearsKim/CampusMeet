import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {bringUser} from 'src/utils/User';
import {ThemeContext} from 'src/context';

const {width, height} = Dimensions.get('window');

function ProfilePicture({imageKeys}) {
  return (
    <View style={styles.profileContainer}>
      <ScrollView
        snapToInterval={width}
        decelerationRate='fast'
        horizontal={true}
      >
        {imageKeys.map((imgKey) => (
          <KeyImage
            key={imgKey}
            imgKey={imgKey}
            cached={true}
            style={styles.profileImage}
            resizeMode='contain'
          />
        ))}
      </ScrollView>
    </View>
  );
}

function ViewProfile({navigation, route}) {
  const {userID} = route.params;
  const [user, setUser] = useState(null);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const m_bringUser = async () => {
      const userData = await bringUser(userID);
      setUser(userData);
    };
    m_bringUser();
  }, []);
  if (!user) {
    return (
      <View style={styles.loadingPage}>
        <Text>loading..</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{alignItems: 'center'}}>
        <ProfilePicture imageKeys={user.imageKeys}/>
        <Text style={[styles.nameText, {color: theme.text}]}>{user.name}</Text>
        <Text style={[styles.campusText, {color: theme.subText}]}>{user.campus} {user.division} {user.graduate} {user.year}학번</Text>
      </View>
      <View style={{padding: 10}}>
        <View style={styles.itemWrapper}>
          <Text style={styles.categoryText}>성별</Text>
          <Text style={styles.detailText}>{user.gender}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.categoryText}>프로필 메세지</Text>
          <Text style={styles.detailText}>{user.profileMessage}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.categoryText}>소개</Text>
          <Text style={styles.detailText}>{user.profileDescription}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    padding: 10,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 20,
    marginBottom: 5,
    width: width,
    height: Math.min(width, height) * 0.8,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  detailText: {
    color: 'gray',
    fontSize: 16,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  campusText: {
    fontSize: 16,
  },
});

export default ViewProfile;
