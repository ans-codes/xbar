import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/color';
import InputField from '../components/InputField';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {EmployeeAcceptedInvite} from '../PushNotification/localpush';

const EmployeeList = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [employeeModel, setEmployeeModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [filter, setFilter] = useState(true);
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchUid, setSearchUid] = useState('QzX2aGEjLdVRSWeRdKQd6HvV9cj1');
  const [Data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const employeeArray = [];
  const [employeeData, setEmployeeData] = useState(employeeArray);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [history, setHistory] = useState([]);
  const [punch, setpunch] = useState(null);
  const [punchMonth, setpunchMonth] = useState(new Date().getMonth() + 1);
  const [punchloading, setpunchloading] = useState(false);
  const [attendenceDone, setattendenceDone] = useState(false);
  const [changeYear, setChangeYear] = useState(true);
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

  async function fetch() {
    var user = await firestore()
      .collection('users')
      .doc(props.userData.uid)
      .get()
      .then((res) => {
        setData(res._data);
        setLoading(false);
      })
      .catch((err) => console.log('on profile error fetching data', err));

    let localData = await AsyncStorage.getItem('@ManagerInviteAccepted');

    if (
      localData != JSON.stringify(Data.employees) &&
      JSON.stringify(Data.employees) != '""'
    ) {
      console.log('not same');
      EmployeeAcceptedInvite();
    } else {
      console.log('No New employees');
    }

    getEmployees();
  }

  async function getEmployees() {
    setLoading(true);
    const usersRef = firestore().collection('users');
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      if (
        Data.company === doc.data().company &&
        Data.email !== doc.data().email
      ) {
        employeeArray.push(doc.data());
        setEmployeeData(employeeArray);
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    fetch();
    getEmployeesTime();
  }, [currentMonth, punch]);

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

    try {
      await AsyncStorage.setItem(
        '@ManagerInviteAccepted',
        JSON.stringify(Data.employees),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function getEmployeesTime() {
    const usersRef = firestore().collection('users');
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      if (searchEmail === doc.data().email && searchEmail !== '""') {
        setSearchUid(doc.data().uid);
        console.log(searchUid);
      }
    });

    setLoading(true);
    var events = await firestore()
      .collection(searchUid)
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
          .collection(searchUid)
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

  function showLateEmployees(e) {
    if (e.punchIn !== Data.officeTime) {
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
              {e.date == moment().format('L') && e.attendenceDone == false
                ? 'Not Yet'
                : e.punchOut}
            </Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <Text style={styles.textStyle}>Add a new employee</Text>
        <Ionicons
          name="md-add"
          size={32}
          color="#fff"
          onPress={() => {
            getEmployees();
            getEmployeesTime();
            setModalVisible(true);
          }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            height: '47%',
            marginTop: 'auto',
          }}>
          <View style={styles.footer}>
            <Text style={styles.headerText}>Enter your Employee's email</Text>
            <InputField
              placeholder="user@domain.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setModalVisible(false);
              sendInvite(email);
            }}>
            <Text style={styles.addButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={employeeModel}>
        <View
          style={{
            height: '95%',
            marginTop: 'auto',
          }}>
          <View style={styles.footer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headerText}>Attendance</Text>
              <Ionicons
                style={{padding: 26}}
                name="close"
                size={32}
                color={colors.Primary}
                onPress={() => {
                  setEmployeeModal(false);
                }}
              />
              <MenuProvider>
                <Ionicons
                  style={{padding: 26, marginLeft: 80}}
                  name="md-filter"
                  size={32}
                  color={colors.Primary}
                  onPress={() => {
                    setOpenMenu(true);
                  }}
                />
                <Menu opened={openMenu}>
                  <MenuTrigger text="Select action" />
                  <MenuOptions>
                    <MenuOption
                      onSelect={() => {
                        setFilter(true);
                        setOpenMenu(false);
                      }}
                      text="Filter Attendance"
                    />
                    <MenuOption
                      onSelect={() => {
                        setFilter(false);
                        setOpenMenu(false);
                      }}>
                      <Text style={{color: 'red'}}>Filter Late Time</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </MenuProvider>
            </View>
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
                  getEmployeesTime();
                }}
                loop={true}
                showsPagination={false}
                nextButton={
                  <View style={{padding: 10}}>
                    <Ionicons
                      name="arrow-forward"
                      size={25}
                      color={'#989898'}
                    />
                  </View>
                }
                prevButton={
                  <View style={{padding: 10}}>
                    <Ionicons name="arrow-back" size={25} color={'#989898'} />
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
                        <Text style={{fontSize: 20}}>
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
            {filter ? (
              <View style={{flex: 1}}>
                {loading ? (
                  <ActivityIndicator
                    color={colors.Primary}
                    size={'large'}
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      justifyContent: 'center',
                    }}
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
                      console.log(
                        'date comparison',
                        e.date == moment().format('L'),
                      );

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
                      <TouchableOpacity disabled={punchloading ? true : false}>
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
                        onPress={() =>
                          console.log('You cannot perform this action')
                        }
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
            ) : (
              <View style={{flex: 1}}>
                {loading ? (
                  <ActivityIndicator
                    color={colors.Primary}
                    size={'large'}
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      justifyContent: 'center',
                    }}
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
                      console.log(
                        'date comparison',
                        e.date == moment().format('L'),
                      );

                      return <View>{showLateEmployees(e)}</View>;
                    })}
                    {attendenceDone ? null : punch ? (
                      <TouchableOpacity disabled={punchloading ? true : false}>
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
                    ) : null}
                  </ScrollView>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
      {loading ? (
        <ActivityIndicator
          color={'#FFF'}
          size={'large'}
          style={{
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        />
      ) : (
        <FlatList
          style={styles.notificationList}
          data={employeeData}
          keyExtractor={(item) => {
            return item.email;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {borderColor: '#fff'}]}
                onPress={() => {
                  setSearchEmail(item.email);
                  getEmployeesTime();
                  setEmployeeModal(true);
                }}>
                <View style={styles.cardContent}>
                  <Image
                    style={[styles.image, styles.imageContent]}
                    source={require('../assets/images/user.png')}
                  />
                  <Text style={styles.name}>{item.email}</Text>
                </View>
                <View style={[styles.cardContent, styles.bioContent]}>
                  <Text style={{fontWeight: 'bold'}}>{item.bio}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userData: state.userData,
    ReducerLoading: state.isLoading,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
    marginRight: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  bioContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
  headerText: {
    color: colors.Primary,
    fontSize: 18,
    padding: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerText2: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    zIndex: 100,
    right: 20,
    bottom: 30,
    backgroundColor: colors.Primary,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    width: '100%',
  },
});

export default connect(mapStateToProps)(EmployeeList);
