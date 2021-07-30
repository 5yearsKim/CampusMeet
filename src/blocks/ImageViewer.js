import React, {useRef} from 'react';
import {Dimensions, View, ScrollView, Image, StyleSheet} from 'react-native';
import {KeyImage} from './Image';

const {width, height} = Dimensions.get('window');

export function ImageViewer({imageKeys, page}) {
  const scrollViewRef = useRef();
  const isUrl = (str) => str.startsWith('https:/');
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollTo({animated: false, x: page?(width*page):undefined})}
        snapToInterval={width}
        decelerationRate='fast'
        horizontal
      >
        {imageKeys.map((imgKey) => (
          <View key={imgKey}>
            {isUrl(imgKey) ?
              <Image
                source={{
                  uri: imgKey,
                }}
                style={styles.image}
                resizeMode='contain'
              /> :
              <KeyImage
                imgKey={imgKey}
                cached={true}
                style={styles.image}
                resizeMode='contain'
              />
            }
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
