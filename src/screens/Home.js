import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import colors from '../theme/color';

const array = [1, 2, 3, 4, 5];
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
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
var d = new Date();
const Home = (props) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [punch, setpunch] = useState(null);
  const [punchMonth, setpunchMonth] = useState(new Date().getMonth() + 1);
  const [punchloading, setpunchloading] = useState(false);
  const [attendenceDone, setattendenceDone] = useState(false);
  const [changeYear, setChangeYear] = useState(true);

  async function fetch() {
    setLoading(true);
    var events = await firestore()
      .collection(props.userData.uid)
      .doc(JSON.stringify(currentYear))
      .collection(JSON.stringify(currentMonth));
    events
      .get()
      .then(async (querySnapshot) => {
        var tempDoc = querySnapshot.docs.map((doc) => {
          return {id: doc.id, ...doc.data()};
        });
        await setHistory(tempDoc);
        var punchLogic = await firestore()
          .collection(props.userData.uid)
          .doc(JSON.stringify(new Date().getFullYear()))
          .collection(JSON.stringify(punchMonth));
        punchLogic
          .get()
          .then(async (querySnapshot) => {
            var PunchFlag = querySnapshot.docs.map((doc) => {
              return {id: doc.id, ...doc.data()};
            });
            if (PunchFlag.length > 0) {
              console.log(
                PunchFlag[PunchFlag.length - 1].id == new Date().getDate() &&
                  PunchFlag[PunchFlag.length - 1].attendenceDone == true,
              );
              if (PunchFlag[PunchFlag.length - 1].id == new Date().getDate()) {
                if (PunchFlag[PunchFlag.length - 1].attendenceDone == true) {
                  setattendenceDone(true);
                } else {
                  setpunch(true);
                }
              } else {
                setpunch(false);
                setattendenceDone(false);
              }
            } else {
              console.log('punch null', PunchFlag);
            }
            setLoading(false);
          })
          .catch((err) => console.log('querySnapshot fail', err));
      })
      .catch((err) => console.log('querySnapshot fail', err));
  }

  useEffect(() => {
    fetch();
  }, [currentMonth, punch]);
  console.log('current ', currentDay, currentMonth, currentYear);
  console.log('time', moment().format('M'));
  const punchIn = () => {
    setpunchloading(true);

    firestore()
      .collection(props.userData.uid)
      .doc(JSON.stringify(new Date().getFullYear()))
      .collection(JSON.stringify(punchMonth))
      .doc(JSON.stringify(new Date().getDate()))
      .set({
        date: moment().format('L'),
        dayInNumbers: moment().format('DD'),
        dayInWords: moment().format('dddd'),
        monthInNumbers: moment().format('M'),
        monthInWords: months[d.getMonth()],
        punchIn: moment().format('LT'),
        punchOut: '11:59 PM',
        attendenceDone: false,
      })
      .then((responce) => {
        console.log(
          'succes reponce after storing punch data in firestore ',
          responce,
        );
        setpunchloading(false);
        setpunch(true);
        // setLoading(false)
      })
      .catch((err) => console.log('err on storing punch data in firestore'));
  };

  const punchOut = () => {
    setpunchloading(true);

    firestore()
      .collection(props.userData.uid)
      .doc(JSON.stringify(new Date().getFullYear()))
      .collection(JSON.stringify(punchMonth))
      .doc(JSON.stringify(new Date().getDate()))
      .update({
        punchOut: moment().format('LT'),
        attendenceDone: true,
      })
      .then((responce) => {
        console.log(
          'succes reponce after storing punch data in firestore ',
          responce,
        );
        setpunchloading(false);
        setpunch(false);
      })
      .catch((err) => console.log('err on storing punch data in firestore'));
    console.log('succesfully punched In async storage');
  };
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <View style={{height: hp('10%'), width: wp('100%')}}>
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
              setCurrentMonth(index + 1);
            }}
            loop={true}
            showsPagination={false}
            nextButton={
              <View style={{padding: 10}}>
                <Icon name="long-arrow-alt-right" size={25} color={'#989898'} />
              </View>
            }
            prevButton={
              <View style={{padding: 10}}>
                <Icon name="long-arrow-alt-left" size={25} color={'#989898'} />
              </View>
            }
            buttonWrapperStyle={{
              paddingHorizontal: 20,
              height: hp('10%'),
              width: wp('100%'),
            }}
            bounces={false}>
            {months.map((month, index) => {
              return (
                <View key={index} style={styles.slides}>
                  <View>
                    <Text style={styles.text}>
                      {month}
                      {'/'}
                      {currentYear}
                    </Text>
                    <View
                      style={{
                        height: hp('0.7%'),
                        width: wp('6%'),
                        backgroundColor: '#ffcc00',
                        alignSelf: 'flex-start',
                      }}></View>
                  </View>
                </View>
              );
            })}
          </Swiper>
        </View>
      </View>
      <View style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator
            color={colors.Primary}
            size={'large'}
            style={{alignSelf: 'center', flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{padding: 10}}
            ref={(ref) => (scrollView = ref)}
            onContentSizeChange={() =>
              scrollView.scrollToEnd({animated: true})
            }>
            {history.map((e) => {
              console.log('date comparison', e.date == moment().format('L'));

              return (
                <View
                  key={e.id}
                  style={{
                    height: hp('14%'),
                    width: wp('85%'),
                    backgroundColor: '#F0F0F0',
                    marginBottom: wp('7.5%'),
                    borderRadius: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp('5%'),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingVertical: wp('5%'),
                      paddingHorizontal: wp('5%'),
                      borderRadius: wp('8%'),
                    }}>
                    <Text
                      style={{
                        fontSize: wp('4.5%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {e.dayInNumbers}
                    </Text>
                    <Text
                      style={{
                        fontSize: wp('4.5%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {e.dayInWords.slice(0, 3)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: wp('4%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      Punch In
                    </Text>
                    <Text
                      style={{
                        fontSize: wp('3%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginTop: wp('3.5%'),
                        color: '#888888',
                      }}>
                      {e.punchIn}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: wp('4%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      Punch Out
                    </Text>
                    <Text
                      style={{
                        fontSize: wp('3%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginTop: wp('3.5%'),
                        color: '#888888',
                      }}>
                      {e.date == moment().format('L') &&
                      e.attendenceDone == false
                        ? 'Not Yet'
                        : e.punchOut}
                    </Text>
                  </View>
                </View>
              );
            })}
            {attendenceDone ? null : punch ? (
              <TouchableOpacity
                onPress={() => punchOut()}
                disabled={punchloading ? true : false}>
                <View
                  style={{
                    height: hp('14%'),
                    width: wp('85%'),
                    backgroundColor: '#ff1a1a',
                    marginBottom: wp('10%'),
                    borderRadius: 25,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: wp('4%'),
                  }}>
                  {punchloading ? (
                    <ActivityIndicator
                      color={'white'}
                      size={'large'}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          backgroundColor: 'grey',
                          paddingVertical: wp('5%'),
                          paddingHorizontal: wp('5%'),
                          borderRadius: wp('8%'),
                        }}>
                        <Text
                          style={{
                            fontSize: wp('4.5%'),
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: 'white',
                          }}>
                          {moment().format('DD')}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp('4.5%'),
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: 'white',
                          }}>
                          {moment().format('dddd').slice(0, 3)}
                        </Text>
                      </View>
                      <View style={{marginLeft: wp('8%')}}>
                        <Text
                          style={{
                            fontSize: wp('3.4%'),
                            fontWeight: 'bold',
                            color: 'white',
                          }}>{`${moment().format('LL')} (Today)`}</Text>
                        <Text
                          style={{
                            fontSize: wp('5%'),
                            fontWeight: 'bold',
                            marginTop: wp('3.5%'),
                            color: 'white',
                          }}>
                          Punch Out
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => punchIn()}
                disabled={punchloading ? true : false}>
                <View
                  style={{
                    height: hp('14%'),
                    width: wp('85%'),
                    backgroundColor: '#ffcc00',
                    marginBottom: wp('10%'),
                    borderRadius: 25,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: wp('4%'),
                  }}>
                  {punchloading ? (
                    <ActivityIndicator
                      color={'white'}
                      size={'large'}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          backgroundColor: colors.Primary,
                          paddingVertical: wp('5%'),
                          paddingHorizontal: wp('5%'),
                          borderRadius: wp('8%'),
                        }}>
                        <Text
                          style={{
                            fontSize: wp('4.5%'),
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: 'white',
                          }}>
                          {moment().format('DD')}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp('4.5%'),
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: 'white',
                          }}>
                          {moment().format('dddd').slice(0, 3)}
                        </Text>
                      </View>
                      <View style={{marginLeft: wp('8%')}}>
                        <Text
                          style={{
                            fontSize: wp('3.4%'),
                            fontWeight: 'bold',
                            color: 'white',
                          }}>{`${moment().format('LL')} (Today)`}</Text>
                        <Text
                          style={{
                            fontSize: wp('5%'),
                            fontWeight: 'bold',
                            marginTop: wp('3.5%'),
                            color: 'white',
                          }}>
                          Punch In
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapper: {
    // backgroundColor: "red",
  },
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    width: '100%',
  },
  text: {
    color: colors.Primary,
    fontSize: wp('6%'),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
const mapStateToProps = (state) => {
  return {
    
  };
};
export default connect(mapStateToProps)(Home);
