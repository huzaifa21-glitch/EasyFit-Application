
import { StyleSheet, Text, View,Image,ScrollView,Pressable,ActivityIndicator, SafeAreaView} from 'react-native';
import React,{ useState, useEffect } from 'react';
import MaterialCard from '../components/card';
import axios from "axios";
import MaterialCard2 from '../components/card2';

let globaldata =[]
let trainerdata =[]

export default function Feed2({navigation}) {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {


    axios
    .post(
      "https://amused-handkerchief-seal.cyclic.app/card",
      { maxContentLength: 1000000 }
    )
    .then((response) => {
      if (response.data == "0") {
        // setIsLoading(false);
        alert("Error!", "Try Again Later!");
        console.log("NO DATA FOUND " + response.data);
      }
      // setIsLoading(false);
      // console.log("DATA CUM"+response.data);
      globaldata = [...response.data];
      globaldata.reverse();
      // console.log(globaldata);

      setIsLoading(false);
    })
    .catch((error) => {
     
      alert("Network Error");
      console.log(error);
      setIsLoading(false);
    });


   
  }, []);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoading) {
  return (
    
    
    <SafeAreaView>
    <View style={styles.body}>  
   
    
    
    <ScrollView>
      
    {/* <Text style={styles.titleText1}>TRAINING</Text> */}

    {globaldata.map( item =>(
      <MaterialCard2 key={item.coursetitle} data={item} navigation={navigation}/>
    ))}



  </ScrollView>
  
  </View> 
  </SafeAreaView>
  );
}

}

const styles = StyleSheet.create({

 body:{
  // height:'100%',
  marginBottom:60,
  // backgroundColor: "#161416",
 },
 

 actionButton1: {
   padding: 0,
   height: 36,
   justifyContent:"center",
   color: '#FFFFFF',
   fontSize:15
   
   
 },
 actionText1: {
  fontSize: 13,
  backgroundColor: '#EF3D4E',
paddingRight: 7,
paddingBottom: 6,

paddingTop: 6,
paddingLeft: 7,
borderRadius:25,
// fontWeight: "500",
  color: "#FFFFFF",
  opacity: 1,

alignSelf:'center'
  
},
titleText1:{
    color: 'black',
    fontSize: 22,
    lineHeight: 54,
    fontWeight: 'bold',
    marginTop:20,
    marginLeft:10
 },
})

