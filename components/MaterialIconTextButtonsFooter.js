import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialIconTextButtonsFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      
      <TouchableOpacity style={styles.activeButtonWrapper}>
        <MaterialCommunityIconsIcon
          name="home"
          style={styles.activeIcon}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.activeContent}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper2}>
        <MaterialCommunityIconsIcon
          name="chat"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn2Text}>Chats</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "black",
    flexDirection: "row",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    flex:1,

  },
  buttonWrapper1: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 0,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
    marginLeft:"1%",
    marginBottom:5,
    
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  btn1Text: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  activeButtonWrapper: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
    marginLeft:"9%"
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "yellow",
    fontSize: 24,
    opacity: 0.8
  },
  activeContent: {
    fontSize: 11,
    color: "yellow",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  buttonWrapper2: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
    marginLeft:"0%"
  },
  icon2: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 24,
    opacity: 0.8
  },
  btn2Text: {
    fontSize: 11,
    color: "white",
    backgroundColor: "transparent",
    paddingTop: 4
  }
});

export default MaterialIconTextButtonsFooter;
