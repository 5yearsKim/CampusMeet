import React, {useState} from 'react';
import {Dimensions, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet} from 'react-native';
import Text from './Text';
import {MaterialIcons} from '@expo/vector-icons'; 

const {width, height} = Dimensions.get('window');

function PickerItem({item, onSelectItem, setModalOpen}) {
  const onClick = () => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    setModalOpen(false);
  };
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={styles.itemBox}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Picker({candidate, placeholder, onSelectItem}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <View>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.buttonStyle}>
          <Text>{placeholder}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Modal visible={modalOpen} onRequestClose={() => setModalOpen(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.mainBox}>
                <FlatList
                  data={candidate}
                  renderItem={({item}) => <PickerItem item={item} onSelectItem={onSelectItem} setModalOpen={setModalOpen}/>}
                  keyExtractor={(item) => item.label}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  mainBox: {
    width: width * 0.6,
    minHeight: height * 0.3,
    maxHeight: height * 0.5,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 15,
  },
  itemBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
})