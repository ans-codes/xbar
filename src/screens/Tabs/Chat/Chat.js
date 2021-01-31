import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  FlatList,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import {connect} from 'react-redux';
const { width } = Dimensions.get("screen");
import Color from '../../../theme/color';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function Chat(props) {
  const [rooms, setRooms] = useState([]);
  const [mRooms, setMRooms] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      try {
          firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .update({
            new_message: false
          });
        props.oldChat(false);
        getChat();
      } catch (error) {
        console.log(error);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const getChat = () => {
    setRefresh(true);

    try {
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .collection("chat")
        .orderBy("lastseen", "desc")
        .onSnapshot(function (querySnapShot) {
          var rooms = [];
          querySnapShot.forEach(function (doc) {
            rooms.push(doc.data());
          });
          setRooms(rooms);
          setMRooms(rooms);
          setRefresh(false);
        });
    } catch (error) {
      alert(error);
      setRefresh(false);
    }

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const searchChat = value => {
    const filteredResult = mRooms.filter(room => {
      let postLowerCase = room.name.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();

      return postLowerCase.indexOf(searchTermLowerCase) > -1;
    });
    setRooms(filteredResult);
  };

  const header = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width,
        paddingHorizontal: 20,
        marginVertical: 10
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", color: Color.text }}>
        Chat
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        backgroundColor='#fff'
        barStyle="dark-content"
      />
      <View style={{ ...styles.container, backgroundColor: Color.tabBg }}>
        {header}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: '#fff',
            width: width * 0.9,
            paddingVertical: width * 0.01,
            paddingHorizontal:width * 0.04,
            elevation: 2,
            marginBottom: 20,
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowRadius: 5,
            shadowOpacity: 0.1
          }}
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor={Color.text}
            style={{ flex: 1, paddingHorizontal: 10 }}
            onChangeText={value => searchChat(value)}
          />
          <Ionicons name="md-search" size={16} color={Color.text} />
        </View>

        <View style={{ width: width }}>
          <FlatList
            refreshing={refresh}
            ListEmptyComponent={() => (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: Color.text }}>
                  No Chats Available
                </Text>
              </View>
            )}
            style={{ width: width }}
            showsVerticalScrollIndicator={false}
            data={rooms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Conversation", {
                    id: item.id,
                    name: item.name,
                    dp: item.dp
                  })
                }
                style={{
                  ...styles.con,
                  backgroundColor:'#fff',
                  alignSelf: "center"
                }}
              >
                <Image
                  source={
                    item.dp
                      ? { uri: item.dp }
                      : require("./dp.png")
                  }
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    borderWidth: 0.1
                  }}
                />

                <View style={{ ...styles.col, flex: 1, paddingHorizontal: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: Color.text
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#d2d2d4"
                      }}
                    >
                      {item.lastseen ? moment(item.lastseen).fromNow() : null}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#d2d2d4"
                    }}
                  >
                    {item.lastmessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddChat')}
        style={styles.addIcon}>
        <Feather name="plus" size={wp(8)} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    cartItems: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    oldChat: value => dispatch({ type: "CHAT_STATUS", payload: value })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //paddingTop:Platform.OS==='android'?10:10,
    paddingHorizontal: 20
  },
  con: {
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
