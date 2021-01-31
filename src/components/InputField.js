import React, {useState} from 'react';
import {View, TextInput, Image, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../theme/color';
import Fonts from '../theme/fonts';
import EyeIcon from '../assets/images/eye.svg';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  isPassword,
  nonEditable
}) => {
  const [focused, setFocused] = useState(false);

  return (
      <FloatingLabelInput
        label={placeholder}
        value={value}
        onChangeText={onChangeText}
        customLabelStyles={{
          fontSizeFocused: wp(3.5),
        }}
        style={{color:'#000'}}
        editable={nonEditable?false:true}
        labelStyles={value?{paddingBottom: wp(3)}:{paddingBottom: wp(1)}}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
        isPassword={isPassword?true:false}
        containerStyles={focused?styles.activeInputContainerStyle:styles.inputContainerStyle}
        customShowPasswordComponent={<EyeIcon height={wp(5)} width={wp(8)} />}
        customHidePasswordComponent={<EyeIcon height={wp(5)} width={wp(8)} />}
      />
  );
};

export default InputField;

const styles = {
  inputContainerStyle: {
    borderBottomColor: Color.primary,
    borderBottomWidth: 0.3,
    marginBottom: wp(7),
    height:wp(10),
    marginHorizontal:wp(8)
  },
  activeInputContainerStyle:{
    borderBottomColor: '#000',
    borderBottomWidth: wp(0.4),
    marginBottom: wp(7),
    height:wp(10),
    marginHorizontal:wp(8)
  },
  inputStyle: {
    flex: 1,
    fontSize: wp(3.5),
    color: '#000',
    paddingBottom: wp(1.5),
    fontFamily: Fonts.SFProText,
  },
};
