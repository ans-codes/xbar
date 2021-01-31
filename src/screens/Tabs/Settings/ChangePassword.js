import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Fonts from '../../../theme/fonts';
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import User from '../../../services/User';

const Login = (props) => {
  const [previousPw, setPreviousPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onUpdatePassword = () => {
    setErrorMessage('');
    if (previousPw.length === 0 || newPw.length === 0) {
      setErrorMessage('All fields are required.');
      return;
    } else if (newPw !== confirmPw) {
      setErrorMessage("Your passwords doesn't match.");
      return;
    } else if (newPw.length < 6) {
      setErrorMessage('Password must be of 6 characters.');
      return;
    } else if (newPw === previousPw) {
      setErrorMessage('Old password cannot be used as new password.');
      return;
    }

    setLoading(true);

    User.UpdatePassword(
      previousPw,
      newPw,
      () => {
        setLoading(false);
        setPreviousPw('');
        setNewPw('');
        setConfirmPw('');
        alert('Your password is updated successfully.');
        props.navigation.goBack();
      },
      (err) => {
        setLoading(false);
        setPreviousPw('');
        setNewPw('');
        setConfirmPw('');
        const {code, message} = err;
        if (code === 'auth/wrong-password') {
          setErrorMessage('Your previous password is incorrect.');
        } else {
          alert(message.split(']')[1]);
        }
      },
      (socialErr) => {
        alert(socialErr);
        setLoading(false);
        props.navigation.goBack();
      },
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}
      behavior="padding">
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.back}>
        <Image
          source={require('../../../assets/images/arrowLeft.png')}
          style={{height: wp(4), width: wp(4)}}
        />
      </TouchableOpacity>

      <Text style={styles.heading}>Change password</Text>

      <Text style={{...styles.subHeading, width: wp(75)}}>
        Your new password must be different from previous used password.
      </Text>

      <View style={{marginBottom: wp(8)}}>
      <Text style={{color: '#ff4d4d'}}>{errorMessage}</Text>
      </View>

      <InputField
        placeholder="Current Password"
        value={previousPw}
        onChangeText={setPreviousPw}
      />
      <InputField
        placeholder="New Password"
        value={newPw}
        onChangeText={setNewPw}
      />
      <InputField
        placeholder="Repeat Password"
        value={confirmPw}
        onChangeText={setConfirmPw}
      />

      <PrimaryButton
        placeholder="UPDATE PASSWORD"
        onClick={onUpdatePassword}
        isLoading={loading}
        bold
      />
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    alignSelf: 'flex-start',
    height: wp(15),
    width: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
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
