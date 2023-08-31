import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constants/Colors';

const CustomBackBtn = props => {
  return (
    <View style={styles.box}>
      <TextInput />
      <MaterialIcons name="arrow-back" size={35} color={Colors.fontColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBackBtn;
