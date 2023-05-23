import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import React, { Component ,useState, useEffect} from "react";
import {
    
  Modal,Alert,
  TextInput, 
  StyleSheet,BackHandler,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,Button,AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import MaterialIconTextButtonsFooter from "/src/components/MaterialIconTextButtonsFooter";
export default function Message({data,user}){
    // console.log(data);
    // console.log(user);
  
    if (data.sender !== user) {
      return (
        <View>
          <Text style={{ color: '#a71930', fontWeight: '700' }}>ME</Text>
          <Text style={{ textAlign: 'left', margin: 6, padding: 10, width: '60%', backgroundColor: 'black', color: 'white', fontWeight: '400', borderRadius: 20 }}>
            <Text>{data.message}</Text>
          </Text>
          <Text style={{ marginLeft: 150, color: 'gray', fontSize: 10 }}>{data.time}</Text>
          </View>
      );
    } else {
      return (
        <View>
          <Text style={{ color: '#a71930', fontWeight: '700' }}>{user.toUpperCase()}</Text>
          <Text style={{ textAlign: 'left', margin: 6, padding: 10, width: '60%', backgroundColor: '#F0E68C', color: 'black', fontWeight: '400', borderRadius: 20 }}>
            <Text>{data.message}</Text>
          </Text>
          <Text style={{ marginLeft: 150, color: 'gray', fontSize: 10 }}>{data.time}</Text></View>
        
      );
    }
}
