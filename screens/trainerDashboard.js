import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { Video, ResizeMode } from "expo-av";
import ImgCard from "../components/imageCard";
import axios from 'axios';
import { useRoute } from "@react-navigation/native";
import Vidplay from "../components/videoplay";


var fullWidth = Dimensions.get("window").width;
var fullheight = Dimensions.get("window").height;

let globaldata=[];
let imagedata=[];

const TrainerDash = ({ navigation }) => {

  const [datax, setData] = useState(
    {
  
    }
  );
  const [isLoading, setIsLoading] = useState(true);
 
  const route = useRoute()
  const formdata = route.params.data1.trainerid
  // console.log('trainer id:'+formdata);


  React.useEffect(() => {  

    console.log(formdata);
    
    axios.post('https://amused-handkerchief-seal.cyclic.app/trainerdetails',{formdata},{maxContentLength: 1000000})
    .then(response => {
   
        if(response.data=="0")
        {
          setIsLoading(false);
          Alert.alert("Error!","Try Again Later!")
          console.log("NO DATA FOUND "+response.data);
        }
        else{
          setIsLoading(false);
          // console.log("DATA CUM"+response.data);
          globaldata = [...response.data];

          // globaldata = globaldata.split(",");
          imagedata=globaldata[0].pictures.split(",");
          console.log(imagedata);

          console.log(globaldata);
          setData({
            ...globaldata[0]
          })
          
         
          
        }
       
        
    })
    .catch(error => {
      setIsLoading(false);
      Alert.alert("Network Error")
        console.log(error);
  });
  
}, []);
 
  const handleSubmit = () => {
    navigation.navigate("Second");
  };
  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoading) {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
          <Vidplay sourceUri={ datax.video} />  
          </View>
          <View style={styles.display}>
            <Image
              style={styles.image1}
              source={{
                uri:  datax.profilepic
              }}
            ></Image>
            <View style={styles.nameContainer}>
              <Text style={styles.title}>{datax.name}</Text>
              {datax.verified ? (<View style={styles.verify}>
                <Image
                  style={styles.icon}
                  source={require("../assets/verify.png")}
                ></Image>
                <Text style={styles.verifyTitle}>Certified</Text>
              </View>):null}
            </View>
          </View>
          <Text style={styles.Abouttitle}>About</Text>
          <View style={styles.display3}>
            <Text style={styles.descText}>
              {datax.description}
            </Text>
          </View>
          <View style={styles.picture}>
           
          {imagedata.map( item =>(
      <ImgCard key={item.name} data={item} navigation={navigation}/>
        ))}

           
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161416",
  },
  image1: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 100,
  },
  gridImage: {
    width: 30,
    height: 30,
  },
  nameContainer: {
    display: "flex",
    justifyContent: "center",
    // alignItems:'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  verify: {
    flexDirection: "row",
    alignContent: "center",
    // marginVertical: 5,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
  Abouttitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginHorizontal: 15,
    marginTop: 10,
  },
  verifyTitle: {
    color: "#D3D3D3",
    fontSize: 16,
    fontWeight: "400",
    marginHorizontal: 3,
    marginTop: 5,
    fontStyle: "italic",
  },
  icon: {
    marginVertical: 5,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 100,
  },
  display: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },
  display3: {
    // marginBottom : 20,
    backgroundColor: "#161416",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  descText: {
    color: "#ddd",
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: 300,
    marginBottom: 20,
    // marginTop:20
  },
  picture: {
    // backgroundColor:'#fff',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    marginBottom: 20,
  },
  collage: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  collageImage: {
    width: fullWidth * 0.95,
    height: 350,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 30,

    // borderRadius: 100,
  },
  video:{
    width: fullWidth * 0.95,
    height: 300,
    marginHorizontal: 10,
    // marginVertical: 10,
    // borderWidth: 1,
    borderRadius: 30,
  },
  headerImage: {
    width: fullWidth,
    height: 220,
  },
});
export default TrainerDash;
