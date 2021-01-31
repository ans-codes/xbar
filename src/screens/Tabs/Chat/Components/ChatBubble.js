import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
const ChatBubble = props => {
  return (
    <View style={props.type ? styles.receiver : styles.sender}>
      <Text
      style={props.type ? {color:'#fff'} : {color:'#000'}}
      >{props.msg}</Text>
      <View>
        <Text 
        style={props.type ? {color:'#fff',fontSize:8} : {color:'#000',fontSize:8}}
        >{moment(props.ago).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  sender: {
    backgroundColor: "#f9f9f9",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginVertical: 5
  },
  receiver: {
    backgroundColor: "rgba(0,0,0,0.8)",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    marginVertical: 5
  }
});
