import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import {getPosition, getOrder, IMGWIDTH, IMGHEIGHT, checkLocalImage} from 'src/utils/UploadPicture';
import {KeyImage} from 'src/blocks/Image';
import {MyContext} from 'src/context';
// import {Storage} from 'aws-amplify';

function AnimatedPicture({imgKey, positions}) {
  if (Object.keys(positions.value).length == 0) {
    return <View></View>;
  }
  const pos = getPosition(positions.value[imgKey]);

  const translateX = useSharedValue(pos.x);
  const translateY = useSharedValue(pos.y);
  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
      () => positions.value[imgKey],
      (newOrder) => {
        if (!isGestureActive.value) {
          const pos = getPosition(newOrder);
          translateX.value = withTiming(pos.x);
          translateY.value = withTiming(pos.y);
        }
      },
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.x + event.translationX;
      translateY.value = ctx.y + event.translationY;
      const newOrder = getOrder(translateX.value, translateY.value, Object.keys(positions.value).length - 1);
      // swap
      const oldOrder = positions.value[imgKey];
      if (newOrder != oldOrder) {
        const keyToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder,
        );
        if (keyToSwap) {
          // Spread operator is not supported in worklets
          // And Object.assign doesn't seem to be working on alpha.6
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[imgKey] = newOrder;
          newPositions[keyToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      const newPos = getPosition(positions.value[imgKey]);
      translateX.value = withTiming(newPos.x);
      translateY.value = withTiming(newPos.y);
      isGestureActive.value = false;
    },
  });

  const boxStyle = useAnimatedStyle(() => (
    {
      position: 'absolute',
      width: IMGWIDTH,
      height: IMGHEIGHT,
      zIndex: 0,
      transform: [{translateX: translateX.value}, {translateY: translateY.value}],
    }));
  const imageStyle = {height: IMGHEIGHT - 6, width: IMGWIDTH - 6};
  return (
    <Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={boxStyle}>
          {checkLocalImage(imgKey) ?
            <Image source={{uri: imgKey}} style={imageStyle}/> :
            <KeyImage imgKey={imgKey} cached={true} style={imageStyle}/>
          }
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

function AddPicture({index, addPicture}) {
  const pos = getPosition(index);
  return (
    <View style={[styles.imageFrame, {top: pos.y, left: pos.x}]}>
      <TouchableOpacity onPress={() => addPicture()}>
        <Image
          source={require('assets/images/add_picture.png')}
          style={{width: IMGWIDTH - 6, height: IMGHEIGHT - 6, borderWidth: 3, borderColor: 'black', opacity: 0.2}}
        />
      </TouchableOpacity>
    </View>
  );
}

function UploadPicture({imgList, setImgList, positions}) {
  const auth = useContext(MyContext);
  const uploadImage = async () => {
    if (imgList.length > 5) {
      return;
    }
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        try {
          // const rsp = await fetch(result.uri);
          // const blob = await rsp.blob();
          // const path = `profile/${auth.user.attributes.sub}/`;
          // const key = result.uri.split('/').pop();
          // const awsrsp = await Storage.put(path + key, blob);
          // setImgList([...imgList, awsrsp.key]);
          setImgList([...imgList, result.uri]);
          // setImgList([result.uri, ...imgList]);
        } catch (err) {
          console.warn(err);
        }
      }
    } catch (err) {
      console.warn('error:', err);
    }
  };
  const deletePicture = (order) => {
    const keyToDelete = Object.keys(positions.value).find(
        (key) => positions.value[key] === order,
    );
    if (imgList.includes(keyToDelete)) {
      const newImgList = imgList.filter((item) => item != keyToDelete);
      setImgList(newImgList);
    }
  };
  return (
    <View style={{backgroundColor: '#eeeeee', height: IMGHEIGHT * 2 + 30}}>
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        if (idx < imgList.length) {
          return <AnimatedPicture key={idx} imgKey={imgList[idx]} positions={positions}/>;
        } else {
          return <AddPicture key={idx} index={idx} addPicture={uploadImage}/>;
        }
      })}
      {imgList.map((key, idx) => {
        const pos = getPosition(idx);
        return (
          <AntDesign
            key={idx}
            size={20}
            name="closecircle"
            style={{position: 'absolute', left: pos.x, top: pos.y}}
            onPress={() => deletePicture(idx)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  imageFrame: {
    position: 'absolute',
    width: IMGWIDTH,
    height: IMGHEIGHT,
  },
  closeIcon: {
    position: 'absolute',
  },
});

export default UploadPicture;
