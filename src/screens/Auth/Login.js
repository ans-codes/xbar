import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

import User from '../../services/User';
import { loginUser } from '../../redux/User/actions';
import { connect } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

GoogleSignin.configure({
webClientId: '1043659876422-s5ep5424pjgpqgi9ieea6st3ug9broi3.apps.googleusercontent.com',
scopes: ['profile', 'email'],
});

async function onGoogleButtonPress() {
const { idToken } = await GoogleSignin.signIn();
const googleCredential = auth.GoogleAuthProvider.credential(idToken);
return auth().signInWithCredential(googleCredential);
}

async function onFacebookButtonPress() {
const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
if (result.isCancelled) {
  throw 'User cancelled the login process';
}
const data = await AccessToken.getCurrentAccessToken();
if (!data) {
  throw 'Something went wrong obtaining access token';
}

const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
return auth().signInWithCredential(facebookCredential);
}

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true);
    }
    return (false);
  }

  const googleLogin = () => {
    setGoogleLoading(true);
    onGoogleButtonPress()
      .then((response) => {
        User.SignInUsingGoogle(
          response.additionalUserInfo.isNewUser,
          response.user.uid,
          response.additionalUserInfo.profile.given_name + ' ' + response.additionalUserInfo.profile.family_name,
          response.user.email,
          response.additionalUserInfo.profile.picture,
          (data) => {
            props.reduxLoginUser(data);
            setGoogleLoading(false);
          },
          (err) => {
            console.log({ err });
            setErrorMessage(err);
            setGoogleLoading(false);
          },
        );
      })
  }

  const facebookLogin = () => {
    setFacebookLoading(true);
    onFacebookButtonPress()
      .then((response) => {
        User.SignInUsingFacebook(
          response.additionalUserInfo.isNewUser,
          response.user.uid,
          response.user.displayName,
          response.user.email,
          response.additionalUserInfo.profile.picture.data.url,
          (data) => {
            props.reduxLoginUser(data);
            setFacebookLoading(false);
          },
          (err) => {
            console.log({ err });
            setErrorMessage(err);
            setFacebookLoading(false);
          },
        );
      })
  }

  const onLoginUser = () => {
    setErrorMessage('');
    if (!email.trim().length) {
      setErrorMessage('Email Empty.');
    }
    else if (!validateEmail(email.trim())) {
      setErrorMessage('Invalid Email Format.');
    }
    else if (!password.length) {
      setErrorMessage('Password Empty.');
    }
    else if (password.length < 6) {
      setErrorMessage('Password must be of 6 characters.');
    }
    else {
      setLoading(true);
      User.Login(
        email.trim(),
        password,
        (data) => {
          setLoading(false);
          props.reduxLoginUser(data);
        },
        (err) => {
          console.log({ err });
          setLoading(false);
          setErrorMessage('No User Account Found.');
        },
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}
      behavior="padding">
      <Text style={styles.heading}>Login</Text>

      <View style={{marginBottom: wp(8)}}>
      <Text style={{color: '#ff4d4d'}}>{errorMessage}</Text>
      </View>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
      />

      <TouchableOpacity
        onPress={() => props.navigation.navigate('ForgotPassword')}
        style={{
          alignSelf: 'flex-end',
          marginRight: wp(8),
          marginBottom: wp(8),
        }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <PrimaryButton
        placeholder="LOGIN"
        onClick={() => {
          onLoginUser();
        }}
        bold
        isLoading={loading}
      />

      <Text style={styles.subHeading}>Or Login using social media</Text>

      <View style={styles.socialButtonContainer}>
        {googleLoading
        ?  <View style={styles.circle}>
        <ActivityIndicator size='large' color={Color.primary} />
         </View>
        : <TouchableOpacity onPress={googleLogin} style={styles.circle}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.socialIconStyle}
          />
        </TouchableOpacity>}

        {facebookLoading
        ?<View style={styles.circle}>
        <ActivityIndicator size='large' color={Color.primary} />
         </View>
        :<TouchableOpacity onPress={facebookLogin} style={styles.circle}>
          <Image
            source={require('../../assets/images/facebook.png')}
            style={styles.socialIconStyle}
          />
        </TouchableOpacity>}
      </View>

      <View style={styles.row}>
        <Text style={styles.subHeading}>Don't have account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupEmployee')}>
          <Text
            style={{
              ...styles.subHeading,
              color: 'red',
              fontFamily: Fonts.SFProTextSemibold,
            }}>
            {' '}
            Register
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
  back: {
    alignSelf: 'flex-start',
    height: wp(15),
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
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
  forgotPassword: {
    color: Color.primary,
    fontFamily: Fonts.SFProTextSemibold,
    fontSize: wp(4),
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
    marginBottom: wp(25),
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

export default connect(null, mapDispatchToProps)(Login);
