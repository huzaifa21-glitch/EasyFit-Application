import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import React, { Component ,useState, useEffect,useRef } from "react";
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
import Message from '../components/mesage';
var texts;
var all;
function timestamp()
{
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const d=year+"-"+month+"-"+day;
const t=hours+"-"+minutes+"-"+seconds;
const dt=d+" "+t;
return dt;
}
export default function Chatcard({data,alld,myuser}){
  const scrollViewRef = useRef(null);
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const [sbtn, setbtn] = useState([0]);

  const [sortedArray, setsortedArray] = useState([]);
  // const messages=alldata.all;
  // console.log("Messages "+JSON.stringify(all));
  const userdata={uid: myuser}
  useEffect(() => {
    axios.post('https://amused-handkerchief-seal.cyclic.app/loadchats',{userdata})
      
    .then(response => {
      if(response.data=='0')
      {
        // nochats=1;
        console.log("NO CHAT RECORD FOUND");
      }
      else{
        all=response.data;
      // chats = [response.data];
      const filteredArray = all.filter(item => item.sender == data || item.receiver == data);
      // console.log(filteredArray);
     const sortedArray1 = filteredArray.sort((a, b) => {
        const timestampA = convertToSortableFormat(a.time);
        const timestampB = convertToSortableFormat(b.time);
        return timestampA.localeCompare(timestampB);
      });
    
    

      setsortedArray(sortedArray1);
    }




  })
.catch(error => {
  alert("HIN CHAT CARD" +error)
  setIsLoading(false);

});

}, [sbtn]);





  function convertToSortableFormat(timestamp) {
    const [date, time] = timestamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hours, minutes, seconds] = time.split('-');
    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }
  
  function padZero(value) {
    if (value !== undefined) {
      const stringValue = value.toString();
      return stringValue.padStart(2, '0');
    }
    return '';
  }
  




  
    const [modalVisible, setModalVisible] = useState(false);
  const [send, setsend] = useState('');
  // console.log(send);
function sendpress()

{
if(send=='' || send==undefined)
{
  alert("Please Type Something!")
  return 0;
}

  var timest=timestamp();
  var newmessage1=send;
  var sendto=data;
  var sendby=myuser;
  const newmessage={
    timet: timest,
    sendert: sendby,
    receivert: sendto,
    messaget: newmessage1,
  }
  const newmessagex={
    time: timest,
    sender: sendby,
    receiver: sendto,
    message: newmessage1,
  }
  
  axios.post('https://amused-handkerchief-seal.cyclic.app/newmessage',{newmessage})
        
      .then(response => {
  
        if(response.data=='1')
        {
          console.log("CONGRATS");
          setsend('')
          setsortedArray(sortedArray => [...sortedArray,newmessagex])
          // console.log("SORTED ARRAY "+JSON.stringify(sortedArray));
          setbtn(sbtn+1);
        }
        else{
          console.log("Try Again ");
        }
           
      })
      .catch(error => {
        alert(error)
      
      });


     





}

return(
<Pressable onPress={() => { setModalVisible(true) }}>
  <View>
    <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 60, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
    <Modal

animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  // Alert.alert('Modal has been closed.');
  setModalVisible(!modalVisible);
}}>
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Text style={styles.modalText}>{data.toUpperCase()}</Text>
    <ScrollView  ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom} 
        nestedScrollEnabled = {true} style={{ marginLeft:8,height:700,width:400,backgroundColor:'white',}}>

    {
    sortedArray.map( item =>(
<Message data={item} user={data}/>

))}

    </ScrollView>
    


    
<View style={{flexDirection:'row'}}> 
    <ScrollView nestedScrollEnabled = {true} >
                
<TextInput placeholder='Type a Message' value={send}  onChangeText={text => setsend(text)} style={{padding:10, paddingRight:50, paddingLeft:18,backgroundColor:'#F0F8FF', height:50,width:'100%'
            }}  multiline={true} >

                    </TextInput>
   </ScrollView>
   <Pressable
      style={[styles.button, styles.buttonsend]}
      onPress={() => {
       sendpress();
        
      }}>
      <Icon style={{padding:0 ,backgroundColor:'#F0F8FF'}}name="send" size={30} color="blue" />
      
    </Pressable>
</View>


<View style={{flexDirection:'row',  justifyContent:'center'}}> 
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => {
        setModalVisible(!modalVisible)
        
      }}>
       <Icon name="close" size={25} color="red" />
      
    </Pressable>
   
   </View>



  </View>
</View>
</Modal>
    <Image
     
     source={{uri: 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'}} 
     style={{backgroundColor: "white",borderRadius:25,height: 40,width: 40,marginTop: 10,marginLeft:5,
 }}></Image>
       
         <Text  style={{color: 'black', fontSize:18,textAlign:'center',marginLeft:10,marginTop:15,textShadowColor:'black',fontWeight:'400'}}>{data}</Text>
         {/* <AntDesign style={{marginTop:15, marginLeft:120}} name="wechat" size={26} color="#380202" /> */}
    </View>
  </View>
</Pressable>

)

}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        
      },
      modalView: {
        margin: 0,
        backgroundColor: '#161416',
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
        borderTopStartRadius:25,
        borderTopWidth:0,

        elevation: 5,
        marginVertical:25

      },
      button: {
        borderRadius: 10,
        padding: 0,
        elevation: 2,
        marginTop:10,
        flexDirection:'row',

      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      
      buttonsend: {
        backgroundColor: '#F0F8FF',
        color:'black',
        width: 30,
        height:30,
        marginLeft:0,
        top:0,
        right:13,
        position:'absolute',
        borderBottomColor:'#F0F8FF',
        shadowColor:'#F0F8FF'

      },
      buttonClose: {
        backgroundColor: 'white',
        color:'black',
        width: 30,
        height:25,
        alignSelf:'center',
        justifyContent:'center'
      },
      textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:3,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'Left',
        fontSize:20,
        marginLeft:13,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
    
      },
    
    

})