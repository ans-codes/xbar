import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts'
const WalkThrough = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.heading}>
       Xbar
      </Text>
      <Text
        style={styles.subHeading}>
         eAttendance for employee's and management
      </Text>
     
        <Image
        source={require('../../assets/images/tourThree.png')}
        style={{height:wp(60),width:wp(60),resizeMode:'contain',marginTop:wp(5)}}
        />
        
      <View style={{marginTop: wp('15')}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={{
            width: wp('80%'),
            height: wp('12%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(2),
            marginTop:wp(5),
            backgroundColor:'#000',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('UserType')}
          style={{
            width: wp('80%'),
            height: wp('12%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(2),
            marginTop:wp(5),
            backgroundColor:'#9D9DA7',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: wp(20),
    alignItems: 'center',
  },
  heading: {
    color: Color.primary,
    fontSize: wp(7),
    fontFamily: Fonts.SFProTextSemibold,
    marginBottom: wp(5),
  },
  subHeading: {
    color: Color.primary,
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    marginBottom: wp(5),
  },
};

export default WalkThrough;
