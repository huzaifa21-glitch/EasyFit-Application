import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { Globalstyles } from "../styles/global";
import axios from 'axios';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const win = Dimensions.get("window");
const ratio = win.width / 541;
let globaldata =[]
var globalusername;

const Course2 = ({ navigation }) => {
  var err=0;
  const handleSubmit = () => {
    navigation.navigate("Second");
  };
 
  const [modalVisible, setModalVisible] = useState(false);

  
  const route = useRoute()
  const formdata = route.params.data1.coursename
  // console.log('course name:'+formdata);

  // const data3={
  //   coursename:formdata
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [datax, setData] = useState(
    {
  
    }
  );

  React.useEffect(() => {  

    const getDataFromScreenA = async () => {
      try {
        const email = await AsyncStorage.getItem("dataKey");
        console.log("store: " + email);
        globalusername = email;
        setIsLoading(false);
      } catch (error) {
        console.log("Error retrieving data from AsyncStorage:", error);
      }
    };

    getDataFromScreenA();
    
    axios.post('https://amused-handkerchief-seal.cyclic.app/displaycourse',{formdata},{maxContentLength: 1000000})
    .then(response => {
   
  // console.log("TOP");
  // console.log(response.data[0].description);
  // console.log("low");
  // console.log('new resp'+JSON.stringify(response.data));

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

  const [formData, setFormData] = useState({
    cardNum: "",
    date: "",
    cvc: "",
    errors: {},
  });

  const validateForm = () => {
    let errors = {};

    if (!formData.cardNum) {
      errors.name = " Card number is required";
      err = err + 1;
    }else if(formData.cardNum.length < 13 || formData.cardNum.length > 19){
      errors.name = " Enter Valid Card number";
      err = err + 1;
    }
    if (!formData.date) {
      errors.name = " Card number is required";
      err = err + 1;
    }
    else if(formData.date.length < 4 ){
      errors.name = " Enter Valid Card number";
      err = err + 1;
    }
    if (!formData.cvc) {
      errors.name = " Card number is required";
      err = err + 1;
    }else if(formData.cvc.length < 3){
      errors.name = " Enter Valid Card number";
      err = err + 1;
    }
   

    setFormData({ ...formData, errors });
  };

  function addchat (sender,receiver)
  {
    // validateForm();
    if(err==0){
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
  
  
    
    console.log("OK");
      const newmessage={sendert: sender , receivert: receiver,timet: dt, messaget: "Hey i want assistance!"}
      axios
      .post(
        "https://amused-handkerchief-seal.cyclic.app/newmessage",{newmessage}
      )
      .then((response) => {
        if (response.data == "0") {
          alert("Error!", "Can't Inititate the chat!");
          console.log("NO DATA FOUND " + response.data);
        }
       else{
          alert("Chat Initiated Please procceed to Chatbox")
       }
      })
      .catch((error) => {
       
        alert("Network Error"+error);
      //   setIsLoading(false);
      });
}
  }

const submitHandle = () =>{
  validateForm();
  const data= { email:globalusername ,
    trainerid: datax.trainerid };
    console.log(data);

  if(err==0){
    axios.post('https://amused-handkerchief-seal.cyclic.app/addtopremium', {data} )
    .then(response => {
        // console.log(response);
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
    Alert.alert("Course Succesfully Purchased");

    
   

  }
  else{
    console.log(formData.cardNum.length);
    Alert.alert("Enter valid details");
  }
}
const image = {
  uri: datax.pics
};

if (isLoading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

if (!isLoading) {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Modal
            style={styles.modal}
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.addCAL}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  // navigation.navigate('calorie')
                }}
              >
                <Image
                  source={require("../assets/close.png")}
                  style={styles.image1}
                ></Image>
              </Pressable>

              <TextInput
                style={styles.input1}
                placeholder="Enter Card Number"
                keyboardType="numeric"
                value={formData.cardNum}
                onChangeText={(text) =>
                  setFormData({ ...formData, cardNum: text })
                }
              ></TextInput>
              {formData.errors.cardNum && (
                <Text style={Globalstyles.errortext}>
                  {formData.errors.cardNum}
                </Text>
               )} 
              <View style={styles.payment}> 
                <TextInput
                  style={styles.input2}
                  placeholder="Valid Till (MM/YY)"
                  keyboardType="numeric"
                  value={formData.date}
                  onChangeText={(text) =>
                    setFormData({ ...formData, date: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input3}
                  placeholder="CVC"
                  keyboardType="numeric"
                  value={formData.cvc}
                  onChangeText={(text) =>
                    setFormData({ ...formData, cvc: text })
                  }
                ></TextInput>
               
              </View>
              {formData.errors.cardNum && (
                <Text style={Globalstyles.errortext}>
                  {formData.errors.cardNum}
                </Text>
               )} 
              <View style={styles.buttonDisplay}>
                <Pressable style={styles.modalButton} onPress={submitHandle}>
                  <Text style={styles.modalbuttonText}>Pay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <ImageBackground
            source={image}
            resizeMode="contain"
            borderRadius={2}
            overflow="hidden"
            blurRadius={2}
            style={styles.image}
          >
            <Text style={styles.titleText}>{datax.coursetitle}</Text>
            <Text style={styles.instText}>With {datax.trainername}</Text>
          </ImageBackground>
        </View>
        <View style={styles.display}>
          <Image
            source={require("../assets/timer.png")}
            style={styles.tinyImg}
          ></Image>
          <Text style={styles.displayText}> {datax.duration} hours</Text>
        </View>
        <View style={styles.display2}>
          <Image
            source={require("../assets/stretching.png")}
            style={styles.tinyImg}
          ></Image>
          <Text style={styles.displayText}> {datax.type}</Text>
        </View>
        <View style={styles.display2}>
          <Image
            source={require("../assets/dumbbell.png")}
            style={styles.tinyImg}
          ></Image>
          <Text style={styles.displayText}> {datax.weights} kilograms</Text>
        </View>
        <View style={styles.display2}>
          <Image
            source={require("../assets/price.png")}
            style={styles.tinyImg}
          ></Image>
          <Text style={styles.displayText}> PKR {datax.fee}/-</Text>
        </View>
        <View style={styles.display3}>
          <Text style={styles.descText}>
            {datax.description}
          </Text>

          {/* <Pressable
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={Globalstyles.buttonText}>Get Started</Text>
          </Pressable> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161416",
  },
  dropShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  display: {
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 30,
    flex: 1,
    backgroundColor: "#161416",
    flexDirection: "row",
    alignItems: "center",
  },
  display2: {
    marginBottom: 20,
    marginLeft: 30,
    flex: 1,
    backgroundColor: "#161416",
    flexDirection: "row",
    alignItems: "center",
  },
  display3: {
    marginBottom: 20,

    flex: 1,
    backgroundColor: "#161416",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  payment:{
  flexDirection:'row',
  marginHorizontal:10  
  },
  input1: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 330,
    height: 45,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input2: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 200,
    height: 45,
    marginHorizontal: 10,
    marginBottom: 20,

  },
  input3: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 100,
    height: 45,
    // marginHorizontal: 20,
    marginBottom: 40,
  },
  image: {
    height: 362 * ratio,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
  },
  image1: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tinyImg: {
    height: 20,
    width: 20,
  },
  titleText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 24,
    letterSpacing: 1,
    fontFamily: "sans-serif",
    position: "absolute",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight:20,
  },
  instText: {
    color: "#ddd",
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: "sans-serif",
    position: "absolute",
    paddingBottom: 10,
    paddingLeft: 20,
  },
  displayText: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "300",
  },
  descText: {
    color: "#ddd",
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: "300",
    // marginBottom: 20,
    marginTop: 20,
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 350,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "#161416",
    borderWidth: 2,
    width: 150,
    elevation: 3,
    backgroundColor: "#161416",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  modalbuttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  modal: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#E8EBE8",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },

  addCAL: {
    // marginTop: 20,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },
});
export default Course2;
