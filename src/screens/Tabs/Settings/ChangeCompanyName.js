import React, {useState} from 'react';
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
import PrimaryButton from '../../../components/PrimaryButton';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

const ChangeCompanyName = ({navigation}) => {
  const [companyName, setCompanyName] = useState('');

  async function updateSettings() {
    const userData = await AsyncStorage.getItem('@userUID');
    var user = await firestore().collection('users').doc(userData).update({
      company: companyName,
    });
  }
  const header = (
    <ImageBackground
      source={require('../../../assets/images/addEmployee.png')}
      style={styles.headerImage}
      imageStyle={{resizeMode: 'stretch'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerHeading}>Change our Company name</Text>
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
          <Text style={styles.invite}>Add Name and Confirm</Text>
          <TextInput
            placeholder="LogicFab"
            style={styles.inputStyle}
            value={companyName}
            onChangeText={setCompanyName}
          />
          <PrimaryButton
            placeholder="CONFIRM"
            bold
            width={65}
            onClick={() => {
              if (companyName != '') {
                updateSettings();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangeCompanyName;

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
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: wp(4),
  },
  headerSubheading: {
    fontSize: wp(4),
    fontFamily: Font.SFProText,
    color: '#fff',
    width: wp(70),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: wp(5),
  },
  invite: {
    fontSize: wp(4),
    fontFamily: Font.SFProTextSemibold,
    color: Color.red,
  },
  inputStyle: {
    width: wp(80),
    borderBottomColor: '#8d8d8d',
    paddingBottom: wp(1),
    borderBottomWidth: wp(0.2),
    marginBottom: wp(20),
    marginTop: wp(10),
  },
});
