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
import { useRoute } from "@react-navigation/native";
import { Globalstyles } from "../styles/global";
import { BackHandler } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const Signup2 = ({ navigation }) => {

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

  const route = useRoute()
  const formdata = route.params?.formData
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

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    errors: {}
  });

  const [text,setText]=useState("Continue")


  const validateForm = () => {
    let errors = {};
  
    if (!formData.height) {
      errors.height = 'Height is required';
      err=err+1;
    } else if (formData.height<=0) {
      errors.height = 'Height must be greater than 0 ';
      err=err+1;
    }
  
    if (!formData.weight) {
      errors.weight = 'Weight is required';
      err=err+1;
    } 
    else if (formData.weight<=0) {
      errors.weight = 'Weight must be greater than 0 ';
      err=err+1;
    }

    
  
  
    setFormData({ ...formData, errors });
  };


  const handleSubmit = () => {
    validateForm();
    if (err == 0) {
      const signupData ={
        'name': s1name,
        'email': s1email,
        'gender': gen,
        'password': s1pass,
        'phone': s1phone,
        'height': formData.height,
        'weight':formData.weight
      }
      setText('loading...')
    navigation.navigate("Signup3",{signupData});
    console.log(signupData);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.signup}>
          <Text style={styles.title}>Select height & weight</Text>

        </View>
        <View style={styles.height}>
        <TextInput
                style={styles.input1}
                placeholder="Height"
                keyboardType="numeric"
                value={formData.height}
                onChangeText={(text) =>
                setFormData({ ...formData, height: text })}
              ></TextInput>
              <Text style={styles.text}>cm</Text>
        </View>
        {formData.errors.height && <Text style={Globalstyles.errortext}>{formData.errors.height}</Text>}
        <View style={styles.height}>
        <TextInput
                style={styles.input1}
                placeholder="Weight"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) =>
                setFormData({ ...formData, weight: text })}

              ></TextInput>
              <Text style={styles.text}>kg</Text>
        </View>
        {formData.errors.weight && <Text style={Globalstyles.errortext}>{formData.errors.weight}</Text>}
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
  height:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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
  text:{
    fontSize:20,
    fontWeight:'500',
    // marginHorizontal:5,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:15
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

export default Signup2;