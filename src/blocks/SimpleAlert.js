import React, {useContext} from 'react';
import {Dimensions, View, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Text from './Text';
import {ThemeContext} from 'src/context';

const {width, height} = Dimensions.get('window');

export default function SimpleAlert({modalOpen, setModalOpen, title, content, onCancel, onOk}) {
  const {theme} = useContext(ThemeContext);
  return (
    <Modal visible={modalOpen} onRequestClose={() => setModalOpen(false)} transparent={true}>
      <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.mainBox, {backgroundColor: theme.background}]}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.contentText}>{content}</Text>
              <View style={styles.buttonWrapper}>
                {onCancel &&
                  <Button onPress={onCancel}>
                    Cancel
                  </Button>
                }
                {onOk &&
                  <Button onPress={onOk}>
                    OK
                  </Button>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  mainBox: {
    justifyContent: 'space-evenly',
    width: width*0.85,
    minHeight: height*0.2,
    borderRadius: 15,
    padding: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  contentText: {
    fontSize: 14,
  },
});
