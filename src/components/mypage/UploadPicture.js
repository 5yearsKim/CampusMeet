import React, {useContext} from 'react';
import {View, Button, Image, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import {getPosition, getOrder, IMGWIDTH, IMGHEIGHT} from 'src/utils/UploadPicture';
import {KeyImage} from 'src/blocks/Image';
import {MyContext} from 'src/context';

function AnimatedPicture({imgKey, positions}) {
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
      borderColor: 'black',
      borderWidth: 3,
      transform: [{translateX: translateX.value}, {translateY: translateY.value}],
    }));
  return (
    <Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={boxStyle}>
          <KeyImage imgKey={imgKey} cached={false} style={{height: IMGHEIGHT, width: IMGWIDTH}}/>
          {/* <KeyImage imgKey={imgKey} cached={false}/> */}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

function AddPicture({index}) {
  const pos = getPosition(index);
  return (
    <View style={[styles.imageFrame, {top: pos.y, left: pos.x}]}>
      <Image
        source={require('src/assets/images/add_picture.png')}
        style={{width: IMGWIDTH, height: IMGHEIGHT, borderWidth: 3, borderColor: 'black'}}
      />
    </View>
  );
}

function UploadPicture({imgList, setImgList}) {
  const imgIndex = imgList.map((img, idx) => ({[img]: idx}));
  const initpos = Object.assign({}, ...imgIndex);
  const positions = useSharedValue(initpos);
  positions.value = initpos;

  const auth = useContext(MyContext);
  const uploadImage = async () => {
    if (imgList.length > 5) {
      return;
    }
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
          const path = `profile/${auth.user.attributes.sub}/`;
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
    <React.Fragment>
      <View style={{flex: 1, backgroundColor: '#eeeeee', height: IMGHEIGHT * 2 + 30}}>
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          if (idx < imgList.length) {
            return <AnimatedPicture key={idx} imgKey={imgList[idx]} positions={positions}/>;
          } else {
            return <AddPicture key={idx} index={idx}/>;
          }
        })}
      </View>
      <Button
        title='image'
        onPress={() => uploadImage()}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  imageFrame: {
    position: 'absolute',
    width: IMGWIDTH,
    height: IMGHEIGHT,
    borderColor: 'black',
    borderWidth: 3,
  },
});

export default UploadPicture;
