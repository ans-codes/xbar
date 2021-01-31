import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
const perMonths = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AttendanceItem = ({attendance,currentMonth}) => {
  return (
    <View style={styles.attendanceContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{attendance.date.slice(3,5)}</Text>
        <Text style={styles.dateText}>{perMonths[currentMonth]}</Text>
      </View>
      <View style={styles.punchContainer}>
        <Text style={{...styles.punchText, color: Color.primary}}>
          Punch In
        </Text>
        <Text style={{...styles.TimeText}}>{attendance.punchIn}</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.punchContainer}>
        <Text style={{...styles.punchText, color: Color.red}}>Punch Out</Text>
        <Text style={{...styles.TimeText, color: '#8d8d8d'}}>{attendance.punchOut}</Text>
      </View>
    </View>
  );
};

const Attendance = ({navigation}) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [changeYear, setChangeYear] = useState(true);
  const [attendance,setAttendance] = useState([]);
  useEffect(() => {
   let subscribe = null
   subscribe=firestore().collection('Users').doc(auth().currentUser.uid).collection('Attendance')
   .doc(`${months[currentMonth]}, ${currentYear}`).onSnapshot(snap=>{
     var arr = snap.data()
     Array.isArray(arr?.attendance)?setAttendance(arr.attendance):setAttendance([])
      
   })
   return () => subscribe = null
  }, [currentMonth])
  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="black" />
      </TouchableOpacity>
      <Text style={{...styles.heading, marginLeft: wp(3)}}>Attendance</Text>
    </View>
  );

  const swiper = (
    <View style={{marginVertical: wp(5)}}>
      <Swiper
        style={styles.wrapper}
        index={currentMonth - 1}
        showsButtons={true}
        horizontal={true}
        onIndexChanged={(index) => {
          if (index === 0) {
            setChangeYear(true);
          } else if (index === 11) {
            setChangeYear(true);
          } else {
            setChangeYear(false);
          }

          if (index === 0 && changeYear) {
            setCurrentYear(currentYear + 1);
          } else if (index === 11 && changeYear) {
            setCurrentYear(currentYear - 1);
          }

          if (index === 11) {
            setCurrentMonth(0);
          } else {
            setCurrentMonth(index + 1);
          }
        }}
        loop={true}
        showsPagination={false}
        nextButton={
          <View style={{padding: 0}}>
            <Icon name="arrowright" size={wp(7)} color={'#000'} />
          </View>
        }
        prevButton={
          <View style={{padding: 0}}>
            <Icon name="arrowleft" size={wp(7)} color={'#000'} />
          </View>
        }
        buttonWrapperStyle={{
          height: wp(15),
          width: wp(90),
        }}
        bounces={false}>
        {months.map((index) => {
          return (
            <View key={index} style={styles.slidesContainer}>
              <Text style={styles.perMon}>{perMonths[currentMonth - 1]}</Text>
              <View style={styles.slides}>
                <Text style={styles.text}>
                  {months[currentMonth]}
                  {', '}
                  {currentYear}
                </Text>
              </View>
            </View>
          );
        })}
      </Swiper>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {header}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: wp(5),
          marginTop: wp(5),
          paddingBottom: wp(10),
        }}>
        <View>
          <Text style={styles.headerHeading}>My Attendance</Text>
          <Text style={styles.headerSubheading}>Check In/Out</Text>
        </View>

        {swiper}
       {attendance.length?
       attendance.map((a,i)=><AttendanceItem key={i} attendance={a} currentMonth={currentMonth}/>)
      :<Text style={styles.emptyAttendance}>No Attendance found</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: wp(4),
    elevation: 3,
    paddingHorizontal: wp(3),
    paddingTop: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHeading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProTextSemibold,
    color: Color.yellow,
  },
  headerSubheading: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
    color: '#000',
  },
  back: {
    height: wp(7),
    width: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProTextSemibold,
  },
  wrapper: {
    height: wp(15),
    width: wp(90),
  },
  slidesContainer: {
    height: wp(15),
    width: wp(65),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  slides: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    height: wp(10),
    width: wp(40),
    borderRadius: wp(2),
  },
  text: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: Font.SFProTextSemibold,
  },
  perMon: {
    color: '#000',
    fontSize: wp(3.8),
    fontFamily: Font.SFProTextSemibold,
  },
  attendanceContainer: {
    backgroundColor: '#f3f3f3',
    height: wp(32),
    width: wp(80),
    borderRadius: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    marginBottom: wp(5),
    alignSelf: 'center',
  },
  dateContainer: {
    backgroundColor: '#E8E8E8',
    height: wp(25),
    width: wp(22),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: wp(4),
  },
  dateText: {
    fontSize: wp(5),
    fontFamily: Font.SFProTextSemibold,
    color: '#8d8d8d',
  },
  punchContainer: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: wp(4),
  },
  punchText: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProTextSemibold,
    color: '#000',
  },
  TimeText: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProTextSemibold,
    color: '#000',
  },
  verticalLine: {
    width: wp(0.5),
    height: wp(10),
    backgroundColor: '#8d8d8d',
    borderRadius: wp(10),
  },
  emptyAttendance:{
    textAlign:'center',
    fontSize:wp(3.5),
    color:Color.primary,
    fontFamily:Font.SFProText
  }
});

export default Attendance;
