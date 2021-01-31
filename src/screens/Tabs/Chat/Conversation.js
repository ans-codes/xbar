import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Platform
} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChatBubble from "./Components/ChatBubble";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get("screen");
import Color from '../../../theme/color';

export default function Conversation({ route, navigation }) {
  const flatList = React.useRef(null);

  const { id, name, dp, token, adId } = route.params;
  const [input, setInput] = useState("");
  const [myData, setData] = useState([]);
  const [userId, setUserId] = useState(auth().currentUser.uid);
  const [user, setUser] = useState({});
  const [rec, setRec] = useState({});
  const [ADID] = useState(route.params.adId || null);
  const [tempData, setTempData] = useState();
  const [ad, setAd] = useState();

  const [board, setBoard] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setBoard(true));
    Keyboard.addListener("keyboardDidHide", () => setBoard(false));

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => setBoard(true));
      Keyboard.removeListener("keyboardDidHide", () => setBoard(false));
    };
  }, []);

  useEffect(() => {
   
      firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .onSnapshot(function (doc) {
        setUser(doc.data());
      });
   
      firestore()
      .collection("Users")
      .doc(id)
      .onSnapshot(function (doc) {
        setRec(doc.data());
      });
  }, []);
  useEffect(() => {
    if (id) {
      const unsubscribe = 
     
        firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .collection("chat")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => setData(snapshot.docs.map(doc => doc.data())));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = 
   
      firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("chat")
      .doc(id)
      .onSnapshot(snapshot => setTempData(snapshot.data()));
  }, []);

  const sendPushNotification = async (token, name, msg) => {
    const message = {
      to: token,
      sound: "default",
      title: name,
      body: msg,
      data: { data: "goes here" },
      _displayInForeground: true
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
  };

  const sendMessage = () => {
    if (myData.length) {
      if (input) {
       firestore()
          .collection("Users")
          .doc(userId)
          .collection("chat")
          .doc(id)
          .collection("messages")
          .add({
            message: input,
            id: userId,
            timestamp: Date.now(),
            type: true
          });
        setInput("");

        firestore()
          .collection("Users")
          .doc(userId)
          .collection("chat")
          .doc(id)
          .update({
            lastmessage: input,
            lastseen: Date.now()
          });

       firestore()
          .collection("Users")
          .doc(id)
          .collection("chat")
          .doc(userId)
          .collection("messages")
          .add({
            message: input,
            id: id,
            timestamp: Date.now(),
            type: false
          });
        setInput("");

        firestore()
          .collection("Users")
          .doc(id)
          .collection("chat")
          .doc(userId)
          .update({
            lastmessage: input,
            lastseen: Date.now()
          });

        firestore().collection("Users").doc(id).update({
          new_notification: true,
          new_message: true
        });

        if (rec.messageAlert) {
          firestore()
            .collection("Users")
            .doc(id)
            .collection("notify")
            .add({
              user_id: userId,
              user_dp: user.dp,
              user_name: user.first_name + " " + user.last_name,
              msg: input,
              timestamp: Date.now(),
              chat: true
            });
          sendPushNotification(
            rec.token,
            user.username,
            input
          );
        }
      }
    } else {
      if (input) {
        try {
          firestore()
            .collection("Users")
            .doc(userId)
            .collection("chat")
            .doc(id)
            .set({
              name: name,
              dp: dp,
              id: id,
              adId: ADID,
              lastmessage: "",
              lastseen: ""
            })
            .then(res => {
              firestore()
                .collection("Users")
                .doc(id)
                .collection("chat")
                .doc(userId)
                .set({
                  name: user.username,
                  dp: user.imgeUrl,
                  id: userId,
                  adId: ADID,
                  lastmessage: "",
                  lastseen: ""
                });
            })
            .then(res => {
             firestore()
                .collection("Users")
                .doc(userId)
                .collection("chat")
                .doc(id)
                .collection("messages")
                .add({
                  message: input,
                  id: userId,
                  timestamp: Date.now(),
                  type: true
                });
              setInput("");

              firestore()
                .collection("Users")
                .doc(userId)
                .collection("chat")
                .doc(id)
                .update({
                  lastmessage: input,
                  lastseen: Date.now()
                });

              firestore()
                .collection("Users")
                .doc(id)
                .collection("chat")
                .doc(userId)
                .collection("messages")
                .add({
                  message: input,
                  id: id,
                  timestamp: Date.now(),
                  type: false
                });
              setInput("");

              firestore()
                .collection("Users")
                .doc(id)
                .collection("chat")
                .doc(userId)
                .update({
                  lastmessage: input,
                  lastseen: Date.now()
                });

              firestore().collection("Users").doc(id).update({
                new_notification: true,
                new_message: true
              });

              if (rec.messageAlert) {
               firestore()
                  .collection("Users")
                  .doc(id)
                  .collection("notify")
                  .add({
                    user_id: userId,
                    user_dp: user.dp,
                    user_name: user.username,
                    msg: input,
                    timestamp: Date.now()
                  });

                sendPushNotification(
                  rec.token,
                  user.first_name + " " + user.last_name,
                  input
                );
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const header = (
    <View style={{ ...styles.container, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Ionicons name="md-arrow-back" size={wp(6)} color="black"
        style={{marginRight:wp(2)}}/>
      </TouchableOpacity>

      {dp ? (
        <Image
          source={{ uri: dp }}
          style={{
            height: 40,
            width: 40,
            resizeMode: "contain",
            borderRadius: 20
          }}
        />
      ) : (
        <Image
          source={require("./dp.png")}
          style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.1 }}
        />
      )}

      <View style={{ ...styles.col, flex: 1, paddingHorizontal: 5 }}>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: Color.text }}>
          {name}
        </Text>
        {user?.online ? (
          <Text style={{ fontSize: 12, color: "green" }}>Online</Text>
        ) : (
          <Text style={{ fontSize: 12, color: "#d2d2d4" }}>
            last seen {moment(user?.lastseen).fromNow()}
          </Text>
        )}
      </View>

      <View style={styles.col}>
        <View style={styles.row}></View>
      </View>
    </View>
  );

  const typingArea = (
    <View
      style={{ ...styles.typingarea, backgroundColor: '#fff' }}
    >
      <TextInput
        placeholder="Type your message here"
        placeholderTextColor={Color.textSecondary}
        value={input}
        style={{ flex: 1, padding: width * 0.03 }}
        onChangeText={msg => setInput(msg)}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={{
          height: width * 0.15,
          width: width * 0.13,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MaterialCommunityIcons name="send-circle" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{ ...styles.convContainer, backgroundColor: '#fff' }}
    >
      {header}
      <View
        style={{
            ...styles.body,backgroundColor: '#fff',marginBottom:width*0.35}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={flatList}
          onLayout={() => {
            flatList.current.scrollToEnd();
          }}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: "#d2d2d4",
                textAlign: "center",
                fontSize: 10,
                marginTop: 20
              }}
            >
              No Chat Available
            </Text>
          )}
          data={myData}
          
          contentContainerStyle={{ width: width * 0.9 }}
          keyExtractor={item => item.timestamp.toString()}
          renderItem={({ item, index }) => (
            <>
              {index ? null : ad ? (
                <View style={{ marginBottom: width * 0.05 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Detail", { item: ad })}
                    style={{
                      backgroundColor: "#f5f5f5",
                      elevation: 2,
                      flexDirection: "row",
                      padding: 5,
                      marginBottom: width * 0.05
                    }}>
                    <Image
                      source={{ uri: ad.image }}
                      style={{ height: width * 0.2, width: width * 0.2 }}
                    />
                    <View style={{ paddingHorizontal: width * 0.03 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          width: width * 0.5
                        }}>
                        {ad.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 14,
                          color: "gray",
                          fontWeight: "bold",
                          width: width * 0.5
                        }}>
                        {ad.category}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 13,
                          color: "gray",
                          width: width * 0.5
                        }}>
                        {ad.desc}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 10, color: "gray", textAlign: "center" }}>
                    Messages started by visiting the above user ad
                  </Text>
                </View>
              ) : null}
              <ChatBubble
                msg={item.message}
                type={item.type}
                ago={item.timestamp}
              />
            </>
          )}
        />
      </View>
      {typingArea}
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  convContainer: {
    height: "100%",
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
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
  body: {
    width: width ,
    padding: width * 0.04,
    marginBottom: 10,
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: 40
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40
  },
  typingarea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    height: width * 0.15,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 3,
      height: 1
    },
    shadowRadius: 5,
    position:'absolute',
    bottom:0

  }
});
