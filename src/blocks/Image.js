import React, {useEffect, useState} from 'react';
import {key2uri} from 'src/utils/Storage';
import {View, Image, Text} from 'react-native';
import {FileSystem} from 'react-native-unimodules';

export function KeyImage({imgKey, style, cached, resizeMode}) {
  const [uri, setUri] = useState('');
  if (style === undefined) {
    style = {width: 40, height: 40};
  }
  if (!imgKey) {
    return null;
  }
  useEffect(() => {
    const getCachedImage = async () => {
      const newKey = imgKey.replace(/\//g, '&');
      const path = `${FileSystem.cacheDirectory}${newKey}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        // console.log('read image from cache');
        setUri(image.uri);
      } else {
        try {
          const newUri = await key2uri(imgKey);
          const newImage = await FileSystem.downloadAsync(newUri, path);
          setUri(newImage.uri);
        } catch (err) {
          console.error(err);
        }
      }
    };
    const getUncachedImage = async () => {
      try {
        const newUri = await key2uri(imgKey);
        setUri(newUri);
      } catch (err) {
        console.error(err);
      }
    };
    if (cached) {
      getCachedImage();
    } else {
      getUncachedImage();
    }
  }, [imgKey]);
  if (uri) {
    return (
      <Image
        source={{
          uri: uri,
        }}
        style={style}
        fadeDuration={0}
        resizeMode={resizeMode}
      />
    );
  }
  return (
    <Image
      source={require('assets/images/image_loading.jpg')}
      style={style}
    />
  );
};

export function KeyAvatar({imgKey, style, size, username}) {
  const [uri, setUri] = useState('');
  if (size == undefined) {
    size = 64;
  }
  if (style == undefined) {
    style = {
      width: 50,
      height: 50,
      borderRadius: 20,
    };
  }
  useEffect(() => {
    if (imgKey == undefined) {
      return;
    }
    const getImage = async () => {
      const newKey = imgKey.replace(/\//g, '&');
      const path = `${FileSystem.cacheDirectory}${newKey}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        // console.log('read image from cache');
        setUri(image.uri);
      } else {
        try {
          const newUri = await key2uri(imgKey);
          const newImage = await FileSystem.downloadAsync(newUri, path);
          setUri(newImage.uri);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getImage();
  }, [imgKey]);
  // console.log(uri);
  if (uri) {
    return (
      <Image
        source={{
          uri: uri,
        }}
        style={style}
        fadeDuration={0}
      />
    );
  } else if (username) {
    return (
      <Text>{username}</Text>
    );
  } else {
    return (
      <Text>
        no input
      </Text>
    );
  }
}

