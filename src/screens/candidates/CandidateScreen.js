import React from 'react';
import {SafeAreaView} from 'react-native';
import Candidate from 'src/components/candidates/Candidate';

function CandidateScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Candidate {...props}/>
    </SafeAreaView>
  );
}


export default CandidateScreen;
