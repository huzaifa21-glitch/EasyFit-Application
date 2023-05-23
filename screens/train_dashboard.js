import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
// import RNRestart from 'react-native-restart';
import {
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Button,
} from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import MaterialIconTextButtonsFooter from "../components/MaterialIconTextButtonsFooter";
// import MaterialCardWithImageAndTitle2 from "./MaterialCardWithImageAndTitle2";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ProfileCard from "../components/MaterialCardWithImageAndTitle2";
// import MaterialCard2 from "../components/card";
import Icon from "react-native-vector-icons/FontAwesome";
// import {check} from "../components/card";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const options = ["Exercise Plan", "Diet Plan", "Exercise and Diet Plan"];
var newx=0;
let id = { name: "",username:'' };
var globaldata=[]
var profilepictrainer;
var trainername;
let globalusername = null;
var err = 0;

export default function Train_dash(props) {

 
  const [isLoading, setIsLoading] = useState(true);
  const [newc, setnewc] = useState(1);
  
  const [iduser, setiduser] = useState('');
  
  
  useEffect(() => {
  const getDataFromScreenA = async () => {
    try {
     
      const email = await AsyncStorage.getItem("dataKey1");
      console.log("storeeee:" + email);
      globalusername = email;
      console.log('global:'+globalusername);
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error);
    }
  }
   
  getDataFromScreenA().then(()=>{
 
    setiduser(globalusername)
    
    id={name: globalusername, username: globalusername}
  
    console.log("Line 66" +id.username);


    axios.post("https://amused-handkerchief-seal.cyclic.app/trainerdetails1", { id })
    .then((response) => {
      if(response.data=='0')
      {
       
        alert("Sorry No Trainer Details Found");
        setIsLoading(false)
        // console.log('id'+id);
      }
      else{
        // console.log("profile pic" + JSON.stringify(response.data[0].profilepic));
        profilepictrainer=response.data[0].profilepic;

        setprofilepicadd(profilepictrainer);
      //  setuser({avatar: globaldata[0].pics,coverPhoto: globaldata[0].video,name:data.username,desc:globaldata[0].description})
      //  console.log(user); 
       // console.log("use : "+JSON.stringify(globaldata));
        //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
        // console.log(JSON.stringify(globaldata[0]));
       trainername=response.data[0].name;
      //  console.log('train name'+trainername);
      }
      })
      .catch((error) => {
        alert(error);
   
      });
  

    axios.post("https://amused-handkerchief-seal.cyclic.app/loadcourses", { id })
    .then((response) => {
      if(response.data=='0')
      {
       console.log("NO COURSES AVAIABLE  ");
       globaldata=[];
        setIsLoading(false)
        newx=1;
      }
      else{
       
        console.log("use : "+globaldata);
        globaldata=[...response.data]
        globaldata=globaldata.reverse();
        //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
        // console.log(JSON.stringify(globaldata[0]));
        setIsLoading(false);
      }
      })
    
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
    
    
});


}, []);

useEffect(() => {

  

  axios.post("https://amused-handkerchief-seal.cyclic.app/loadcourses", { id })
  .then((response) => {
    if(response.data=='0')
    {
     console.log("NO COURSES AVAIABLE  ");
      setIsLoading(false)
      newx=1;
    }
    else{
     
      console.log("use add : "+globaldata);
      globaldata=[...response.data]
      //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
      // console.log(JSON.stringify(globaldata[0]));
      setIsLoading(false);
    }
    })
  
    .catch((error) => {
      alert(error);
      setIsLoading(false);
    });
  


}, [newc]);

  
  //INSTRUCTOR ID FETCH

  //FETCHING ALL DATA AGAINST USER NAME
  const [text1, settext1] = useState("TAHIR");



  function deletecourse(coursename) {
    const remove = {
      name: coursename,
      tid: id.name,
    };
    // console.log("TID "+remove.tid);
    axios.post("https://amused-handkerchief-seal.cyclic.app/delcourse", { remove })

      .then((response) => {
        if (response.data) {
          alert("Course Removed Sucessfully");
         
          // RNRestart.Restart();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(err);
        // setIsLoading(false);
      });
      setnewc(newc+1);
  }
  // var main=-1;
  function MaterialCard2(data) {

// var index=main+1;
// main=main+1;
    // console.log('IN CARD '+index+JSON.stringify(data));
    return (
      <View style={styles.cardcont}>
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              // onRequestClose={() => {
              //   Alert.alert("Modal has been closed.");
              //   setModalVisible(!modalVisible);
              // }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{show.ct}</Text>

                  <Image
                    // key={this.state.on}
                    source={{ uri: show.link }}
                    style={{
                      height: 200,
                      borderRadius: 6,
                      width: 350,
                      alignSelf: "center",
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}
                  ></Image>

                  <Text
                    style={{
                      marginBottom: 15,
                      textAlign: "left",
                      fontSize: 14,
                      margin: 0,
                      color: "white",
                      fontweight: '700',
                      // paddingBottom: 15,
                    }}
                  >
                    COURSE TYPE:{"  "}
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        marginLeft: 15,
                        fontweight: '500',
                        color: "white",
                        paddingLeft: 20,
                      }}
                    >
                      {show.type}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      // marginBottom: 15,
                      textAlign: "left",
                      fontSize: 14,
                      margin: 0,
                      color: "white",
                      fontweight: '500',
                      paddingBottom: 15,
                    }}
                  >
                    DURATION:{"  "}
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        margin: 0,
                        fontweight: '400',
                        color: "white",
                        paddingLeft: 10,
                        marginLeft: 10,
                        textIndent: 20,
                      }}
                    >
                      {show.duration}
                    </Text>
                  </Text>

                  <Text
                    style={{
                      // marginBottom: 15,
                      textAlign: "left",
                      fontSize: 14,
                      margin: 0,
                      color: "white",
                      fontweight: '500',
                      paddingBottom: 15,
                    }}
                  >
                    FEE:{"  "}
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        margin: 0,
                        fontweight: '500',
                        color: "white",
                        paddingLeft: 10,
                      }}
                    >
                      {show.fees}
                    </Text>
                  </Text>
                  <View style={{ height:240, flexDirection: "column" }}>
                    <Text
                      style={{
                        // marginBottom: 15,
                        textAlign: "left",
                        fontSize: 14,
                        margin: 0,
                        color: "white",
                        fontweight: '500',
                        paddingBottom: 15,
                       
                      }}
                    >
                      DESCRIPTION:
                      
                    </Text>
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={styles.containerdetails}
                      >
                      <Text
                        style={{
                          marginBottom: 15,
                          textAlign: "left",
                          fontSize: 12,
                       
                          margin: 0,
                          color: "black",
                          fontweight: "100",
                          paddingBottom: 15,
                          flexDirection: "column",
                          letterSpacing: 1,
                        }}
                      >
                        {show.desc}{" "}
                      </Text>
                      </ScrollView>
                  </View>

                  {/* <Pressable
              style={[styles.button, styles.buttonsms]}
              onPress={() => {
              
                
              }}>
              <Text style={styles.textStyle}>Send SMS</Text>
            </Pressable>
           */}
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>
                      {" "}
                      <Icon name="close" size={20} color="red" />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <Text style={styles.titleStyle}>{data.globaldata.coursetitle}</Text>
            <Text style={styles.subtitleStyle}>
              {"Course Type: " + data.globaldata.type}
            </Text>

            <Text style={styles.subtitleStyle}>
              {"Duration:" + data.globaldata.duration}
            </Text>

            <Text style={styles.subtitleStyle}>
              {"Fee: " + data.globaldata.fee}
            </Text>
          </View>
          <Image
            // key={this.state.on}
            source={{
              uri: data.globaldata.pics,
            }}
            style={styles.cardItemImagePlace}
          ></Image>
        </View>

        <View style={styles.actionBody}>
          <TouchableOpacity
            onPress={() => {
              setshow({
                ct: data.globaldata.coursetitle,
    link: data.globaldata.pics,
    type: data.globaldata.type,
    duration: data.globaldata.duration,
    fees: data.globaldata.fee,
    weights: data.globaldata.weights,
    desc: data.globaldata.description,



              })


              setModalVisible(true);
            }}
            style={styles.actionButton1}
          >
            <Text style={styles.actionText1}>
              {/* <AntDesign
                style={{ margin: 5 }}
                name="eye"
                size={15}
                color="white"
              /> */}
              View{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // console.log(data.globaldata.coursetitle);
              deletecourse(data.globaldata.coursetitle);
              setnewc(newc+1);
            }}
            style={styles.actionButton2}
          >
            <Text style={styles.actionText2}>
              {/* <Icon
                style={{ margin: 5 }}
                name="trash"
                size={14}
                color="white"
              /> */}
              Delete{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // console.log(check);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalvisibleadd, setmodalvisibleadd] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(options[0]);
  const [duration, setDuration] = useState("");
  const [weights, setWeights] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [profilepicadd, setprofilepicadd] = useState("");
  
  var links = "";
  const [show, setshow] = useState({
    ct: "Tile will appear here...",
    link: "https://ichef.bbci.co.uk/news/976/cpsprodpb/15951/production/_117310488_16.jpg.webp",
    type: "loading...",
    duration: "loading...",
    fees: "loading...",
    weights: 'loading',
    desc: "",
  });
  const validateForm = () => {
    if (!show.ct) {
     
      err = err + 1;
    }
    if (!show.type) {
      err = err + 1;
    }
    if (!show.duration) {
      err = err + 1;
    }
    if (!show.fees) {
      err = err + 1;
    }
    if (!show.desc) {
      err = err + 1;
    }
    if (!show.weights) {
      err = err + 1;
    }

  }
  const [text, settext] = useState("Select Image");

  const [textvid, settextvid] = useState("Select Videos");

  function submit() {
    // AXIOS TO SAVE DATA IN DB
    settext('Upload')
    const form = {
      coursetitle: title,
      coursetype: type,
      courseduration: duration,
      coursefee: fee,
      coursedesc: description,
      instructor: id.username,
      pics: imageurl,
      vids: "",
      weights: weights,
      trainerpic: profilepictrainer,
      trainername: trainername,
    };
    axios
      .post("https://amused-handkerchief-seal.cyclic.app/addcourse", { form })
      .then((response) => {
        console.log(response);
        if (response.data == 1) {
          setTitle("");
          setType("");
          setDuration('');
          setFee("");
          setDescription("");
          setType('');
          setWeights('');
         setmodalvisibleadd(false)
         
          Alert.alert("Success!","COURSE ADDED SUCESSFULLY");
         
          setnewc(newc+1)
          links = "";






        } else {
          alert("SORRY AN ERROR OCCURED");
        }
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });

    console.log(JSON.stringify(form));
    setnewc(newc+1)
    // train_dash();
  }

  const [cn, setcn] = useState("");

  // ---------------------------------------------------------

  const [cameraPermission, setCameraPermission] = useState("");
  const [galleryPermission, setGalleryPermission] = useState("");
  const [image, setImage] = useState("");

  const requestPermissions = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("status Gallery", status);
      if (status == "granted") setGalleryPermission("granted");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async () => {
    settext("Uploading...");
    if (galleryPermission == "granted") {
      
    let data =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[1,1],
      quality:0.5
  })
  if(!data.cancelled){
      let newfile = { 
        uri:data.uri,
        type:`test/${data.uri.split(".")[1]}`,
        name:`test.${data.uri.split(".")[1]}` 
        
    }
      handleUpload(newfile)
      }
    } 
    else {
      Alert.alert(
        "Permissions Denied!",
        "Please Grant Gallery Permission from Settings to Continue!"
      );
      // setIsLoading(false);
      // navigation.navigate('First')
    }
  };

  //                                    MULTIPLE IMAGES

  // const pickImage = async ()=> {
  //  settext('Uploading...')
  //      if(galleryPermission == 'granted')
  //      {
  //       let data =  await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //         // allowsEditing:true,
  //         allowsMultipleSelection:true,
  //         aspect:[1,1],
  //         quality:0.5
  //     })
  //     if(!data.cancelled){
  //       for (var i=0;i<data.selected.length;i++)
  //       {
  //         let newfile = {
  //           uri:data.selected[i].uri,
  //           type:`test/${data.selected[i].uri.split(".")[1]}`,
  //           name:`test.${data.selected[i].uri.split(".")[1]}`

  //       }
  //       console.log('File '+i+1+ ' UPloading');
  //       handleUpload(newfile)

  //       }

  //     }

  //     // console.log(JSON.stringify(data));
  //      }
  //      else{
  //       Alert.alert("Permissions Denied!","Please Grant Gallery Permission from Settings to Continue!");
  //       settext('Select Images')

  //      }
  //     }

  const handleUpload = (image1) => {
    const data = new FormData();
    // console.log(JSON.stringify(image1));
    data.append("file", image1);
    data.append("upload_preset", "profilepics");
    data.append("cloud_name", "dahv24lxo");

    fetch("https://api.cloudinary.com/v1_1/dahv24lxo/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // setPicture(data.assets[0].url)
        // setModal(false)
        // console.log("IMAGE URL IS");
        //  setimageurl([...imageurl,data.url])
        console.log("Uploaded Sucessfully! ");
        links = links + data.url + ",";
        console.log("LINK IS "+data.url);
setimageurl(data.url);
        settext("Upload Completed!");
        //  setimageurl(links)
        //  console.log("STATE "+ links);
      })
      .catch((err) => {
        Alert.alert("Cant Upload", "Sorry Cant Connect to Server!");

        console.log("error while uploading " + err);
      });
  };

  // --------------------------------------------------------------

  if (isLoading) {

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
if(globaldata.length<1 && newx==0)
{
  setIsLoading(true) 
  axios.post("https://amused-handkerchief-seal.cyclic.app/loadcourses", { id })
  .then((response) => {
    if(response.data=='0')
    {
      // console.log('kuch bhi');
      setIsLoading(false)
      newx=1;
    }
    else{
     globaldata=[...response.data]
      console.log("use : "+globaldata);
      //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
      // console.log(JSON.stringify(globaldata[0]));
      setIsLoading(false);
    }
    })
    .catch((error) => {
      alert(error);
      setIsLoading(false);
    });
}
// if(iduser==null )
// {
// setnewc(newc+1)
//   setIsLoading(true)
// }
console.log("ID USER BEFROE RETIRN IS "+iduser);
  return (
      <View style={styles.container}>
        {/* PROFILE CARD */}

        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container1}>
            {/* VIEW MODAL */}
            
            {/* ADD MODAL */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalvisibleadd}
              // onRequestClose={() => {
              //   Alert.alert("Modal has been closed.");
              //   setModalVisible(!modalVisible);
              // }}
            >
              <ScrollView>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "500",
                      textAlign: "center",
                      marginBottom: 20,
                      color: "white",
                    }}
                  >
                    Add New Course
                  </Text>

                  <Text style={styles.label}>Course Title</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button title={text} onPress={pickImage} />
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 400, height: 200 }}
                      />
                    )}
                  </View>

                  <Text style={styles.label}>Course Type</Text>
                  <Picker
                    style={{ backgroundColor: "white", color: "black",marginBottom: 10, }}
                    selectedValue={type}
                    onValueChange={(value) => setType(value)}
                  >
                    {options.map((option) => (
                      <Picker.Item key={option} label={option} value={option} />
                    ))}
                  </Picker>

                  <Text style={styles.label}>Duration (hours)</Text>
                  <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={(value) => setDuration(value)}
                    keyboardType="numeric"
                  />

                  <Text style={styles.label}>Weights (kilograms)</Text>
                  <TextInput
                    style={styles.input}
                    value={weights}
                    onChangeText={(value) => setWeights(value)}
                    keyboardType="numeric"
                  />

                  <Text style={styles.label}>Fee</Text>
                  <TextInput
                    style={styles.input}
                    value={fee}
                    onChangeText={(value) => setFee(value)}
                    keyboardType="numeric"
                  />

                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={styles.inputd}
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical={"top"}
                    textBreakStrategy={"highQuality"}
                  />

                  <View style={styles.buttons}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => setmodalvisibleadd(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.modalButton} onPress={submit}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
            </Modal>

            {/* MODAL ENDS  */}

            <ProfileCard username={iduser}/>
            {/* <ScrollView
              nestedScrollEnabled={true}
              style={styles.containerdetails}
            > */}
            {/* </ScrollView> */}

            {/* COURCSES */}

            <Text style={styles.heading}>OFFERED COURSES</Text>

            {globaldata.map((item) => (
              <MaterialCard2 globaldata={item} />
            ))}
          </View>
        </ScrollView>

        <View style={styles.contbtn}>
          <TouchableOpacity
            onPress={() => setmodalvisibleadd(true)}
            style={styles.addbtn}
          >
            
            <Icon name="plus" size={20} color="white" />
            <Text style={styles.btntxt}>Add course</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
            
  }
// }

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,

    backgroundColor: "white",
  },
  btntxt:{
    fontSize:14,
    fontWeight:'bold',
    color:'#FFF',
    marginLeft:7
  },

  inputd: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 2,
    paddingTop: 3,
    // marginBottom: 20,
    height: 120,
    width: 350,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 20,
    padding: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: '600',
  },
  descText: {
    color: "#ddd",
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    margin: 0,
    backgroundColor: "#121212",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: "white",
    borderWidth: 3,
    elevation: 5,
    // marginHorizontal:40,
  },
  modalButton: {
    // marginTop:40,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 130,
    height: 50,
    elevation: 3,
    backgroundColor: "#FFF",
    // marginBottom:100,
  },
  button: {
    borderRadius: 20,
    padding: 0,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    color: "black",
    width: 45,
    height: 30,
    alignSelf: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 3,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontweight: "500",
    color: "white",
  },

  floatinBtn: {
    backgroundColor: "red",
    elevation: 2,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  courses: {
    flexDirection: "column",
  },

  containerf: {
    marginTop: 40,
  },
  containerdetails: {
    backgroundColor: "white",

    flexDirection: "column",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: 3,
    borderBottomWidth: 1,
    height: 30,
width:360,
alignSelf:'center',
    borderTopWidth: 1,
    padding: 3,
    paddingLeft:10,
    marginBottom: 7,
    paddingBottom: 130,
    paddingTop: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    // textDecorationLine: 'underline',
    // borderBottomWidth: 1,
    textAlign: "center",
    color: "#FFF",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#161416",
  },
  container1: {
    flex: 1,
    flexDirection: "column",

    height: "100%",
    marginBottom:80,
  },
  materialIconTextButtonsFooter: {
    height: 50,
    width: 450,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  contbtn: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
  addbtn: {
    flexDirection:'row',
    backgroundColor: "black",
    borderRadius: 50,
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardcont: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden",
    marginTop: 5,
    PaddingBottom: 30,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1,
  },
  titleStyle: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12,
  },
  subtitleStyle: {
    paddingTop: 5,
    fontSize: 14,
    color: "#878787",
    lineHeight: 16,
    opacity: 1,
    fontWeight: "500",
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 120,
    width: 120,
    margin: 16,
  },
  actionBody: {
    padding: 12,
    marginLeft: 80,
    marginRight: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton1: {
    padding: 0,
    height: 40,
    // width:90,
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },
  actionButton2: {
    padding: 0,
    height: 35,
    // width:90,
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },
  buttonBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText1: {
    fontSize: 14,
    backgroundColor: "black",
    paddingRight: 0,
    paddingBottom: 0,

    paddingTop: 6,
    paddingLeft: 0,
    borderRadius: 25,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 1,
    width: 80,
    height: 31,
    alignSelf: "center",
    textAlign: "center",
  },
  actionButton2: {
    padding: 2,

    height: 36,
    paddingBottom: 9,
    marginLeft: 15,
  },
  actionText2: {
    fontSize: 14,
    backgroundColor: "black",
    paddingRight: 0,
    paddingBottom: 0,

    paddingTop: 6,
    paddingLeft: 0,
    borderRadius: 25,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 1,
    width: 80,
    height: 31,
    alignSelf: "center",
    textAlign: "center",

    // padding:5
  },
});