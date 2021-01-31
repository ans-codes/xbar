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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../../components/PrimaryButton';
import firestore from '@react-native-firebase/firestore';

const AddEmployee = ({navigation, route}) => {
  const Data = route.params;
  const [email, setEmail] = useState('');

  async function sendInvite(checkEmail) {
    const usersRef = firestore().collection('users');
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      if (checkEmail === doc.data().email) {
        firestore().collection('users').doc(doc.id).update({
          company: Data.company,
          invited_by: Data.email,
        });
      }
    });
  }

  const header = (
    <ImageBackground
      source={require('../../../assets/images/addEmployee.png')}
      style={styles.headerImage}
      imageStyle={{resizeMode: 'contain'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerHeading}>Add team member in our team</Text>
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
          <Text style={styles.invite}>Add Email and Send Invite</Text>
          <TextInput
            placeholder="somename@gmail.com"
            style={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
          />
          <PrimaryButton
            placeholder="SEND"
            bold
            width={65}
            onClick={sendInvite(email)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEmployee;

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
