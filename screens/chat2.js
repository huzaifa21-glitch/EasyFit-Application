import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import React, { Component ,useState, useEffect} from "react";
import {
    
  Modal,Alert,
  TextInput, 
  StyleSheet,BackHandler,
  View,
  Text,ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,Button
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Message from '../components/mesage';
import Chatcard from '../components/chatcards';
import axios from 'axios';
import e from 'cors';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import MaterialIconTextButtonsFooter from "/src/components/MaterialIconTextButtonsFooter";
var chats;
var nochats=0;
var chatheads=[];
var chatheadsfinal=[];
var alldata;
var myusername
export default function Chatbox2(){
  const [isLoading, setIsLoading] = useState(true);
const[userid, setUserId] = useState('');
//PASS USERNAME USING PROPS AND SAVE INMYUSERNAME
useEffect(() => {
  const getDataFromScreenA = async () => {
    try {
     
      const email = await AsyncStorage.getItem("dataKey");
      console.log("storeeee:" + email);
      globalusername = email;
      console.log('global:'+globalusername);
      setUserId(globalusername);
      console.log("userd:"+userid);
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error);
    }
  }
   
  getDataFromScreenA().then(()=>{

    //  myusername=userid;
    myusername=globalusername.toLocaleLowerCase();
    console.log('chat '+myusername);

   const userdata={uid: myusername}
   
      axios.post('https://amused-handkerchief-seal.cyclic.app/loadchats',{userdata})
      
    .then(response => {
      if(response.data=='0')
      {
        nochats=1;
        console.log("NO CHAT RECORD FOUND");
        setIsLoading(false);
      }
      else{
      chats = [response.data];
      alldata=response.data;
      console.log(JSON.stringify(alldata));
      console.log("CHAT RECORD FOUND");
// console.log(JSON.stringify(chats));
chats=chats[0]
// console.log("CHATS: "+ chats[0].sender);
// console.log(chats.length);
for (let i = 0; i < chats.length; i++) {
  // console.log(chats[i]);
  if(chats[i].sender == userdata.uid)
    {
      chatheads.push(chats[i].receiver)
      // console.log(JSON.stringify(chatheads));
    }
   else if(chats[i].receiver == userdata.uid)
    {
      chatheads.push(chats[i].sender)
      
      // console.log(JSON.stringify(chatheads));
    }


  }



        chatheadsfinal = [...new Set(chatheads)];
      // console.log(chatheadsfinal);

      //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
      
        setIsLoading(false);
      }
         
    })
    .catch(error => {
      alert(" Here "+error)
      setIsLoading(false);
    
    });
  });

}, []);


  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
//   
  
   else {
    if (nochats==1) {
        return (
          <View style={{flex:1 , backgroundColor:'#161416', alignItems:'center', justifyContent:'center'}}>
              
                  {/* <View style={{  backgroundColor:'#161416',height:80,borderBottomColor:'gray',borderBottomWidth:2}}>
                      
                  </View> */}
              <View style={{backgroundColor:'#161416', alignItems:'center', justifyContent:'center'}} >
                 <Text style={styles.title1}>You cannot send or recieve messages right now!</Text>
                 <Text style={styles.title2}> Buy Course to initiate chat</Text>
                 </View>
           
      
              </View>
        );
      } else{
  
    return(

        <View style={{flex:1 , backgroundColor:'#161416'}}>
        
            <View style={{  backgroundColor:'#161416',height:80,borderBottomColor:'gray',borderBottomWidth:2}}>
                <Text  style={{color: 'white', fontSize:19,textAlign:'left',marginLeft:13,marginTop:40,textShadowColor:'black',fontWeight:'500'}}>Messages</Text>
            </View>

    <ScrollView>
      
    {chatheadsfinal.map( item =>(

      <Chatcard key={item.time} data={item}  alld={alldata} myuser={myusername}/>
    )
    
    )}
    </ScrollView>
     

        </View>
    )
}
   }
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      title1:{
        fontSize:22,
        color:'#FFF',
        textAlign:'center'
      },

      title2:{
        fontSize:18,
        color:'#FFF'
      },
      modalView: {
        margin: 0,
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 20,
       
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderBottomColor:'gray',
        borderBottomWidth:3,
        elevation: 5,
        
        marginVertical:30

      },
      button: {
        borderRadius: 20,
        padding: 0,
        elevation: 2,
        marginTop:10,
        flexDirection:'row'
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      
      buttonsend: {
        backgroundColor: 'white',
        color:'black',
        width: 70,
        height:30,
        marginLeft:0,
        justifyContent:'center',
        alignSelf:'center'
      },
      buttonClose: {
        backgroundColor: 'white',
        color:'black',
        width: 45,
        height:30,
        alignSelf:'center'
      },
      textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:3,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:25,
        fontWeight:'700',
        color:'white'
    
      },
    
    

})