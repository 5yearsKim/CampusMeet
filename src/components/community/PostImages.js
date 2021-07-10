import React from 'react';
import {View, FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {KeyImage} from 'src/blocks/Image';
import {FontAwesome} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {checkLocalImage} from 'src/utils/UploadPicture';

export function PostImagesCreate({boardID, imgList, setImgList}) {
  const uploadPostImage = async (boardID) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImgList([...imgList, result.uri]);
      }
    } catch (err) {
      console.warn('error:', err);
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
    if (checkLocalImage(item)) {
      return (
        <Image source={{uri: item}} style={styles.postImage}/>
      );
    } else {
      return (
        <KeyImage imgKey={item} cached={true} style={styles.postImage}/>
      );
    }
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
