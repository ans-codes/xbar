import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

function EmployeeListItem({employee, navigation}) {
  return (
    <TouchableOpacity 
    onPress={() =>
      navigation.navigate("Conversation", {
        id: employee.uid,
        name: employee.username,
        dp: employee.imageUrl,
        token: '',
      })
    }
    style={styles.itemContainer}>
      <Image
        source={
          employee.imageUrl
            ? {
                uri: employee.imageUrl,
              }
            : null
        }
        style={styles.itemImage}
      />
      <View style={{marginLeft: wp(5)}}>
        <Text numberOfLines={1} style={styles.itemHeading}>
          {employee.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const EmployeeList = ({navigation}) => {
  const [employee, setEmployee] = useState([]);
  const [wait, setWait] = useState(false);
  useEffect(() => {
    let subscribe = null;
    setWait(true);
    subscribe = firestore()
      .collection('Users')
      .onSnapshot(function (querySnapShot) {
        var emp = [];
        querySnapShot.forEach(function (doc) {
          emp.push(doc.data());
        });
        setEmployee(emp);
        setWait(false);
      });
    return () => (subscribe = null);
  }, [navigation]);

  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="black" />
      </TouchableOpacity>
      <Text style={{...styles.heading, marginLeft: wp(3)}}>Employees</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {header}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: wp(8),
          paddingBottom: wp(10),
        }}>
        {wait ? (
          <ActivityIndicator color={Color.primary} />
        ) : (
          employee.map((employee, i) => {
            return (
              <EmployeeListItem
                key={i}
                employee={employee}
                navigation={navigation}
              />
            );
          })
        )}
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
  itemContainer: {
    backgroundColor: '#f3f3f3',
    height: wp(15),
    width: wp(90),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    marginBottom: wp(5),
  },
  itemImage: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
    borderWidth:wp(0.3),
    borderColor:'#fff'
  },
  itemHeading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProTextSemibold,
  },
  itemSubheading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProText,
  },
  viewDetails: {
    height: wp(10),
    justifyContent: 'flex-end',
    marginTop: wp(3),
  },
  viewDetailText: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
    color: Color.red,
  },
  addIcon: {
    position: 'absolute',
    bottom: wp(5),
    right: wp(5),
    height: wp(11),
    width: wp(11),
    borderRadius: wp(11),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeList
