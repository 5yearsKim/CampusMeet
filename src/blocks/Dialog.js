import React, {useContext} from 'react';
import {View, Dimensions, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import {ThemeContext} from 'src/context';

const {width} = Dimensions.get('window');

export default function Dialog({visible, onDismiss, children}) {
  const {theme} = useContext(ThemeContext);
  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent={true}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.background}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.mainBox, {backgroundColor: theme.background}]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  mainBox: {
    justifyContent: 'space-evenly',
    width: width*0.7,
    borderRadius: 10,
    padding: 10,
  },
});
