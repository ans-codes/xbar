import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import colors from '../theme/color';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {EmployeeGotInvite} from '../PushNotification/localpush';

const MyCompany = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Data, setData] = useState('');
  const [loading, setloading] = useState(true);

  async function fetch() {
    var user = await firestore()
      .collection('users')
      .doc(props.userData.uid)
      .get()
      .then((res) => {
        setData(res._data);
        setloading(false);
      })
      .catch((err) => console.log('on profile error fetching data', err));

    let localData = await AsyncStorage.getItem('@userCredentials');

    if (localData != JSON.stringify(Data) && JSON.stringify(Data) != '""') {
      console.log('not same');
      console.log(JSON.stringify(Data));
      console.log(localData);
      EmployeeGotInvite();
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }

  async function storeData() {
    try {
      await AsyncStorage.setItem('@userCredentials', JSON.stringify(Data));
    } catch (e) {
      console.log(e);
    }
    const usersRef = firestore().collection('users');
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      // console.log('Employee List below ->>');
      // console.log(doc.id, '=>', doc.data().email);
      if (Data.invited_by === doc.data().email) {
        console.log('found');
        firestore().collection('users').doc(doc.id).update({
          employees: Math.random(),
        });
      } else {
        console.log('not found');
      }
    });
    setModalVisible(false);
  }

  useEffect(() => {
    fetch();
  }, []);

  const mockData = [
    {
      id: 1,
      name: Data.company,
      image: 'https://img.icons8.com/clouds/100/000000/groups.png',
      category: 'Software/IT',
    },
  ];

  function clickEventListener(item) {
    Alert.alert('Message', 'Item clicked. ' + item.name);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            height: '47%',
            marginTop: 'auto',
          }}>
          <View style={styles.footer}>
            <Text style={styles.headerText}>You have been invited to</Text>
            <Text style={styles.headerText}>{Data.company}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                storeData();
              }}>
              <Text style={styles.addButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.RejectButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.RejectButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={mockData}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                EmployeeGotInvite();
                clickEventListener(item);
              }}>
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
  },
  contentList: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: colors.Primary,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'center',
    color: '#000',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.Primary,
  },
  followButtonText: {
    color: colors.Primary,
    fontSize: 12,
  },
  headerText: {
    color: colors.Primary,
    fontSize: 18,
    padding: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
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
    right: wp(60),
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
  RejectButton: {
    position: 'absolute',
    zIndex: 100,
    right: wp(20),
    bottom: 30,
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  RejectButtonText: {
    color: 'purple',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
   
  };
};

export default connect(mapStateToProps)(MyCompany);
