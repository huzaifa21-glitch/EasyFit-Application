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
import { Globalstyles } from "../styles/global";
import axios from 'axios';
import { SelectList } from "react-native-dropdown-select-list";

const Signup1 = ({ navigation }) => {
  var err=0;
  const [selected, setSelected] = React.useState("");
  const [error, setError] = useState('');
  const [text, setText] = useState('Continue');

  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Gender Nuetral" },
  ];
  const [genderInput, setGenderInput] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone:'',
    password:'',
    gender:'',
    errors: {}
  });

  const validateForm = () => {
    let errors = {};
  
    if (!formData.name) {
      errors.name = 'Name is required';
      err=err+1;
    } else if (formData.name.length<6) {
      errors.name = 'Name must be at least 6 characters';
      err=err+1;
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
      err=err+1;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid! It must have a special character.';
      err=err+1;
  }
    if (!genderInput) {
      setError('Please select an option');
    } else {
      setError('');
      // TODO: Submit form logic here
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      err=err+1;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      err = err + 1;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      err = err + 1;
    }
   
    setFormData({ ...formData, errors });
  };

  function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const handleSubmit = () => {
    validateForm();

    const data1={
      'email':formData.email,
    }
   
    if (err == 0) {
      setText('loading...')
      axios.post('https://amused-handkerchief-seal.cyclic.app/userSignupdemail', {data1} )
      .then(response => {
        if(response.data=='1')
     {
    alert("Email is Already Taken")
    console.log(response.data);
    setText('Continue');
         }
     else{
      formData.gender=genderInput;
      setTimeout(function() {
        console.log("Delayed message");
      }, 2000);
       navigation.navigate('Signup2',{formData});
       console.log(formData)
      //  console.log(err);
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
        <Text style={styles.title}> Sign Up</Text>

        <TextInput
          style={styles.input1}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) =>
          setFormData({ ...formData, name: text })}
        ></TextInput>
           {formData.errors.name && <View style={Globalstyles.error}><Text style={Globalstyles.errortext}>{formData.errors.name}</Text></View>}
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
          placeholder="Phone"
          keyboardType="numeric"
          value={formData.phone}
          onChangeText={(text) =>
          setFormData({ ...formData, phone: text })}
        ></TextInput>
  {formData.errors.phone && <Text style={Globalstyles.errortext}>{formData.errors.phone}</Text>}
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
      <SelectList
          setSelected={(genderInput) => setGenderInput(genderInput)} 
          data={data} 
          save="value"  
          boxStyles={[{ marginHorizontal: 42 }]}
          TextStyles={{ color: "black" }}
          dropdownStyles={[{ marginHorizontal: 42 }]}
          // dropdownTextStyles={{color:'#FFF'}}
          maxHeight={150}
          placeholder="Gender"
        />
         {error ? <Text style={Globalstyles.errortext}>{error}</Text> : null}
         <View style={styles.buttonDisplay}>
            <Pressable
              style={styles.submitButton}
              onPress={handleSubmit}
            >
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
    // alignItems: "center",
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

export default Signup1;