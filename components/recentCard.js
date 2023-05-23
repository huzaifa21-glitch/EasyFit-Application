import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

export default function Card({ data, navigation }) {
  // console.log('food '+data.email);
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{data.foodname}</Text>
          <Text style={styles.calText}>{data.calories} calories</Text>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        {/* <Pressable style={styles.img}>
          <Image
            source={require("../assets/add.png")}
            style={styles.image}
          ></Image>
        </Pressable> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container1:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#FFF",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  buttoncontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal:30,
  },
  content: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  image: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  calText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#36454F",
  },
  // img: {
  //   display: "flex",
  //   alignItems: "flex-end",
  //   justifyContent: "flex-end",
  //   // marginLeft:170,
  //   // marginHorizontal:50,
  //   alignItems: "flex-end",
  // },
});
