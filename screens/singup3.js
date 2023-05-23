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
  Switch,
} from "react-native";
import { Globalstyles } from "../styles/global";
import RadioButtonRN from "radio-buttons-react-native";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BackHandler } from "react-native";

const Signup3 = ({ navigation }) => {

  //  React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       return true;
  //     }
  //   );
  //   return () => backHandler.remove();
  // });

  // React.useEffect(() => {
  //   const handleBackPress = () => {
  //     // Handle the behavior when the back button is pressed
  //     // Return true to prevent the default back button behavior
  //     return true;
  //   };

  //   BackHandler.addEventListener("hardwareBackPress", handleBackPress);

  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  //   };
  // }, []);

  const route = useRoute()
  const formdata = route.params?.signupData
  var err=0;
 
  const newf = JSON.stringify(formdata);
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

  let key5 = "height";
  let s1height = jsonObject[key5];

  let key6 = "weight";
  let s1weight = jsonObject[key6];

  const [formData, setFormData] = useState({
    goal: '',
   
  });
  const [error, setError] = useState('');

  const data = [
    {
      label: "Lose Weight",
    },
    {
      label: "Keep fit",
    },
    {
        label: "Get Stronger",
      },
      {
        label: "Gain muscle mass",
      },
  ];
  const validateForm = () => {
    let errors = {};
  
    
    if (!formData.goal) {
      setError('Please select an option');
      err=err+1;
    } else {
      setError('');
      // TODO: Submit form logic here
    }
    

    
  
  
    setFormData({ ...formData, errors });
  };

  const [text, setText] =useState('Start Training')

  const handleSubmit = () => {
    validateForm();
    if (err == 0) {
      const signupData ={
        'name': s1name,
        'email': s1email,
        'gender': gen,
        'password': s1pass,
        'phone': s1phone,
        'height': s1height,
        'weight':s1weight,
        'goal':formData.goal,
      }
      const gg =JSON.stringify(signupData.goal)
      let jsonObject = JSON.parse(gg);
      
      let key = "label";
      let goal1 = jsonObject[key];

      const data2= { 
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
        gender: signupData.gender,
        height: signupData.height,
        weight: signupData.weight,
        goal:goal1,
       
    };
    const data1={
      email: signupData.email,
    }
  setText("Creating Profile..")


    axios.post('https://amused-handkerchief-seal.cyclic.app/userSignupdemail', {data1} )
    .then(response => {
if(response.data=='1')
{
  setText("Start Training")
  alert("Email is already Taken")
  console.log(response.data);
}
else{
console.log("ADDED");
axios.post('https://amused-handkerchief-seal.cyclic.app/adddetails', {data2} )
.then(response => {
    // console.log(response);
    navigation.navigate("Signin",{signupData});
    alert("Signup Successful!")
  console.log(signupData);
})
.catch(error => {
    console.log(error);
});


const data= { email: signupData.email,password: signupData.password };

  //  ADDING LOGIN CREDENTIALS ON SIGN UP
  axios.post('https://amused-handkerchief-seal.cyclic.app/addtologin', {data} )
  .then(response => {
      // console.log(response);
      console.log(data);
  })
  .catch(error => {
      console.log(error);
  });

}
        
    })
    .catch(error => {
        console.log(error);
    });















 

      
    }
   
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.signup}>
          <Text style={styles.title}>Choose main goal</Text>

          <RadioButtonRN activeColor='black'
          boxStyle={{width:330}} textStyle={{fontSize:18 , fontWeight:'600'}} data={data} selectedBtn={(e) =>   setFormData({ ...formData, goal: e })}
          
          />
           {error ? <Text style={Globalstyles.errortext}>{error}</Text> : null}
        </View>

        <View style={styles.buttonDisplay}>
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{text}</Text>
          </Pressable>
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
  height: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 2,
    width: 330,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    // marginHorizontal:5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  input1: {
    borderWidth: 1,
    borderColor: "#E8EBE8",
    backgroundColor: "#E8EBE8",
    color: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 280,
    height: 55,
    marginHorizontal: 20,
    marginBottom: 20,
    // textAlign:'center'
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

export default Signup3;