import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  TextInput,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../../components/PrimaryButton';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

const ChangeOfficeTime = ({navigation}) => {
  const [officeAddress, setOfficeAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  async function updateSettings() {
    const userData = await AsyncStorage.getItem('@userUID');
    var user = await firestore().collection('users').doc(userData).update({
      startTime: startTime,
      endTime: endTime,
      address: officeAddress,
    });
  }
  const header = (
    <ImageBackground
      source={require('../../../assets/images/changeTime.png')}
      style={styles.headerImage}
      imageStyle={{resizeMode: 'stretch'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerHeading}>Change {'\n'}Office Timing</Text>
      <Text style={styles.headerSubheading}>
        Reference site about Lorem Ipsum, giving information on its origins, as
        well as a random.
      </Text>
    </ImageBackground>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
      <ScrollView>
        {header}
        <View style={{alignItems: 'center', marginTop: wp(10)}}>
          <TextInput
            placeholder="Office Address"
            placeholderTextColor={Color.red}
            style={styles.inputStyle}
            value={officeAddress}
            onChangeText={setOfficeAddress}
          />
          <TextInput
            placeholder="- - : - -"
            style={styles.inputStyle}
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            placeholder="- - : - -"
            style={styles.inputStyle}
            value={endTime}
            onChangeText={setEndTime}
          />
          <PrimaryButton
            placeholder="CHANGE TIMING"
            bold
            width={65}
            onClick={() => {
              if (startTime.length > 3 && endTime.length > 3) {
                updateSettings();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangeOfficeTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: wp(70),
    width: wp(100),
  },
  back: {
    height: wp(15),
    width: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerHeading: {
    fontSize: wp(7),
    fontFamily: Font.SFProTextSemibold,
    color: '#fff',
    width: wp(70),
    textAlign: 'left',
    marginLeft: wp(8),
    marginTop: wp(4),
  },
  headerSubheading: {
    fontSize: wp(4),
    fontFamily: Font.SFProText,
    color: '#fff',
    width: wp(65),
    textAlign: 'left',
    marginLeft: wp(8),
    marginTop: wp(5),
  },
  inputStyle: {
    width: wp(80),
    borderBottomColor: '#8d8d8d',
    paddingBottom: wp(1),
    borderBottomWidth: wp(0.2),
    marginBottom: wp(10),
    fontSize: wp(5),
    fontSize: wp(4),
    fontFamily: Font.SFProTextSemibold,
  },
});
