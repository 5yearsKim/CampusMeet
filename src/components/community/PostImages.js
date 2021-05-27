import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {KeyImage} from 'src/blocks/Image';
import {FontAwesome} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';

export function PostImagesCreate({boardID, imgList, setImgList}) {
  const uploadPostImage = async (boardID) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        try {
          const rsp = await fetch(result.uri);
          const blob = await rsp.blob();
          const path = `board/${boardID}/`;
          const key = result.uri.split('/').pop();
          const awsrsp = await Storage.put(path + key, blob);
          setImgList([...imgList, awsrsp.key]);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log('error:', err);
    }
  };
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => uploadPostImage(boardID)}>
        <FontAwesome name="camera" size={32} color='#444444'/>
      </TouchableOpacity>
    </View>
  );
}

export function PostImagesView({imgList}) {
  const renderImage = ({item}) => {
    return (
      <KeyImage imgKey={item} cached={false} style={styles.postImage}/>
    );
  };
  return (
    <View>
      <FlatList
        data={imgList}
        renderItem={renderImage}
        horizontal={true}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    marginTop: 20,
    marginBottom: 5,
    width: 200,
    height: 150,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: 'white',
  },
});
