import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { firebase } from '@react-native-firebase/auth';

const Splash = ({navigation}) => {

  useEffect(() => {
   setTimeout(() => {
    navigation.navigate("LoginNavigator");
   }, 500);
  }, [navigation])


  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/splashTop.png')}
        style={styles.imageTopStyle}
      />
      <Image
        source={require('./../../assets/images/splashMiddle.png')}
        style={styles.imageMiddleStyle}
      />
      <Image
        source={require('./../../assets/images/splashTop.png')}
        style={styles.imageBottomStyle}
      />
    </View>
  );
};

export default Splash;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  imageTopStyle: {
    height: wp(60),
    width: wp(100),
    resizeMode: 'contain',
  },
  imageMiddleStyle: {
    height: wp(15),
    width: wp(60),
    resizeMode: 'contain',
    marginTop: wp(20),
  },
  imageBottomStyle: {
    height: wp(100),
    width: wp(100),
    resizeMode: 'contain',
  },
};
