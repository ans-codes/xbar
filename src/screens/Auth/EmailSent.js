import React, {useState} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts';
import PrimaryButton from '../../components/PrimaryButton';

const EmailSent = (props) => {
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

      <Text style={styles.heading}>Email has been sent!</Text>

      <Text style={{...styles.subHeading, width: wp(75)}}>
        Please check your inbox and click in the received link to reset a
        password
      </Text>

      <Image
        source={require('../../assets/images/forgotPassword.png')}
        style={{
          height: wp(60),
          width: wp(60),
          resizeMode: 'contain',
          marginTop: wp(15),
          marginBottom: wp(22),
        }}
      />
      <PrimaryButton
        placeholder="LOGIN"
        onClick={() => props.navigation.navigate('Login')}
        bold
      />

      <View style={styles.row}>
        <Text style={styles.subHeading}>Didn't receive the link?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              ...styles.subHeading,
              color: 'red',
              fontFamily: Fonts.SFProTextSemibold,
            }}>
            {' '}
            Resend
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

export default EmailSent;
