import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Font from '../theme/fonts';
import Color from '../theme/color';

const PrimaryButton = ({placeholder, onClick, width, height, style, bold, isLoading,placeholderStyle}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.buttonStyle,
        ...style,
        width: wp(width || 70),
        height: wp(height || 12.5),
      }}>
     {isLoading
     ?<ActivityIndicator
      color="#fff"
      size="small"
      />
      :<Text
        style={
          bold
            ? {...styles.text, fontFamily: Font.SFProTextSemibold,...placeholderStyle}
            : {...styles.text,...placeholderStyle}
        }>
        {placeholder}
      </Text>}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    width: wp(70),
    height: wp(10),
    borderRadius: wp(2),
    marginBottom:wp(5)
  },
  text: {
    color: Color.PrimaryText,
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
  },
};
