import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {loginUser} from '../../redux/User/actions';
import User from '../../services/User';
import {connect} from 'react-redux';

const SignupEmployee = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [type] = useState('Employee');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail=(email) =>
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return (true);
   }
    return (false);
  }


  const CreateUser = () => {
    setErrorMessage('');
    if (username.trim().length === 0) {
      setErrorMessage('Enter username.');
    } else if (email.trim().length === 0) {
      setErrorMessage('Enter email.');
    } else if (!validateEmail(email)){
      setErrorMessage('Invalid Email Format.');
    } else if (password.trim().length === 0) {
      setErrorMessage('Enter password.');
    } else if (password.length<6){
      setErrorMessage('Password must be of 6 characters.');
    }
    else {
      setLoading(true);
      User.RegisterEmployee(
        username,
        email,
        password,
        type,
        bio,
        (data) => {
          setErrorMessage('');
          props.reduxLoginUser(data);
          setLoading(false);
        },
        (err) => {
          console.log({err});
          setErrorMessage(err);
          setLoading(false);
        },
      );
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}
      behavior="padding">
       <Text style={styles.heading}>Signup</Text>

<Text style={{...styles.subHeading, width: wp(75)}}>
  Create an account
</Text>

      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: wp(10),
          alignItems: 'center',
        }}>

        <Text style={{color: '#ff4d4d', paddingBottom: 10}}>{errorMessage}</Text>

        <InputField
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Describe yourself"
          value={bio}
          onChangeText={setBio}
        />
        <InputField
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
      </View>

      <PrimaryButton
        placeholder="REGISTER"
        onClick={CreateUser}
        bold
        isLoading={loading}
      />

     
      <View style={styles.row}>
      
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
        <Text
          style={{...styles.subHeading, fontFamily: Fonts.SFProTextSemibold}}>
          {' '}
          here
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: Color.primary,
    fontSize: wp(7),
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp(5),
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
  },
  socialIconStyle: {
    height: wp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxLoginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignupEmployee);