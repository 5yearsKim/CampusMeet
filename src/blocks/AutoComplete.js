import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

function AutoComplete({candList, value, onClickText, onChangeText, placeholder, maxCand, style}) {
  const [clicked, setClicked] = useState(false);
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
    if (maxCand && !isNaN(maxCand)) {
      filteredCand = filteredCand.slice(0, maxCand);
    }
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
        style={style}
      />
      {showCandList()}
    </View>
  );
}

const styles = StyleSheet.create({
  candidateContainer: {
    // height: 25,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
    padding: 7,
  },
  candidateText: {
    fontSize: 16,
  },
})

export default AutoComplete;
