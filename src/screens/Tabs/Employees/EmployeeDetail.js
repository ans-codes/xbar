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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmployeeDetail = ({route, navigation}) => {
  const {employee} = route.params;

  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="black" />
      </TouchableOpacity>
      <Text style={{...styles.heading, marginLeft: wp(3)}}>Employ Detail</Text>
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
          marginTop: wp(5),
          paddingBottom: wp(10),
        }}>
        <View style={styles.itemContainer}>
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
            <Text numberOfLines={1} style={styles.itemSubheading}>
              {employee.type}
            </Text>
            <Text numberOfLines={1} style={{...styles.text, marginTop: wp(4)}}>
              {employee.email}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              {employee.bio}
            </Text>
          </View>
        </View>

        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceHeading}>
            Today's Attendance Timing
          </Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.punch}>Punch In</Text>
              <Text style={styles.timing}>{employee.punchIn}</Text>
            </View>

            <View>
              <Text style={styles.punch}>Punch Out</Text>
              <Text style={{...styles.timing, color: '#8d8d8d'}}>
                {employee.punchOut}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceHeading}>Leaves This Month</Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.punch}>Leaves</Text>
              <Text style={styles.timing}>01/10/2021</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmployeeDetail;

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
    backgroundColor: '#fff',
    height: wp(38),
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    marginBottom: wp(5),
    paddingHorizontal: wp(7),
  },
  itemImage: {
    height: wp(30),
    width: wp(30),
    borderRadius: wp(4),
  },
  itemHeading: {
    fontSize: wp(5),
    fontFamily: Font.SFProTextSemibold,
    color: Color.primary,
  },
  itemSubheading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProText,
    color: Color.yellow,
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
  text: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
    color: '#000',
  },
  attendanceContainer: {
    height: wp(35),
    width: wp(85),
    borderTopColor: '#f5f5f5',
    borderTopWidth: wp(0.5),
    paddingTop: wp(3),
  },
  attendanceHeading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProText,
    color: '#8D8D8D',
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
});
