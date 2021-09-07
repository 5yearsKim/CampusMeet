import React, {useContext} from 'react';
import {View, Dimensions, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import {ThemeContext} from 'src/context';

const windowWidth = Dimensions.get('window').width;

export default function Dialog({visible, onDismiss, width, children}) {
  const {theme} = useContext(ThemeContext);
  const customStyle = {
    backgroundColor: theme.background,
    width: width ? width : windowWidth*0.7,
  };
  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent={true}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.background}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.mainBox, customStyle]}>
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
    borderRadius: 10,
    padding: 10,
  },
});
