import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog from './Dialog';
import SimpleAlert from './SimpleAlert';
import Text from './Text';
import {report} from 'src/utils/Report';

export default function ReportDialog({visible, onDismiss, objectID, userID, type}) {
  const [alertOpen, setAlertOpen] = useState(false);

  const onReportMessage = async (message) => {
    await report(objectID, userID, type, message);
    setAlertOpen(true);
    onDismiss();
  };

  const CandidateItem = ({value}) => {
    return (
      <TouchableOpacity onPress={async () => await onReportMessage(value)} >
        <Text style={styles.candidate}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Text style={styles.title}>신고하는 이유를 적어주세요.</Text>
        <CandidateItem value='욕설/비하'/>
        <CandidateItem value='정당/정치인 비하 및 선거운동'/>
        <CandidateItem value='낚시/도배'/>
        <CandidateItem value='상업적 광고 및 판매'/>
        <CandidateItem value='음란물/불건전한 만남 및 대화'/>
        <CandidateItem value='유출/사칭/사기'/>
      </Dialog>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='신고가 접수되었습니다.'
        content='신고는 운영자에게 전달됩니다.'
        onOk={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 0,
  },
  candidate: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
