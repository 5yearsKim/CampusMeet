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
            cached={false}
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
        <Text style={[styles.campusText, {color: theme.subText}]}>{user.campus} {user.division} {user.year} 학번</Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={[styles.messageText, {color: theme.text}]}> {user.profileMessage}</Text>
        <Text style={[styles.descriptionText, {color: theme.subText}]}> {user.profileDescription}</Text>
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
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  campusText: {
    fontSize: 14,
  },
  yearText: {
    fontSize: 11,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
  },
});

export default ViewProfile;
