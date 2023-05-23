import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Globalstyles } from "../styles/global";

export default function First({ navigation }) {

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);
  

  const handleSubmit = () => {
    navigation.navigate("Second");
  };

  const pressHandler = () => {
    navigation.navigate("SecSignin");
  };
  const image = require('../assets/bg4.jpg')

  return (
    <SafeAreaView style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}> Welcome To EasyFit</Text>
          <Text style={styles.text1}>
            {" "}
            The first fitness App Improve your fitness,{"\n"} practice mindfulness, or 
            prepare for new{"\n"} adventures with a series of specially designed{"\n"}
            workouts and meditations.
          </Text>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={Globalstyles.buttonText}>Get Started</Text>
          </Pressable>
          <Pressable onPress={pressHandler}>
          <Text style={styles.text2}>
            Already have an account? Sign in
          </Text>
          </Pressable>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: "#161416",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height:'100%'
  },
  text: {
    color: "white",
    fontSize: 32,
    lineHeight: 64,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    // backgroundColor: '#000000c0',
  },
  text1: {
    color: "white",
    fontSize: 22,
    // lineHeight: 44,
    fontWeight: "300",
    textAlign: "center",
    // marginTop:20
    // backgroundColor: '#000000c0',
  },
  text2: {
    color: "white",
    fontSize: 22,
    fontWeight: "300",
    textAlign: "center",
    marginBottom:20
    
  },
  image1: {
    height: 100,
    width: 100,
    marginTop: 200,
  },
  button:{
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor:'white',
    borderWidth: 2,
    width:350,
    elevation: 3,
    backgroundColor: '#FFF',
    marginBottom:10,
  }
});
