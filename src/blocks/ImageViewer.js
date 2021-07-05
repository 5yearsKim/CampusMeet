import React, {useRef} from 'react';
import {Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {KeyImage} from './Image';

const {width, height} = Dimensions.get('window');

export function ImageViewer({imageKeys, page, modalSwitch}) {
  const scrollViewRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.modalTop}>
        <AntDesign name='close' size={32} color='white' onPress={() => modalSwitch()}/>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollTo({animated: false, x: page?(width*page):undefined})}
        snapToInterval={width}
        decelerationRate='fast'
        horizontal
      >
        {imageKeys.map((imgKey) => (
          <View key={imgKey}>
            <KeyImage
              imgKey={imgKey}
              cached={false}
              style={styles.image}
              resizeMode='contain'
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 32,
    marginRight: 10,
    // backgroundColor: 'black',
  },
  image: {
    width: width,
    height: height,
  },
});
