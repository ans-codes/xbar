import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import firebase from "firebase";

const { height, width } = Dimensions.get("screen");

export default function SearchBar(props) {
  const { colors, dark } = useTheme();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const id = props.id;
    if (id) {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("chat")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [id]);
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={{ ...styles.container, backgroundColor: colors.container }}
    >
      <Image
        source={require("../../Account/Images/dp.png")}
        style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 0.1 }}
      />

      <View style={{ ...styles.col, flex: 1, paddingHorizontal: 5 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: colors.text }}>
          {props.name}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#d2d2d4" }}>
          {messages[0]?.message}
        </Text>
      </View>

      <View style={styles.col}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#d2d2d4" }}>
          {new Date(messages[0]?.timestamp.toDate()).toDateString()}
        </Text>
        {/* <View style={styles.tag}>
           <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>1</Text>
           </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    width: width * 0.9,
    padding: width * 0.04,
    elevation: 2,
    shadowOpacity: 0.1,
    marginBottom: 10,
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowRadius: 5
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: 50
  },
  tag: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    height: 20,
    width: 20,
    borderRadius: 25,
    alignSelf: "center"
  }
});
