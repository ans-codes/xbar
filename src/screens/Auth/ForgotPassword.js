import React, {useState} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [Loading, setLoading] = useState(false);
  const [showError, setshowError] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}
      behavior="padding">
      
      <TouchableOpacity
      onPress={()=>props.navigation.goBack()}
      style={styles.back}>
      <Image
      source={require('../../assets/images/arrowLeft.png')}
      style={{height:wp(4),width:wp(4)}}
      />
      </TouchableOpacity>

      <Text style={styles.heading}>Forgot your password?</Text>

      <Text style={{...styles.subHeading, width: wp(75)}}>
        Enter your registered email below to receive password reset instruction
      </Text>

    
      <View style={{marginBottom: wp(8)}}>
        {showError && <Text style={{color: '#ff4d4d'}}>{showError}</Text>}
      </View>

      <InputField
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryButton
        placeholder="SEND"
        onClick={() => props.navigation.navigate('EmailSent')}
        bold
      />

      <View style={styles.row}>
        <Text style={styles.subHeading}>Remember Password?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text
            style={{
              ...styles.subHeading,
              color: 'red',
              fontFamily: Fonts.SFProTextSemibold,
            }}>
            {' '}
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back:{
    alignSelf:'flex-start',
    height:wp(15),
    width:wp(20),
    justifyContent:'center',
    alignItems:'center',
  },
  heading: {
    color: Color.primary,
    fontSize: wp(5),
    fontFamily: Fonts.SFProTextSemibold,
    marginBottom: wp(5),
    marginTop: wp(10),
  },
  subHeading: {
    color: '#000',
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    marginBottom: wp(5),
    textAlign: 'center',
  },
  forgotPassword: {
    color: Color.primary,
    fontFamily: Fonts.SFProTextSemibold,
    fontSize: wp(4),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: wp(11),
    width: wp(11),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: wp(11) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 1,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(25),
    marginBottom: wp(25),
  },
  socialIconStyle: {
    height: wp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
};

export default Login;
