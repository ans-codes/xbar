import React, { useState } from 'react';
import {StyleSheet,Text, View, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../../components/PrimaryButton';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const AddLeave = ({navigation}) => {
  const [leaves,setLeaves] = useState([])
    const header = (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="md-arrow-back" size={wp(7)} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerSubheading}>Select date for leaves</Text>
          <Text style={styles.headerHeading}>Request a leave</Text>
        </View>
      );
    return (
        <View style={styles.container}>
      {header}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}>
        <View style={styles.calender}>
       <Calendar
         markingType={'period'}
         style={{
          height: wp(100),
          width: wp(100)
        }}
        markedDates={{
          '2021-01-15':{selected: true,textColor:'#000',color: Color.yellow}
        }}
        onDayPress={(day) => {
          setLeaves([...leaves,day.dateString])
          console.log(leaves)
        }}
        
        theme={{
          backgroundColor: Color.primary,
          calendarBackground: Color.primary,
          textSectionTitleColor: '#fff',
          textSectionTitleDisabledColor: '#fff',
          selectedDayBackgroundColor: Color.yellow,
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#fff',
          dayTextColor: '#fff',
          textDisabledColor: '#d9e1e8',
          dotColor: '#fff',
          selectedDotColor: '#ffffff',
          arrowColor: '#fff',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#fff',
          indicatorColor: '#fff',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}  
       />
        </View>

        <View style={styles.form}>
            <Text style={styles.formHeading}>Type of Request</Text>
            <View style={styles.typeStyle}>
                <Text  style={styles.typeText}>Unpaid Leaves</Text>
            </View>
            <Text style={styles.formHeading}>Reason</Text>
            <TextInput
            placeholder="Type reason here..."
            numberOfLines={5}
            textAlignVertical="top"
            multiline={true}
            style={styles.reasonInput}
            />

            <PrimaryButton
            placeholder="Apply for Leave"
            width={90}
            style={{backgroundColor:Color.red,marginTop:wp(5)}}
            bold
            />
        </View>
      </ScrollView>
    </View>
    )
}

export default AddLeave

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        backgroundColor: '#fff',
        paddingBottom: wp(4),
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
      },
      headerHeading:{
        fontSize:wp(4.5),
        fontFamily:Font.SFProTextSemibold,
        color:Color.yellow,
        paddingHorizontal: wp(5),
    },
    headerSubheading:{
        fontSize:wp(3.5),
        fontFamily:Font.SFProText,
        color:'#000',
        paddingHorizontal: wp(5),
    },
      back: {
        height: wp(8),
        width: wp(12),
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      heading: {
        fontSize: wp(4),
        color: Color.primary,
        fontFamily: Font.SFProTextSemibold,
      },
      label: {
        color: '#9D9DA7',
        fontFamily: Font.SFProTextSemibold,
        fontSize: wp(3.3),
      },
      calender:{
          height:wp(100),
          width:wp(100),
          justifyContent:'center',
          backgroundColor:Color.primary
      },
      form:{
          backgroundColor:'#fff',
          elevation:1,
          marginTop:-wp(6),
         borderTopLeftRadius:wp(6),
         borderTopRightRadius:wp(6),
         height:wp(100),
         padding:wp(5)
      },
      formHeading:{
          fontSize:wp(4),
          fontFamily:Font.SFProText,
          marginLeft:wp(1)
      },
      typeStyle:{
          borderColor:'#d2d2d4',
          borderWidth:wp(0.5),
          padding:wp(3),
          borderRadius:wp(2),
          marginTop:wp(2),
          marginBottom:wp(5)
      },
      typeText:{
        fontSize:wp(3.8),
        fontFamily:Font.SFProText,
        color:Color.red
    },
    reasonInput:{
        borderColor:'#d2d2d4',
          borderWidth:wp(0.5),
          padding:wp(3),
          borderRadius:wp(2),
          marginTop:wp(2),
          marginBottom:wp(3),
          fontSize:wp(3.8),
          fontFamily:Font.SFProText,
    }
})
