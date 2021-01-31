import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:wp("6%"),fontWeight:'bold'}}>My attendance</Text>
            <TouchableOpacity style={{padding:5}} onPress={()=>console.log("hello")}>
            <Icon name="bell" size={wp("6%")} color={"black"} style={{fontWeight:'bold'}} />
            </TouchableOpacity>
        </View>
    );
};
const styles = {
    container: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: 'white',
        height:hp("10%"),
        width:wp("100%")
    },
};
export default Header;
