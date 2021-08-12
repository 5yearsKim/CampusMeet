import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Dialog from './Dialog';
import SimpleAlert from './SimpleAlert';
import Text from './Text';
import {TextInput, Button} from 'react-native-paper';
import {report} from 'src/utils/Report';

export default function ReportDialog({visible, onDismiss, objectID, userID, type}) {
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  return (
    <View>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Text style={styles.title}>신고하는 이유를 적어주세요.</Text>
        <TextInput
          mode='flat'
          style={{backgroundColor: 'transparent', maxHeight: 100}}
          multiline
          label='신고 이유'
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button
          disabled={disabled}
          onPress={async () => {
            setDisabled(true);
            await report(objectID, userID, type, message);
            onDismiss();
            setAlertOpen(true);
          }}
        >
          신고하기
        </Button>
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
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 0,
  },
});
