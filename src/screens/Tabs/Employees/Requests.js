import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

function GridItem() {
  return (
    <View style={styles.gridContainer}>
      <View
        style={{
          ...styles.row,
          paddingHorizontal: wp(4),
          paddingVertical: wp(3),
          borderBottomColor: '#f5f5f5',
          borderBottomWidth: wp(0.5),
        }}>
        <Text style={styles.heading}>Reminders</Text>
        <View style={styles.tag}>
          <Feather name="bell" size={wp(4)} color="#fff" />
        </View>
      </View>

      <View style={{marginHorizontal: wp(7), marginVertical: wp(3)}}>
        <View style={styles.row}>
          <Image
            source={{uri:'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg'}}
            style={styles.imageStyle}
          />
          <View style={{flex: 1, marginLeft: wp(3.5)}}>
            <Text style={styles.heading}>Muhammad Ali</Text>
            <Text style={styles.subHeading}>Developer</Text>
          </View>
        </View>

        <View style={{...styles.row, width: wp(55), marginTop: wp(2)}}>
          <FontAwesome5 name="calendar-alt" size={wp(4)} color="gray" />
          <Text style={styles.label}>Wed,20 Jan</Text>
          <Image
            source={require('../../../assets/images/longarrowright.png')}
            style={styles.icon}
          />
          <Text style={styles.label}>Fri,22 Jan</Text>
        </View>

        <View style={{...styles.row, width: wp(65), marginTop: wp(4)}}>
          <Text style={styles.leaveType}>2 days | Annual Leaves</Text>

          <Text style={styles.label}>2 days left</Text>
        </View>

        <View style={{...styles.row, marginTop: wp(4)}}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>decline</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>pending</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Requests = ({navigation}) => {
  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="md-arrow-back" size={wp(7)} color="black" />
      </TouchableOpacity>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: wp(5)}}>
        <Text style={{...styles.label, fontSize: wp(4)}}>2 Pending</Text>
        <Text style={{...styles.heading, fontSize: wp(5), marginLeft: wp(3)}}>
          Leaves
        </Text>
      </View>
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
        <GridItem />
        <GridItem />
      </ScrollView>
    </View>
  );
};

export default Requests;

const styles = {
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
  },
  back: {
    height: wp(12),
    width: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridContainer: {
    height: wp(63),
    width: wp(90),
    backgroundColor: '#fff',
    elevation: 4,
    margin: 4,
    borderRadius: wp(4),
    marginTop: wp(5),
  },
  imageStyle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  scrollStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: wp(5),
  },
  tag: {
    backgroundColor: Color.red,
    height: wp(7),
    width: wp(7),
    borderRadius: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: wp(4),
    color: Color.primary,
    fontFamily: Font.SFProTextSemibold,
  },
  subHeading: {
    fontSize: wp(3.5),
    color: Color.red,
    fontFamily: Font.SFProTextSemibold,
  },
  leaveType: {
    backgroundColor: '#EBEBED',
    color: '#9D9DA7',
    fontSize: wp(3.2),
    fontFamily: Font.SFProTextSemibold,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
  },
  buttonContainer: {
    backgroundColor: '#E5E9EE',
    height: wp(7),
    width: wp(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Color.primary,
    fontFamily: Font.SFProTextSemibold,
    fontSize: wp(3.2),
  },
  label: {
    color: '#9D9DA7',
    fontFamily: Font.SFProTextSemibold,
    fontSize: wp(3.3),
  },
};
