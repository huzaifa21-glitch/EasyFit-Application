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
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { Globalstyles } from "../styles/global";
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { log } from "react-native-reanimated";

var err = 0;
let videourl;
let pic;
let links='';
const TrainerSignup2 = ({ navigation }) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  });

  React.useEffect(() => {
    const handleBackPress = () => {
      // Handle the behavior when the back button is pressed
      // Return true to prevent the default back button behavior
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const [cameraPermission, setCameraPermission] = useState("");
  const [galleryPermission, setGalleryPermission] = useState("");

  const requestPermissions = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("status lib", status);
      if (status == "granted") setGalleryPermission("granted");
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);

  const route = useRoute();
  const Formdata = route.params.formData;
  console.log("data:" + Formdata);

  const newf = JSON.stringify(Formdata);  
  console.log(newf);
  let jsonObject = JSON.parse(newf);

  let key = "name";
  let s1name = jsonObject[key];

  let key1 = "email";
  let s1email = jsonObject[key1];

  let key2 = "gender";
  let gen = jsonObject[key2];

  let key3 = "phone";
  let s1phone = jsonObject[key3];

  let key4 = "password";
  let s1pass = jsonObject[key4];

  let key5 = "description";
  let s1desc = jsonObject[key5];

  const [selected, setSelected] = React.useState("");
  const [error, setError] = useState("");

  const [text, settext] = useState("");
  const [textvid, settextvid] = useState("");
  const [mytext, setmytext] = useState("Pictures");

  const [mytext1, setmytext1] = useState("Profile Picture");
  const [mytext2, setmytext2] = useState("Video");

  const validateForm = () => {
    if (mytext == "Pictures") {
      // setError('Please select an option');
      err = err + 1;
    }
    if (mytext1 == "Profile Picture") {
      // setError('Please select an option');
      err = err + 1;
    }
    if (mytext2 == "Video") {
      // setError('Please select an option');
      err = err + 1;
    }
  };

  

  const pickImages = async () => {
    if (galleryPermission === "granted") {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        allowsMultipleSelection: true,

        // multiple: true, // Enable selecting multiple images
      });

      if (!data.cancelled) {
        const a = async () => {
          setmytext("Uploading...");
          await new Promise((r) => setTimeout(r, 3000));
          setmytext("Uploaded!");
        };
        a();
        // console.log(data.assets.length);
        for (var i = 0; i < data.assets.length; i++) {
          let newfile = {
            uri: data.assets[i].uri,
            type: `test/${data.assets[i].uri.split(".")[1]}`,
            name: `test.${data.assets[i].uri.split(".")[1]}`,
          };
          handleUploads(newfile);
        }

        // console.log(newfile);
      }
    } else {
      Alert.alert(
        "Permissions Denied!",
        "Please Grant Gallery Permission from Settings to Continue!"
      );
      // setIsLoading(false);
      navigation.navigate("First");
    }
  };

  const handleUploads = async (image1) => {
    // setText2("Please Wait..")
    // setText3("Uploading...")
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "easypics");
    data.append("cloud_name", "dbzfjwhnw");

    fetch("https://api.cloudinary.com/v1_1/dbzfjwhnw/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // setPicture(data.assets[0].url)
        // setModal(false)
        // console.log("IMAGE URL IS"+ data.url);
        links = links + data.url + ",";
        // setiurl(data.url)
        // setText2("Submit")
        // setText3("Uploaded Sucessfully!" )
        // setIsButtonDisabled(false)
        console.log("Comma Seprated Links for all images: " + links);
      })
      .catch((err) => {
        Alert.alert("Cant Upload", "Sorry Cant Connect to Server!");

        // setText2("Submit")
        // setText3("Image Not Uploaded" )

        console.log("error while uploading " + err);
      });
    console.log("Comma Seprated Links for all images: " + links);
  };

  const handleVideoUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.error("Permission denied");
      return;
    }

    const video = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!video.cancelled) {
      setmytext2("Uploading...");
      const formData = new FormData();
      formData.append("file", {
        uri: video.uri,
        name: "video",
        type: "video/mp4",
      });
      console.log("SELECTED VIDEO: " + JSON.stringify(formData));
      try {
        const response = await axios.post(
          //dbzfjwhnw EASYFIT
          //videopreset
          //profilepic

          "https://api.cloudinary.com/v1_1/dbzfjwhnw/video/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              upload_preset: "videopreset",
            },
          }
        );
        setmytext2("Uploaded!");
        console.log(response.data.url); // Retrieve the uploaded video URL here
        videourl = response.data.url;
        console.log("video url:" + videourl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const pickImage = async () => {
    // setText3("PLEASE WAIT")
    //  if(galleryPermission == 'granted')
    //  {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!data.cancelled) {
      setmytext1("Uploading...");
      let newfile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`,
      };
      handleUpload(newfile);
    }
    //  }
    //  else{
    //   Alert.alert("Permissions Denied!","Please Grant Gallery Permission from Settings to Continue!");
    //   setIsLoading(false)
    //   navigation.navigate('First')
    //  }
  };

  const handleUpload = (image1) => {
    // setText2("Please Wait..")
    // setText3("Uploading...")
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "easypics");
    data.append("cloud_name", "dbzfjwhnw");

    fetch("https://api.cloudinary.com/v1_1/dbzfjwhnw/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // setPicture(data.assets[0].url)
        // setModal(false)
        console.log("IMAGE URL IS" + data.url);
        pic = data.url;
        console.log("profile pic: " + pic);
        setmytext1("Uploaded!");
        // setiurl(data.url)
        // setText2("Submit")
        // setText3("Uploaded Sucessfully!" )
        // setIsButtonDisabled(false)
      })
      .catch((err) => {
        Alert.alert("Cant Upload", "Sorry Cant Connect to Server!");

        // setText2("Submit")
        // setText3("Image Not Uploaded" )

        console.log("error while uploading " + err);
      });
  };
  const handleSubmit = () => {
    validateForm();
    if (err == 0) {
      const TsignupData = {
        name: s1name,
        email: s1email,
        gender: gen,
        password: s1pass,
        phone: s1phone,
        description: s1desc,
        video: videourl,
        profilepic: pic,
        pictures: links,
      };
      // navigation.navigate("TrainerSignin", { TsignupData });
      // console.log(TsignupData);
      axios
        .post("https://amused-handkerchief-seal.cyclic.app/addtrainerdetails", { TsignupData })
        .then((response) => {
          // console.log(response);
          Alert.alert("Trainer Signup Succesfull!");
          navigation.navigate("TrainerSignin", { TsignupData });
          console.log(TsignupData);
        })
        .catch((error) => {
          console.log(error);
        });
      const data = { email: TsignupData.email, password: TsignupData.password };

      //  ADDING LOGIN CREDENTIALS ON SIGN UP
      axios
        .post("https://amused-handkerchief-seal.cyclic.app/addtologin", { data })
        .then((response) => {
          // console.log(response);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(err);
    } else {
      Alert.alert("Fill in All the fields");
    }
  };
  const image = require("../assets/gallery.png");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.signup}>
          {/* <Text style={styles.title}> Sign Up</Text> */}

          <Image style={styles.image} source={image}></Image>
          <Text style={styles.desc}>
            You can upload upto 6 pictures and 1 video
          </Text>

          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <Image
              source={require("../assets/addpic.png")}
              style={styles.smimg}
            ></Image>
            <Text style={styles.uploadText}>{mytext1}</Text>
          </Pressable>

          <Pressable style={styles.uploadButton} onPress={pickImages}>
            <Image
              source={require("../assets/image.png")}
              style={styles.smimg}
            ></Image>
            <Text style={styles.uploadText}>{mytext}</Text>
          </Pressable>

          <Pressable style={styles.videoButton} onPress={handleVideoUpload}>
            <Image
              source={require("../assets/film.png")}
              style={styles.smimg}
            ></Image>
            <Text style={styles.uploadText}>{mytext2}</Text>
          </Pressable>
          <Text style={styles.vidtxt}>Only Videos upto 15mb are supported*</Text>

          <View style={styles.buttonDisplay}>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
  smimg: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  signup: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "black",
    marginVertical: 20,
  },
  desc: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "black",
    marginVertical: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "#E8EBE8",
    backgroundColor: "#E8EBE8",
    color: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 330,
    height: 45,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 2,
    width: 350,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 5,
    width: 250,
    // elevation: 3,
    backgroundColor: "transparent",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  videoButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 5,
    width: 250,
    // elevation: 3,
    backgroundColor: "transparent",
    marginBottom:5,
    // marginHorizontal: 20,
    marginTop: 30,
  },
 vidtxt:{
    fontSize:14,
    fontWeight:'bold',
    marginBottom:10,
  },
  uploadText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#000000",
  },

  buttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TrainerSignup2;
