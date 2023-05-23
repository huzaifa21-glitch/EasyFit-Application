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

var fullWidth = Dimensions.get("window").width;


export default function ImgCard({data}) {

    return(

        <Image
        source={{
          uri: data
        }}
        style={styles.collageImage}
      ></Image>
    )
}
const styles = StyleSheet.create({

    collageImage: {
        width: fullWidth * 0.95,
        height: 350,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 30,
    
        // borderRadius: 100,
      },

});