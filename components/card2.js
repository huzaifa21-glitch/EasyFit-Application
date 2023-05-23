import React, { useState, Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import TruncatedText from "./truncText";

var fullWidth = Dimensions.get("window").width;


export default function MaterialCard2({ data, navigation }) {
  const pressHandler = () => {
    const data1={
      coursename: data.coursetitle,
      
    }
    console.log(data1);
    navigation.navigate("Course2",{data1});
  };

  const submitHandle = () => {
   
    const data1={
      trainerid: data.trainerid,
      
    }
    console.log(data1);
    navigation.navigate("Profile",{data1});
  };

  const image = {
    uri: data.pics
  };
  const maxLength = 300;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={pressHandler}> 
          <View style={styles.bodyContent}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={styles.image}
            >
            </ImageBackground>
          </View>
          </Pressable>
          <View style={styles.cardBody}>
            <Pressable onPress={submitHandle}>
          <Image
          style={styles.image1}
          source={{uri: data.trainerpic}}
          ></Image>
          </Pressable>
          <View>
          <Text style={styles.courseName}>{data.coursetitle}</Text>

          <Text style={styles.trainerName}>By {data.trainername}</Text>
          </View>
        </View>
        {/* <Text style={styles.descText}>{data.description}</Text> */}
        <TruncatedText style={styles.descText} text={data.description} maxLength={maxLength} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161416",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "scroll",
  },
  cardBody: {
    flexDirection: "row",
    marginVertical:10,
    marginHorizontal:10,
    // justifyContent: "space-between",
    alignItems:'center'
  },
  
  bodyContent: {
    flex: 1,
  },
  titleText: {
    color: "white",
    fontSize: 24,
    // lineHeight: 54,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    // lineHeight: 34,
    fontWeight: "600",
    marginLeft: 10,
  },
  trainerName:{
    color: "#808080",
    fontSize: 16,
    // lineHeight: 34,
    fontWeight: "400",
    fontStyle:'italic',
    marginHorizontal: 10,
  },
  courseName:{
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginRight:20
  },
  actionBody: {
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    display: "flex",
    padding: 0,
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 16,
    backgroundColor: "#EF3D4E",
    textAlign: "center",
    textAlignVertical: "center",
    width: 70,
    height: 30,
    borderRadius: 25,
    fontWeight: "700",
    color: "#FFFFFF",
    opacity: 1,
    justifyContent: "center",

    // alignSelf: "center",
  },
  actionText2: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9,
  },
  image: {
    width: fullWidth,
    height:300
  },
  image1: {
    width: 50,
    height:50,
    borderWidth:1,
    borderRadius:100,
  },
  descText:{
    color:'#FFF',
    fontSize:15,
    fontWeight:"300",
    marginBottom:30,
    marginTop:20,
    marginHorizontal:20,
    
  }
});
