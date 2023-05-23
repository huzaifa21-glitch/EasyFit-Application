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
  Dimensions
} from "react-native";
import { Globalstyles } from "../styles/global";

const win = Dimensions.get("window");
  const ratio = win.width / 541;

  export default function Second({ navigation }) {

  


  const handleSubmit = () => {
    navigation.navigate("Signup1");
  };

  const pressHandler = () => {
    navigation.navigate("TrainerSignup1");
  };
  const image = require('../assets/bg3.jpg')

  return (
    <SafeAreaView style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}> I am signing up as  </Text>
          
          <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={pressHandler}>
            <Text style={Globalstyles.buttonText}>Trainer</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={Globalstyles.buttonText}>User</Text>
          </Pressable>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    backgroundColor: "#161416",
    justifyContent:'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    width: '100%',
    height:'100%',
    shadowColor: "#000",
    shadowOpacity: 1.5,
    shadowRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 28,
    lineHeight: 64,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 80,
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
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor:'white',
    borderWidth: 2,
    width:250,
    elevation: 3,
    backgroundColor: '#FFF',
    marginBottom:10,
  },
  buttonContainer:{
    // flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
});
