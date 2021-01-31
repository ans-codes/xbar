import React from 'react';
import {StyleSheet,Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationItem = () => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri:
            'https://tuitionmela.com/uploads/tutor/TM-TU20015180620112231.jpg',
        }}
        style={styles.imageStyle}
      />

      <View style={styles.itemDetail}>
        <Text numberOfLines={2} style={styles.itemHeading}>Present dolor neque, posuere et purus quis volutpat.
            Present dolor neque, posuere et purus quis volutpat</Text>
        <View style={styles.row}>
          <Text style={styles.itemSubheading}>20 minutes ago</Text>
          <TouchableOpacity style={styles.clearContainer}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};


const Notifications = ({navigation}) => {
    const header = (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="md-arrow-back" size={wp(6)} color="black" />
          </TouchableOpacity>
          <Text style={{...styles.heading, marginLeft: wp(3)}}>
              Notifications
            </Text>
        </View>
      );
    return (
      <View style={styles.container}>
        {header}
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: wp(5),
            paddingBottom: wp(10),
          }}>
              <View style={{...styles.row,width:wp(85)}}>
                  <Text style={styles.itemHeading}>All Notifications</Text>
                  <Text style={{...styles.itemHeading,color:Color.red}}>Clear all</Text>
              </View>
              <NotificationItem/>
              <NotificationItem/>
              <View style={{...styles.row,marginTop:wp(5)}}>
                  <Text style={{...styles.itemHeading,color:Color.red}}>View all</Text>
              </View>
              </ScrollView>
              </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    header: {
        backgroundColor: '#fff',
        paddingBottom: wp(4),
        elevation: 3,
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
        flexDirection:'row',
        alignItems:'center'
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
      imageStyle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10),
        alignSelf:'flex-start'
      },
      itemContainer:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          height:wp(18),
          width:wp(100),
          borderBottomColor:'#f5f5f5',
          borderBottomWidth:wp(0.5),
          paddingHorizontal:wp(7),
          marginTop:wp(5)
      },
      itemDetail:{
          width:wp(72),
      },
      itemHeading:{
          fontSize:wp(3.5),
          fontFamily:Font.SFProTextSemibold,
          color:'#000'
      },
      itemSubheading:{
        fontSize:wp(3),
        fontFamily:Font.SFProText,
        color:'gray'
      },
      row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      clearContainer:{
          height:wp(10),
          width:wp(20),
          justifyContent:'center',
          alignItems:'center'
      },
      clearText:{
        fontSize:wp(3),
        fontFamily:Font.SFProText,
        color:Color.red
      },
})
