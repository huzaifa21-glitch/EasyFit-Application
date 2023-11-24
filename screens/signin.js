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
} from "react-native";
import axios from "axios";
import { Globalstyles } from "../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = ({ navigation }) => {

  const [text1, setText] = useState("Sign in");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {}
  });

  var err = 0;
  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "email is required";
      err = err + 1;
      
      
    }

    if (!formData.password) {
      errors.password = "Password is required";
      err = err + 1;
      
    } 
    setFormData({ ...formData, errors });
  }
  const [hasErrors, setHasErrors] = useState(false);

  console.log(formData.email);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('dataKey', formData.email);
    } catch (error) {
      console.log('Error setting data in AsyncStorage:', error);
    }
  };
  
  const back = () =>{
    navigation.navigate('First');
  }

  const handleSubmit = () => {
    validateForm();
    setText("Please Wait");

    if (err == 0) {
      const data1 = {
        email: formData.email,
        password: formData.password,
      };
      // const data2 ={
      //   email: formData.email,
      // }
      // console.log(data2);
      setText("Signing In...");
      storeData();
     

      axios
      .post("https://amused-handkerchief-seal.cyclic.app/checkcredentials", { data1 })
      .then((response) => {
        if (response.data == "1") {
          setText("Sign In");
          navigation.navigate("Feed", {data1});
        } else {
          setText("Sign In");
          console.log("AUTHENTICATION FAIL SHOW ALERT ");
          alert(
            "Invalid Credentials !",
            "Please Enter Valid Email and Password"
          );
        }
      })
      .catch((error) => {
        setText("Sign In");
        alert("Network Error !", "Cant Connect To Server");

        console.log(error);
      });

    setHasErrors(false);
      
    }
    else {
      setHasErrors(true);
      setText("Sign in")
    }

  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Image style ={{height:25,width:25 ,marginHorizontal:20,marginVertical:35}} source={require('../assets/home2.png')}></Image>
      </Pressable>
      <View style={styles.signup}>
        <Text style={styles.title}>User Sign In</Text>

        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) =>
            setFormData({ ...formData, email: text })}
        ></TextInput>
        {formData.errors.email && <Text style={Globalstyles.errortext}>{formData.errors.email}</Text>}

        <TextInput
          style={styles.input1}
          placeholder="Password"
          value={formData.password}
          secureTextEntry={true}
          onChangeText={(text) =>
            setFormData({ ...formData, password: text })}
        ></TextInput>
 {formData.errors.password &&(<Text style={Globalstyles.errortext}>{formData.errors.password}</Text>)}
       
      </View>
         <View style={styles.buttonDisplay}>
            <Pressable
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>{text1}</Text>
            </Pressable>
          </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  signup: {
    // flex:0.5,
    marginTop:180,
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
    marginTop:30
  },
  buttonText:{
    fontSize: 22,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: '#FFF',
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Signin