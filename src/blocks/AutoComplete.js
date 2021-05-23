import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

function AutoComplete({candList, value, onClickText, onChangeText, placeholder}) {
  const [clicked, setClicked] = useState(false);
  if (typeof(placeholder) == 'undefined') {
    placeholder = 'type message to search';
  }
  const queryFilter = (x) => {
    if (x.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  let filteredCand = [];
  if (candList) {
    filteredCand = candList.filter(queryFilter);
  }
  const showCandList = () => {
    if (value && !clicked) {
      return (
        <ScrollView>
          {filteredCand.map((item) => {
            return (
              <TouchableOpacity onPress={() => {
                onClickText(item);
                setClicked(true);
              }} key={item}>
                <View style={styles.candidateContainer}>
                  <Text style={styles.candidateText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    } else {
      return;
    }
  };

  return (
    <View>
      <Searchbar
        placeholder={placeholder}
        onChangeText={(text) => {
          onChangeText(text);
          setClicked(false);
        }}
        value={value}
      />
      {showCandList()}
    </View>
  );
}

const styles = StyleSheet.create({
  candidateContainer: {
    height: 25,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  candidateText: {
    fontSize: 15,
  },
})

export default AutoComplete;
