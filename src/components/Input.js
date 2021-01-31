import React from 'react';
import {Text, View, TextInput} from 'react-native';
import Fonts from '../theme/Fonts';
import Color from '../theme/Color';
import {wp} from '../helpers/Responsiveness';

const Input = ({placeholder}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.placeholderStyle}>{placeholder}</Text>
      <TextInput style={styles.inputStyle} />
    </View>
  );
};

export default Input;

const styles = {
  inputContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    marginTop: wp(8),
  },
  placeholderStyle: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
  },
  inputStyle: {
    borderBottomWidth: wp(0.3),
    borderBottomColor: Color.primary,
    fontSize: wp(4.3),
    fontFamily: Fonts.SFProDisplay,
    color: '#000',
    marginTop: wp(3),
  },
};
