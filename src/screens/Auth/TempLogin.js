import React from 'react';
import {Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../theme/color';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import Fonts from '../../theme/fonts';

export default function UserType({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>eAttendance</Text>
      <Text style={styles.subHeading}>
        Easy way to Track & Record Attendance
      </Text>
      <View style={styles.userButtonHolder}>
        <PrimaryButton
          onClick={() => navigation.navigate('DashboardStack',{employee:false})}
          placeholder="I am a Manager"
          bold
        />
        <SecondaryButton
          onClick={() => navigation.navigate('DashboardStack',{employee:true})}
          placeholder="I am an Employee"
          bold
        />
      </View>
    </View>
  );
}

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
  userButtonHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(100),
    marginTop: wp(10),
    alignItems: 'center',
  },
};
