import React, {useState} from 'react';
import {View} from 'react-native';
import Dialog from './Dialog';

export default function Agreement({visible, onDismiss, onOk}) {
  const [valid, setValid] = useState(false);
  return (
    <Dialog>
    </Dialog>
  );
}