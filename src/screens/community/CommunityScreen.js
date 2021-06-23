import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Community from 'src/components/community/Community';

function CommunityScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Community {...props}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommunityScreen;
