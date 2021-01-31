import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../theme/color';
import Fonts from '../theme/fonts';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import {PickImage, UploadImageToStorage} from '../helpers/Images';
import {updateUser} from '../redux/User/actions';
import User from '../services/User';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
const Profile = (props) => {
  console.log(props.user)
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(props.user.email);
  const [bio, setBio] = useState(props.user.bio);
  const [number, setNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(props.user.imageUrl);
  const [img, setImg] = useState();
  const [loading,setLoading] = useState(false);
  const handleImagePicker = () => PickImage(setImage,setImg);

  const onUpdatePress = () => {
    setLoading(true);
    if (typeof img === 'object') {
      UploadImageToStorage(img, 'Users',props.user.uid, (url) => {
        handleDataUpdate(url);
      });
    } else {
      handleDataUpdate(image);
    }
  };

  const handleDataUpdate = (image_url) => {
    User.UpdateProfile(
      props.user.uid,
      {username:props.user.username, bio, imageUrl: image_url,number,emergencyContact,address},
      (res) => {
        setLoading(false);
        props.reduxUpdateUser({username:props.user.username, bio, imageUrl: image_url
          ,number,emergencyContact,address});
        setEdit(!edit);
      },
      (err) => {
        console.log(err);
        setLoading(false);
        setEdit(!edit);
      },
    );
  };
  
  const header = (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.back}>
        <Image
          source={require('../assets/images/arrowLeft.png')}
          style={{height: wp(4), width: wp(4)}}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Profile</Text>
     
    </View>
  );
  const ProfileBox = (
    <View style={styles.profileBox}>
      <Image
        source={
          image
            ? {uri: image}
            : {
                uri:
                  'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg',
              }
        }
        style={{
          height: wp(20),
          width: wp(20),
          marginLeft: wp(5),
          borderRadius: wp(20),
        }}
      />

      <View style={{flex: 1, marginLeft: wp(4)}}>
        <Text style={{color: 'gray'}}>Hello,</Text>
        <Text style={{color: '#000'}}>
          {props.user.username}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setEdit(!edit)} style={styles.edit}>
      <Feather name="edit" size={wp(5)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  const EditProfileBox = (
    <View style={styles.editProfileBox}>
      <Image
        source={
          image
            ? {uri: image}
            : {
                uri:
                  'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg',
              }
        }
        style={{
          height: wp(30),
          width: wp(30),
          marginLeft: wp(5),
          borderRadius: wp(30),
        }}
      />
      <TouchableOpacity onPress={handleImagePicker}  style={styles.camera}>
      <Feather name="camera" size={wp(4)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      {header}
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.container}
        behavior="padding">
        {edit ? EditProfileBox : ProfileBox}
        <InputField 
        placeholder="Bio" 
        value={bio} 
        onChangeText={setBio}
        nonEditable={edit?false:true}
        />
        <InputField
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          nonEditable={true}
        />
        <InputField
          placeholder="Contact no"
          value={number}
          onChangeText={setNumber}
          nonEditable={edit?false:true}
        />
        <InputField
          placeholder="Emergency Contact no"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          nonEditable={edit?false:true}
        />
        <InputField
          placeholder="Home Address"
          value={address}
          onChangeText={setAddress}
          nonEditable={edit?false:true}
        />

        {edit && (
          <PrimaryButton
            placeholder="Save Changes"
            width={40}
            height={12}
            isLoading={loading}
            onClick={() => {
              onUpdatePress()
            }}
            bold
          />
        )}
      </ScrollView>
    </View>
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
  edit: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
    marginRight: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'absolute',
    right: wp(31),
    bottom: wp(10),
    borderColor:'#fff',
    borderWidth: wp(0.8),
  },
  heading: {
    flex: 1,
    color: '#000',
    fontSize: wp(5),
    fontFamily: Fonts.SFProTextSemibold,
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  profileBox: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: wp(40),
    marginBottom: wp(8),
  },
  editProfileBox: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: wp(50),
    marginBottom: wp(8),
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxUpdateUser: (fields) => dispatch(updateUser(fields)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
