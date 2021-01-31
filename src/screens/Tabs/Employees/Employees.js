import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import {createStackNavigator} from '@react-navigation/stack';
//Stack Screens
import Requests from './Requests';
import EmployeeList from './EmployeeList'
import EmployeeDetail from './EmployeeDetail';
import AddEmployee from './AddEmployee';

const Stack = createStackNavigator();

function GridItem({label, badge, badgeCount, icon, onPress}) {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.grid}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>

      {badge && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const Employees = ({navigation}) => {
  const header = (
    <View style={[styles.header, styles.row]}>
      <View>
        <Text style={styles.headerSubheading}>Welcome Back</Text>
        <Text style={styles.headerHeading}>Muhammad Ali</Text>
      </View>
      <Image
        source={{uri:'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg'}}
        style={styles.imageStyle}
      />
    </View>
  );

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      {header}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}>
        <GridItem
          label="Notification"
          badge
          badgeCount={10}
          icon={require('../../../assets/images/notifications.png')}
        />
        <GridItem
          label="Requests"
          badge
          badgeCount={3}
          icon={require('../../../assets/images/requests.png')}
          onPress={()=>navigation.navigate('Requests')}
        />
        <GridItem
          label="Team"
          icon={require('../../../assets/images/team.png')}
          onPress={()=>navigation.navigate('EmployeeList')}
        />
        <GridItem
          label="Attendance"
          icon={require('../../../assets/images/timetable.png')}
        />
        <GridItem
          label="Profile"
          icon={require('../../../assets/images/profile.png')}
        />
        <GridItem
          label="Settings"
          icon={require('../../../assets/images/settings.png')}
        />
      </ScrollView>
    </View>
  );
};

export default function(){
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Employees" component={Employees}/>
            <Stack.Screen name="Requests" component={Requests}/>
            <Stack.Screen name="EmployeeList" component={EmployeeList}/>
            <Stack.Screen name="EmployeeDetail" component={EmployeeDetail}/>
            <Stack.Screen name="AddEmployee" component={AddEmployee}/>
        </Stack.Navigator>
    )
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubheading: {
    fontSize: wp(3.8),
    color: Color.yellow,
    fontFamily: Font.SFProText,
  },
  headerHeading: {
    fontSize: wp(6),
    fontFamily: Font.SFProTextSemibold,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    paddingTop: wp(5),
    paddingBottom: wp(4),
    elevation: 3,
  },
  imageStyle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    alignSelf: 'flex-end',
  },
  grid: {
    backgroundColor: '#fff',
    height: wp(40),
    width: wp(40),
    borderRadius: wp(4),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    margin: wp(3),
  },
  icon: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
  },
  label: {
    fontSize: wp(4),
    color: Color.primary,
    fontFamily: Font.SFProTextSemibold,
  },
  tag: {
    backgroundColor: Color.red,
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: wp(2),
    right: wp(2),
  },
  tagText: {
    fontSize: wp(3.5),
    color: '#fff',
    fontFamily: Font.SFProTextSemibold,
  },
  scrollStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: wp(5),
  },
};
