import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SliderBox} from 'react-native-image-slider-box';
import Color from '../../theme/color';
import Fonts from '../../theme/fonts'
const images = [
  require('../../assets/images/tourOne.png'),
  require('../../assets/images/tourTwo.png'),
];
const Tour = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoginNavigator');
    }, 8000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text
        style={styles.heading}>
        eAttendance
      </Text>
      <Text
        style={styles.subHeading}>
        Easy way to Track & Record Attendance
      </Text>
      <View
        style={{height: wp(80), width: wp(80)}}>
        <SliderBox
          images={images}
          sliderBoxHeight={wp(65)}
          parentWidth={wp(80)}
          dotColor="#032E5B"
          inactiveDotColor="#9D9DA7"
          dotStyle={{
            width: 30,
            height: 7,
            borderRadius: 10,
            marginHorizontal: 0,
            paddingHorizontal: 10,
          }}
          paginationBoxStyle={{
              marginBottom:-wp(13)
          }}
          autoplay
          resizeMode={'contain'}
          imageLoadingColor="#ffcc00"
        />
      </View>


        <TouchableOpacity
        style={{flexDirection:'row',alignItems:'center',position:'absolute',
    bottom:wp(20)}}
        onPress={() => navigation.navigate('LoginNavigator')}>
        <Text
        style={styles.skip}>
        SKIP
        </Text>
        <Image
        source={require('../../assets/images/arrowRight.png')}
        style={styles.arrowForward}
        />
        </TouchableOpacity>

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
  skip:{
    fontSize: wp(5),
    color: '#484848',
    fontFamily:Fonts.SFProTextSemibold,
    letterSpacing:wp(0.5)
    },
    arrowForward:{
      height:wp(7),
      width:wp(7),
      resizeMode:'contain',
      marginLeft:wp(4)
    }
};

export default Tour;
