import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  PanResponder,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import {createStackNavigator} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//Stack Screens
import Notifications from './Notifications';
import AddLeave from './AddLeave';
import Leaves from './Leaves';
import Attendance from './Attendance';
import moment from 'moment';
import MapView, {Marker} from 'react-native-maps';
import WorkFromHome from './WorkFromHome';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Home = ({props}) => {
  const [option, setOption] = useState(false);
  const [move, setMove] = useState(5);
  const [moveReverse, setMoveReverse] = useState(5);
  const [punchOut, setPunchOut] = useState(false);
  const [off, setOff] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [punchInTime, setPunchInTime] = useState('Loading');
  const [punchOutTime, setPunchOutTime] = useState('Loading');
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .onSnapshot((doc) => {
          setUser(doc.data());
        });
    } catch (error) {
      alert(error);
    }
  }, [props]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= 250) {
          setMove(gestureState.dx);
          if (gestureState.dx >= 190) {
            setPunchInTime(moment().format('LT'));
            setMoveReverse(5);
            setPunchOut(true);
            alert(`Punched in at ${moment().format('LT')}`);
            firestore()
              .collection('Users')
              .doc(auth().currentUser.uid)
              .update({
                date: moment().format('L'),
                punchIn: moment().format('LT'),
                punchedIn: true,
                punchedOut: false,
              });
          }
        }
      },
    }),
  ).current;
  const panResponderReverse = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx >= -250 && gestureState.dx <= 0) {
          setMoveReverse(gestureState.dx);
          if (gestureState.dx <= -190) {
            let user;
            firestore()
              .collection('Users')
              .doc(auth().currentUser.uid)
              .onSnapshot((doc) => {
                user = doc.data();
              });
            setPunchOutTime(moment().format('LT'));
            alert(`Punched out at ${moment().format('LT')}`);
            setOff(true);
            setTimeout(() => {
              firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .collection('Attendance')
                .doc(moment().format('MMMM, YYYY'))
                .update({
                  attendance: firestore.FieldValue.arrayUnion({
                    date: moment().format('L'),
                    day: moment().format('dddd'),
                    punchIn: user?.punchIn,
                    punchOut: moment().format('LT'),
                  }),
                });

              firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .update({
                  punchOut: moment().format('LT'),
                  punchedOut: true,
                });
            }, 2000);
          }
        }
      },
    }),
  ).current;

  const header = (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerHeading}>My Attendance</Text>
        <Text style={styles.headerSubheading}>Check In/Out</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Notifications')}
        style={styles.bell}>
        <Feather name="bell" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {header}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.map}>
          <MapView
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            initialRegion={{
              latitude: 31.4810164,
              longitude: 74.3105454,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: 31.4810164,
                longitude: 74.3105454,
              }}
              title="LoginFab"
              description="Software House"
            />
          </MapView>
        </View>
        <TouchableWithoutFeedback
          onPress={() => setOption(false)}
          style={{flex: 1}}>
          <View style={styles.attendanceContainer}>
            <View style={{...styles.row, marginBottom: wp(8)}}>
              <SimpleLineIcons
                name="location-pin"
                size={wp(6)}
                color={Color.primary}
              />
              <Text style={styles.attendanceHeading}>Venture Drive</Text>
              <TouchableOpacity
                onPress={() => setOption(true)}
                style={styles.option}>
                <SimpleLineIcons
                  name="options-vertical"
                  size={wp(5)}
                  color={Color.primary}
                />
              </TouchableOpacity>

              {option && (
                <View style={styles.optionContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setOption(false);
                    }}>
                    <Text>Work at Home</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Leaves');
                      setOption(false);
                    }}>
                    <Text>Request Leave</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{...styles.row, paddingHorizontal: wp(10)}}>
              <View>
                <Text style={styles.punch}>Punch In</Text>
                <Text style={styles.timing}>
                  {user?.punchIn && user?.date === moment().format('L')
                    ? user.punchIn
                    : `00:00`}
                </Text>
              </View>

              <View>
                <Text style={styles.punch}>Punch Out</Text>
                <Text style={{...styles.timing, color: '#8d8d8d'}}>
                  {user?.punchOut && user?.date === moment().format('L')
                    ? user.punchOut
                    : `00:00`}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {user?.punchedIn &&
        !user?.punchedOut &&
        user?.date === moment().format('L') ? (
          <View style={{...styles.btnContainer, backgroundColor: Color.yellow}}>
            <Text style={styles.punchIn}>Swipe Left to Punch out</Text>
            <View
              style={{
                ...styles.child,
                position: 'absolute',
                right: -moveReverse,
              }}
              {...panResponderReverse.panHandlers}>
              <AntDesign name="arrowleft" size={30} color={Color.primary} />
            </View>
          </View>
        ) : user?.punchedOut && user?.date === moment().format('L') ? null : (
          <View style={styles.btnContainer}>
            <Text style={styles.punchIn}>Swipe Right to Punch In</Text>
            <View
              style={{...styles.child, position: 'absolute', left: move}}
              {...panResponder.panHandlers}>
              <AntDesign name="arrowright" size={30} color={Color.primary} />
            </View>
          </View>
        )}
      </ScrollView>
      <WorkFromHome visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
};

function HomeStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" children={() => <Home props={{...props}} />} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Leaves" component={Leaves} />
      <Stack.Screen name="AddLeave" component={AddLeave} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(HomeStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(5),
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
  bell: {
    height: wp(15),
    width: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: wp(90),
    width: wp(100),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceContainer: {
    height: wp(43),
    width: wp(85),
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: wp(0.5),
    paddingBottom: wp(3),
    marginTop: wp(5),
  },
  attendanceHeading: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: wp(4.5),
    fontFamily: Font.SFProText,
    color: Color.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(3),
  },
  punch: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProText,
    color: Color.primary,
  },
  timing: {
    fontSize: wp(4),
    fontFamily: Font.SFProTextSemibold,
    color: Color.red,
    marginTop: wp(2),
  },
  option: {
    height: wp(10),
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  optionContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    margin: 3,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: wp(28),
    width: wp(32),
    paddingHorizontal: wp(2),
    position: 'absolute',
    right: -wp(2),
    top: -wp(2),
  },
  btnContainer: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    borderRadius: 30,
    marginVertical: wp(5),
    width: wp(80),
  },
  child: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    width: wp(15),
    padding: 5,
    height: wp(12),
    marginHorizontal: wp(1),
    marginTop: wp(1.65),
    justifyContent: 'center',
    alignItems: 'center',
  },
  punchIn: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProTextSemibold,
    color: '#fff',
    position: 'absolute',
    width: wp(80),
    textAlign: 'center',
    height: wp(15),
    textAlignVertical: 'center',
  },
});
