import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Font from '../theme/fonts';
import Color from '../theme/color';

const PrimaryButton = ({placeholder, onClick, width, height, style, bold}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...style,
        ...styles.buttonStyle,
        width: wp(width || 70),
        height: wp(height || 12.5),
      }}>
      <Text
        style={
          bold
            ? {...styles.text, fontFamily: Font.SFProTextSemibold}
            : styles.text
        }>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondary,
    width: wp(70),
    height: wp(10),
    borderRadius: wp(2),
  },
  text: {
    color: Color.PrimaryText,
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
  },
};
