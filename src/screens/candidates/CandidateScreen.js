import React from 'react';
import {View} from 'react-native';
import Candidate from 'src/components/candidates/Candidate';

function CandidateScreen(props) {
  return (
    <View>
      <Candidate {...props}/>
    </View>
  );
}


export default CandidateScreen;
