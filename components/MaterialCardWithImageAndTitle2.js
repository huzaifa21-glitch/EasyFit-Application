import React, { useState, useEffect } from 'react';
import { View, Modal,Text,TextInput,Pressable,ActivityIndicator, Image, StyleSheet, Button,Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

import Vidplay from './videoplay';
import { color } from 'react-native-reanimated';
var globaldata=[];
var link;
var mydesc;
const ProfileCard = (data) => {
  const [user,setuser] =useState( {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png",
    name: data.username,
    desc: 'Loading...',
  });
  // console.log('tahir'+data.username);

  const [cameraPermission, setCameraPermission] = useState("");
  const [galleryPermission, setGalleryPermission] = useState("");
  const [descp, setdescp] = useState("");
  const [modalVisible11, setModalVisible11] = useState(false);
  const [image, setImage] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [refreshScreen, setRefreshScreen] = useState(false);

  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [text, settext] = useState("Upload New Image");

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
    if (!modalVisible11) {
      // Modal is closed, trigger screen refresh
      setRefreshScreen(true);
    }
  }, [modalVisible11]);


  useEffect(() => {
    requestPermissions();
  }, []);
  useEffect(() => {

    if (refreshScreen) {

    const id={username: data.username}
console.log("USE "+ data.username );

    axios.post("https://amused-handkerchief-seal.cyclic.app/trainerdetails1", { id })
    .then((response) => {
      if(response.data=='0')
      {
        Alert.alert("Sorry No Trainer Details Found 2");
        setIsLoading(false)
      }
      else{
       globaldata=[...response.data]
       console.log("DATA"+JSON.stringify(globaldata[0]));
      //  setuser({avatar: globaldata[0].pics,coverPhoto: globaldata[0].video,name:data.username,desc:globaldata[0].description})
      //  console.log(user); 

       // console.log("use : "+JSON.stringify(globaldata));
        //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
        // console.log(JSON.stringify(globaldata[0]));
        setIsLoading(false);
        setdescp(globaldata[0].description);
        link=globaldata[0].profilepic;
        
      }
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
      setRefreshScreen(false);

    }


    }, [refreshScreen]);

  //   useEffect(() => {
  //     const id={username: data.username}
  // console.log("USE "+ data.username );
  
  //     axios.post("https://amused-handkerchief-seal.cyclic.app/trainerdetails1", { id })
  //     .then((response) => {
  //       if(response.data=='0')
  //       {
  //         alert("Sorry No Trainer Details Found");
  //         setIsLoading(false)
  //       }
  //       else{
  //        globaldata=[...response.data]
  //        console.log("DDATA"+globaldata[0]);
  //       //  setuser({avatar: globaldata[0].pics,coverPhoto: globaldata[0].video,name:data.username,desc:globaldata[0].description})
  //        console.log(user); 
  //        // console.log("use : "+JSON.stringify(globaldata));
  //         //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
  //         // console.log(JSON.stringify(globaldata[0]));
  //         setIsLoading(false);
  //       }
  //       })
  //       .catch((error) => {
  //         alert(error);
  //         setIsLoading(false);
  //       });
    
  //     }, [count]);
  function submit(){
               
    const update={user: data.username, d:descp,pp: link}
    console.log("UA"+update.user +" "+update.d+"  "+update.pp);
        axios.post("https://amused-handkerchief-seal.cyclic.app/updatedata", { update })
        .then((response) => {
          if(response.data=='0')
          {
            Alert.alert("Error","Sorry An Error Occured");
            setModalVisible11(false)
           
          }
          else{
           
           Alert.alert("Sucess","Data Updated Sucessfully Refersh for Changes")
           setModalVisible11(false)

            
          }
          })
          .catch((error) => {
            alert(error);
            
          });
      

  }
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
        link =  data.url;
        console.log("LINK IS "+data.url);
// setimageurl(data.url);
        settext("Upload Completed!");

        //  setimageurl(links)
         console.log("STATE "+ descp);
      })
      .catch((err) => {
        Alert.alert("Cant Upload", "Sorry Cant Connect to Server!");

        console.log("error while uploading " + err);
      });
  };

 
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  else{
// console.log("GLVIDD"+globaldata[0].video);

if(globaldata.length<1)
{
  setcount(count+1)
  setIsLoading(true)
}
// console.log('pfp: '+globaldata[0].profilepic);
// console.log('video:'+globaldata[0].video);
if(globaldata[0].video!=null){
return (
    <View style={styles.container}>












    <View style={styles.vidcontainer}>
 
     <Vidplay sourceUri={ globaldata[0].video} />  
     </View>
 
      <View style={styles.avatarContainer}>
        <Image source={{ uri:globaldata[0].profilepic }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.edit} onPress={() => setModalVisible11(true)}>
        <Icon name='pencil' style={{ marginRight: 7 }} size={20} color='#900' />
        <Text>EDIT</Text>
      </TouchableOpacity>
     
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible11}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible11(!modalVisible11);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight:"500",fontSize: 19}}>Edit Description</Text>
                  <TextInput
                    style={styles.inputd}
                    value={descp}
                    onChangeText={(value) => setdescp(value)}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical={"top"}
                    textBreakStrategy={"highQuality"}
                  />
  <Text style={{fontWeight:"500",fontSize: 19}}>Update Profile Picture</Text>
  <Button style={{marginBottom:10,marginTop:10}} title={text} onPress={pickImage} />
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 400, height: 200 }}
                      />
                    )}
            
            
            
            <View style={styles.buttons}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => setModalVisible11(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.modalButton} onPress={submit} >
                      <Text style={styles.buttonText}>Submit</Text>
                    </Pressable>
                  </View>
            


          </View>
        </View>
</Modal>




    </View>
      <Text style={{  color: "#ddd",
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 20,
  }}>
            {globaldata[0].description}
            </Text>
            
    </View>
    
  );
}
}
};

const styles = StyleSheet.create({
  modalButton: {
    // marginTop:40,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 2,
    width: 130,
    height: 50,
    elevation: 3,
    backgroundColor: "#FFF",
    marginRight:13,
    marginHorizontal:10,
    
    // marginBottom:100,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: '600',
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
    justifyContent: "space-between",
    margin: 20,
    padding: 30,
  },
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 0,
    padding: 10,
    elevation: 2,
    margin:12
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderColor:'black',
    color:'black',
    margin:12
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  edit: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#FFF',

    paddingLeft:12,
    paddingRight:12,
  paddingVertical:5,
  borderRadius:7
  },
  
  container: {
    width: '100%',
    alignItems: 'center',
  },
  vidcontainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:'center'
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 110,
    height: 100,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    marginTop: 1,
    fontSize: 20,
    fontWeight: '500',
    color:'#FFF'
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 3,

    justifyContent: 'space-between',
  },
});


export default ProfileCard;