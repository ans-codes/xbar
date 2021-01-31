import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Color from '../theme/color';
import Fonts from '../theme/fonts';
import ProfileListItem from '../screens/Tabs/Settings/ProfileListItem';
import {createStackNavigator} from '@react-navigation/stack';
import ChangeOfficeTime from '../screens/Tabs/Settings/ChangeOfficeTime';
import ChangePassword from '../screens/Tabs/Settings/ChangePassword';
import ChangeCompanyName from '../screens/Tabs/Settings/ChangeCompanyName';
import Attendance from '../screens/Tabs/Home//Attendance';
import AddLeave from '../screens/Tabs/Home/AddLeave';
import UserType from '../screens/Auth/UserType';
import Profile from '../screens/Profile';
import {logoutUser,updateUser} from '../redux/User/actions';
import {connect} from 'react-redux';
import User from '../services/User';

const Stack = createStackNavigator();

const Setting = ({props}) => {
  const [user,setUser] = useState();
  useEffect(() => {
    try {
        firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .onSnapshot(doc => {
          setUser(doc.data());
        });
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const switchAccount = ()=>{
    if(user.type === 'Manager'){
      if (props.user.type === 'Manager') {
        props.reduxUpdateUser({type:'Employee'})
      } else {
        props.reduxUpdateUser({type:'Manager'})
      }
    }else{
      alert('You are not allowed to perform such a switch')
    }
  }

  const header = (
    <View style={styles.row}>
      <Text style={styles.heading}>Settings</Text>
    </View>
  );
  const ProfileBox = (
    <View style={styles.profileBox}>
      <Image
        source={
        props.user.imageUrl
        ?{
          uri:props.user.imageUrl
        }
        :{
          uri:
            'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg',
        }}
        style={{
          height: wp(13),
          width: wp(13),
          marginLeft: wp(5),
          borderRadius: wp(13),
        }}
      />

      <View style={{flex: 1, marginLeft: wp(4), marginTop: wp(2)}}>
        <Text style={{color: '#000'}}>
        Hi, {props.user.username}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
      {header}
      <View style={{alignItems: 'center'}}>
        {ProfileBox}

        <View style={styles.bigBox}>
          <ScrollView showsVerticalScrollIndicator={false}>

          <ProfileListItem
              iconGroup="Feather"
              iconName="user"
              title="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />

            <ProfileListItem
              iconGroup="Feather"
              iconName="lock"
              title="Change Password"
              onPress={() => props.navigation.navigate('ChangePassword')}
            />

            {props.user.type === 'Manager' ? (
              <ProfileListItem
                iconGroup="Feather"
                iconName="clock"
                title="Change Office Time"
                onPress={() => props.navigation.navigate('ChangeOfficeTime')}
              />
            ) : null}

            {props.user.type === 'Manager' ? (
              <ProfileListItem
                iconGroup="Feather"
                iconName="briefcase"
                title="Change Company Name"
                onPress={() => props.navigation.navigate('ChangeCompanyName')}
              />
            ) : null}

            <ProfileListItem
              iconGroup="MaterialCommunityIcons"
              iconName="calendar-clock"
              title="My Attendance"
              onPress={() => props.navigation.navigate('Attendance')}
            />
            <ProfileListItem
              iconGroup="MaterialCommunityIcons"
              iconName="account-key"
              title="Change/Manager Mode"
              onPress={switchAccount}
            />
            <ProfileListItem
              iconGroup="MaterialCommunityIcons"
              iconName="calendar"
              title="Request for Leave"
              onPress={() => props.navigation.navigate('AddLeave')}
            />
            <ProfileListItem
              iconGroup="Feather"
              iconName="home"
              title="Add work at home"
            />
            <ProfileListItem
              iconGroup="Feather"
              iconName="power"
              title="Logout"
              onPress={() => {
                User.LogoutUser((success) => {
                  props.reduxLogout()
                }, 
                (err) => {
                  console.log('ERR',err);
                });
                
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

function SettingStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Settings" 
      children={()=><Setting props={{...props}}/>} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangeOfficeTime" component={ChangeOfficeTime} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeCompanyName" component={ChangeCompanyName} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="AddLeave" component={AddLeave} />
      <Stack.Screen name="UserType" component={UserType} />
    </Stack.Navigator>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reduxLogout: () =>dispatch(logoutUser()),
    reduxUpdateUser: (fields) => dispatch(updateUser(fields)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingStack);

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
    backgroundColor: '#fff',
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
    borderColor: Color.primary,
    borderWidth: wp(0.5),
  },
  heading: {
    flex: 1,
    color: '#000',
    fontSize: wp(5),
    fontFamily: Fonts.SFProTextSemibold,
    margin:wp(5)
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
    paddingTop: wp(5),
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: wp(50),
    marginBottom: wp(8),
  },
  bigBox: {
    backgroundColor: '#fff',
    width: wp(100),
    height: hp(60),
    marginTop: -wp(30),
  },
};
