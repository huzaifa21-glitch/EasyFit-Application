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
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Globalstyles } from "../styles/global";
import ProgressCircle from "react-native-progress-circle";
import { ProgressBar, Colors } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
// import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native";
import Card from "../components/recentCard";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";

var fullWidth = Dimensions.get("window").width;
let globalusername = null;
let recentdata = [];

var totalProts;

var currentProts;
var totalCarbs;
var totalFats;

var achProts;
var achFats;
var achCarbs;

var totalWeeklyCalories2;
var achWeeklyCals2;

var totalMonthlyCalories2;
var achMonthlyCals2;

var totalCalories11;

const USRDASH2 = ({ navigation, route }) => {
  // React.useEffect(() => {
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

  let globaldata = [];
  let totaldata = [];
  let globaldata1 = [];
  let weeklydata = [];
  let monthlydata = [];

  const [email1, setEmail] = useState("");

  const [datax, setData] = useState({});
  const [datan, setDatan] = useState({});

  const [dataz, setDataz] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  var err = 0;
  const [prots, setProts] = useState(0.0);
  const [carbs, setCarbs] = useState(0.0);
  const [fats, setFats] = useState(0.0);
  const [achCalories, setAchCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const [achWeeklyCalories, setAchWeeklyCalories] = useState(0);
  const [totalWeeklyCalories, setTotalWeeklyCalories] = useState(0);

  const [achMonthlyCalories, setAchMonthlyCalories] = useState(0);
  const [totalMonthlyCalories, setTotalMonthlyCalories] = useState(0);

  const [dailyCalories, setDailyCalories] = useState(0);
  const [weeklyCalories, setWeeklyCalories] = useState(0);
  const [monthlyCalories, setMonthlyCalories] = useState(0);

  React.useEffect(() => {
    const getDataFromScreenA = async () => {
      try {
        const email = await AsyncStorage.getItem("dataKey1");
        console.log("store: " + email);
        globalusername = email;

        // Call the APIs concurrently using Promise.all
        const [
          dashNameResponse,
          recentMealsResponse,
          totalCaloriesResponse,
          dailyCaloriesResponse,
        ] = await Promise.all([
          axios.post(
            "https://amused-handkerchief-seal.cyclic.app/TdashName",
            { email },
            { maxContentLength: 1000000 }
          ),
          axios.post(
            "https://amused-handkerchief-seal.cyclic.app/recentmeals",
            { email },
            { maxContentLength: 1000000 }
          ),
          axios.post(
            "https://amused-handkerchief-seal.cyclic.app/getTotalCalories",
            { email },
            { maxContentLength: 1000000 }
          ),
          axios.post(
            "https://amused-handkerchief-seal.cyclic.app/dailyCalories",
            { email, formattedDate },
            { maxContentLength: 1000000 }
          ),
        ]);

        // Handle dashNameResponse
        if (dashNameResponse.data === "0") {
          setIsLoading(false);
          alert("Error!", "Try Again Later!");
          console.log("NO DATA FOUND name " + dashNameResponse.data);
        } else {
          globaldata1 = [...dashNameResponse.data];
          console.log("1" + globaldata);

          myd1 = { ...globaldata1[0] };
          setDataz({ ...globaldata1[0] });
        }

        // Handle recentMealsResponse
        if (recentMealsResponse.data === "0") {
          console.log("NO DATA FOUND recent " + recentMealsResponse.data);
        } else {
          recentdata = [...recentMealsResponse.data];
          recentdata.reverse();
          console.log(recentdata);
        }

        // Handle totalCaloriesResponse
        const { totalResult, weeklyResult, monthlyResult } =
          totalCaloriesResponse.data;
        if (totalResult.length === 0) {
          setIsLoading(false);
          console.log("NO DATA FOUND TOTAL " + totalResult);
        } else {
          const totalData = totalResult[0];
          myd = { ...totalData };
          totalCalories11 = totalData.totalcalories;
          setTotalCalories(totalCalories11);
          totalProts = totalData.totalproteins;
          totalFats = totalData.totalfats;
          totalCarbs = totalData.totalcarbs;
          console.log("carbs " + totalProts);
        }

        // Handle weeklyResult
        if (weeklyResult.length === 0) {
          setIsLoading(false);
          console.log("NO DATA FOUND WEEKLY " + weeklyResult);
        } else {
          const weeklyData = weeklyResult[0];
          totalWeeklyCalories2 = weeklyData.total_calories;
          achWeeklyCals2 = weeklyData.total_achieved_calories;
          const currentWeeklyCalories =
            (achWeeklyCals2 / totalWeeklyCalories2) * 100;
          console.log(currentWeeklyCalories);
          setWeeklyCalories(currentWeeklyCalories);
          setAchWeeklyCalories(achWeeklyCals2);
          setTotalWeeklyCalories(totalWeeklyCalories2);
        }

        // Handle monthlyResult
        if (monthlyResult.length === 0) {
          setIsLoading(false);
          console.log("NO DATA FOUND MONTHLY " + monthlyResult);
        } else {
          const monthlyData = monthlyResult[0];
          totalMonthlyCalories2 = monthlyData.total_calories;
          achMonthlyCals2 = monthlyData.total_achieved_calories;
          const currentMonthlyCalories =
            (achMonthlyCals2 / totalMonthlyCalories2) * 100;
          setMonthlyCalories(currentMonthlyCalories);
          setAchMonthlyCalories(achMonthlyCals2);
          setTotalMonthlyCalories(totalMonthlyCalories2);
        }

        // Handle dailyCaloriesResponse
        if (dailyCaloriesResponse.data === "0") {
          achProts = 0;
          achCarbs = 0;
          achFats = 0;
          setProts(0);
          setCarbs(0);
          setFats(0);
          setAchCalories(0);
          setDailyCalories(0);
          setIsLoading(false);
          console.log("NO DATA FOUND daily " + dailyCaloriesResponse.data);
        } else {
          globaldata = [...dailyCaloriesResponse.data];

          achProts = globaldata[0].achievedprots;
          const currentProts = achProts / totalProts;

          achCarbs = globaldata[0].achievedcarbs;
          const currentCarbs = achCarbs / totalCarbs;

          achFats = globaldata[0].achievedfats;
          const currentFats = achFats / totalFats;

          const achCalories1 = globaldata[0].achievedcal;
          const currentCalories = (achCalories1 / totalCalories11) * 100;
          console.log(totalCalories11);

          setProts(currentProts);
          setCarbs(currentCarbs);
          setFats(currentFats);
          setAchCalories(achCalories1);
          setDailyCalories(currentCalories);

          console.log("usetate1 month " + achMonthlyCals2);
          console.log("calories: " + achCalories1);
         
        }
      } 
      catch (error) {
        console.log("Error retrieving data from AsyncStorage:", error);
      }
      setIsLoading(false);
    };

    getDataFromScreenA();
  }, []);

  
  const [error, setError] = useState("");

  const [selected, setSelected] = React.useState("");

  const foodData = [
    {
      foodName: "Tandoori Chicken Karahi",
      calories: 270,
      proteins: 14.5,
      carbs: 10.2,
      fats: 24.7,
    },
    {
      foodName: "Chicken Biryani",
      calories: 274,
      proteins: 8.5,
      carbs: 24,
      fats: 9.5,
    },
    {
      foodName: "Cheese Omlette--2 Eggs, Shredded Cheese",
      calories: 254,
      proteins: 19,
      carbs: 2.4,
      fats: 19,
    },
    {
      foodName: "Homemade Brown- Whole Grains Roti - Roti",
      calories: 140,
      proteins: 2,
      carbs: 25,
      fats: 6,
    },
    {
      foodName: "Nestle - Milk Pak (Full Cream Milk)",
      calories: 155,
      proteins: 9,
      carbs: 13,
      fats: 6,
    },
    {
      foodName: "Eggs - Boiled Egg",
      calories: 280,
      proteins: 20,
      carbs: 4,
      fats: 24,
    },
    {
      foodName: "tesco - tikka chicken breast",
      calories: 340,
      proteins: 8,
      carbs: 5,
      fats: 62,
    },
    {
      foodName: "Omlette - Cheese Omlette--2 Eggs, Shredded Cheese",
      calories: 254,
      proteins: 19,
      carbs: 2,
      fats: 19,
    },
    {
      foodName: "Dawn - Bran bread",
      calories: 59,
      proteins: 0,
      carbs: 12,
      fats: 2,
    },
    {
      foodName: "Indian - Roti",
      calories: 60,
      proteins: 3,
      carbs: 17,
      fats: 3,
    },
    {
      foodName: "Zaanse Mayonaise - Mayonaise",
      calories: 56,
      proteins: 6,
      carbs: 0,
      fats: 0,
    },
    {
      foodName: "Home Made - Aloo Keema(Beef Mince With Diced Potato)",
      calories: 484,
      proteins: 9,
      carbs: 44,
      fats: 55,
    },
    {
      foodName: "Homemade - Keema Beef (Punjabi)",
      calories: 386,
      proteins: 20,
      carbs: 8,
      fats: 42,
    },
    {
      foodName: "Mango Shake Home Made - Mango Shake",
      calories: 218,
      proteins: 7,
      carbs: 13,
      fats: 29,
    },
    {
      foodName: "Kfc - Grilled Chicken Breast Piece",
      calories: 220,
      proteins: 7,
      carbs: 0,
      fats: 40,
    },
    {
      foodName: "Kfc - Fries, 0.5 Regular",
      calories: 154,
      proteins: 7,
      carbs: 21,
      fats: 2,
    },
    {
      foodName: "Banana, 2 medium",
      calories: 210,
      proteins: 0,
      carbs: 54,
      fats: 3,
    },
    {
      foodName: "Homemade - Raita",
      calories: 128,
      proteins: 4,
      carbs: 16,
      fats: 8,
    },
    {
      foodName: "Egg white, 2 large",
      calories: 34,
      proteins: 0,
      carbs: 0,
      fats: 7,
    },
    {
      foodName: "Heb Peanut Butter - Peanut Butter",
      calories: 200,
      proteins: 6,
      carbs: 15,
      fats: 7,
    },
    {
      foodName: "Stonefire - Tandoor Baked Naan",
      calories: 95,
      proteins: 3,
      carbs: 0,
      fats: 0,
    },
    {
      foodName: "Homemade - Keema Aloo",
      calories: 484,
      proteins: 16,
      carbs: 6,
      fats: 0,
    },
  ];

  const ingData = [
    {
      foodName: "Cornstarch",
      calories: 381,
      carbs: 91.27,
      proteins: 0.26,
      fats: 0.1,
    },
    {
      foodName: "Nuts, pecans",
      calories: 691,
      carbs: 13.86,
      proteins: 9.17,
      fats: 72,
    },
    {
      foodName: "Eggplant, raw",
      calories: 25,
      carbs: 5.88,
      proteins: 0.98,
      fats: 0.2,
    },
    {
      foodName: "Teff, uncooked",
      calories: 367,
      carbs: 73.13,
      proteins: 13.3,
      fats: 2.4,
    },
    {
      foodName: "Sherbet, orange",
      calories: 144,
      carbs: 30.4,
      proteins: 1.1,
      fats: 2,
    },
    {
      foodName: "Cauliflower, raw",
      calories: 25,
      carbs: 4.97,
      proteins: 1.92,
      fats: 0.3,
    },
    {
      foodName: "Taro leaves, raw",
      calories: 42,
      carbs: 6.7,
      proteins: 4.98,
      fats: 0.7,
    },
    {
      foodName: "Lamb, raw, ground",
      calories: 282,
      carbs: 0,
      proteins: 16.56,
      fats: 23,
    },
    {
      foodName: "Cheese, camembert",
      calories: 300,
      carbs: 0.46,
      proteins: 19.8,
      fats: 24,
    },
    {
      foodName: "Vegetarian fillets",
      calories: 290,
      carbs: 9,
      proteins: 23,
      fats: 18,
    },
    {
      foodName: "PACE, Picante Sauce",
      calories: 25,
      carbs: 6.25,
      proteins: 0,
      fats: 0,
    },
    {
      foodName: "Goji berries, dried",
      calories: 349,
      carbs: 77.06,
      proteins: 14.26,
      fats: 0.4,
    },
    {
      foodName: "Mango nectar, canned",
      calories: 51,
      carbs: 13.12,
      proteins: 0.11,
      fats: 0.1,
    },
    {
      foodName: "Crackers, rusk toast",
      calories: 407,
      carbs: 72.3,
      proteins: 13.5,
      fats: 7.2,
    },
    {
      foodName: "Chicken, boiled, feet",
      calories: 215,
      carbs: 0.2,
      proteins: 19.4,
      fats: 15,
    },
    {
      foodName: "Quail, raw, meat only",
      calories: 134,
      carbs: 0,
      proteins: 21.76,
      fats: 4.5,
    },
    {
      foodName: "Pie, lemon, fried pies",
      calories: 316,
      carbs: 42.6,
      proteins: 3,
      fats: 16,
    },
    {
      foodName: "Peppers, raw, jalapeno",
      calories: 29,
      carbs: 6.5,
      proteins: 0.91,
      fats: 0.4,
    },
    {
      foodName: "Winged bean tuber, raw",
      calories: 148,
      carbs: 28.1,
      proteins: 11.6,
      fats: 0.9,
    },
    {
      foodName: "Salami, turkey, cooked",
      calories: 172,
      carbs: 1.55,
      proteins: 19.2,
      fats: 9.2,
    },
    {
      foodName: "Grapes, raw, muscadine",
      calories: 57,
      carbs: 13.93,
      proteins: 0.81,
      fats: 9.2,
    },
    {
      foodName: "Nuts, raw, ginkgo nuts",
      calories: 182,
      carbs: 37.6,
      proteins: 4.32,
      fats: 9.2,
    },
    {
      foodName: "Spices, ground, savory",
      calories: 272,
      carbs: 68.73,
      proteins: 0,
      fats: 9.2,
    },
    {
      foodName: "Candies, sesame crunch",
      calories: 516,
      carbs: 50.3,
      proteins: 21.67,
      fats: 9.2,
    },
    {
      foodName: "Cheese, low fat, cream",
      calories: 201,
      carbs: 13.08,
      proteins: 0,
      fats: 9.2,
    },
    {
      foodName: "PACE, Green Taco Sauce",
      calories: 25,
      carbs: 74.67,
      proteins: 13.69,
      fats: 3,
    },
    {
      foodName: "Syrup, Canadian, maple",
      calories: 270,
      carbs: 4.3,
      proteins: 13.04,
      fats: 0.4,
    },
    {
      foodName: "Ostrich, raw, top loin",
      calories: 119,
      carbs: 70.54,
      proteins: 1.03,
      fats: 68,
    },
    {
      foodName: "Chewing gum, sugarless",
      calories: 268,
      carbs: 4.67,
      proteins: 7.05,
      fats: 1.5,
    },
    {
      foodName: "Nuts, dried, pine nuts",
      calories: 673,
      carbs: 28.56,
      proteins: 1.2,
      fats: 0,
    },
    {
      foodName: "Pasta, unenriched, dry",
      calories: 371,
      carbs: 16.23,
      proteins: 2.48,
      fats: 0,
    },
    {
      foodName: "McDONALD'S, Side Salad",
      calories: 20,
      carbs: 0,
      proteins: 0.52,
      fats: 3,
    },
    {
      foodName: "Cookies, Marie biscuit",
      calories: 406,
      carbs: 33.5,
      proteins: 23.08,
      fats: 0.4,
    },
    {
      foodName: "Broccoli, raw, chinese",
      calories: 30,
      carbs: 74.08,
      proteins: 6.2,
      fats: 0.6,
    },
    {
      foodName: "McDONALD'S, Hash Brown",
      calories: 271,
      carbs: 22.14,
      proteins: 4.08,
      fats: 11,
    },
    {
      foodName: "Agave, raw (Southwest)",
      calories: 68,
      carbs: 67.64,
      proteins: 0.52,
      fats: 9.2,
    },
    {
      foodName: "Pork, fresh, variety meats",
      calories: 250,
      carbs: 0,
      proteins: 15.9,
      fats: 9.2,
    },
    {
      foodName: "Cheese, mexican, blend",
      calories: 326,
      carbs: 3.72,
      proteins: 23.37,
      fats: 9.2,
    },
    {
      foodName: "Baking chocolate, unsweetened, squares",
      calories: 512,
      carbs: 53.99,
      proteins: 15.38,
      fats: 9.2,
    },
    {
      foodName:
        "Cereals ready-to-eat, KELLOGG'S FROSTED MINI-WHEATS, bite size",
      calories: 339,
      carbs: 83.02,
      proteins: 6.87,
      fats: 9.2,
    },
    {
      foodName: "McDONALD'S, Big Mac",
      calories: 330,
      carbs: 8.47,
      proteins: 12.22,
      fats: 9.2,
    },
    {
      foodName: "Nuts, pine nuts, dried",
      calories: 673,
      carbs: 13.08,
      proteins: 1.2,
      fats: 9.2,
    },
    {
      foodName: "Nuts, raw, pine nuts",
      calories: 673,
      carbs: 13.08,
      proteins: 1.2,
      fats: 9.2,
    },
    {
      foodName: "Bread, rye, toasted",
      calories: 238,
      carbs: 45.9,
      proteins: 7.5,
      fats: 0.7,
    },
    {
      foodName: "Nuts, raw, pistachio nuts",
      calories: 557,
      carbs: 1.65,
      proteins: 3.07,
      fats: 9.2,
    },
    {
      foodName: "Cocoa, dry powder, unsweetened",
      calories: 229,
      carbs: 57.9,
      proteins: 19.63,
      fats: 9.2,
    },
    {
      foodName: "Bread, rye",
      calories: 259,
      carbs: 38.95,
      proteins: 7.9,
      fats: 9.2,
    },
    {
      foodName: "Mango, raw, without refuse",
      calories: 60,
      carbs: 2.5,
      proteins: 9.8,
      fats: 0.7,
    },
    {
      foodName: "Cherries, sour, red, raw",
      calories: 50,
      carbs: 2.9,
      proteins: 2.7,
      fats: 9.2,
    },
    {
      foodName: "Turkey, drumstick, smoked",
      calories: 7,
      carbs: 0.09,
      proteins: 10.75,
      fats: 9.2,
    },
    {
      foodName: "Nuts, dried, chestnuts",
      calories: 395,
      carbs: 7.07,
      proteins: 2.42,
      fats: 9.2,
    },
    {
      foodName: "Pasta, cooked, enriched, without added salt",
      calories: 158,
      carbs: 31.6,
      proteins: 5.83,
      fats: 9.2,
    },
    {
      foodName: "Egg, yolk, raw, frozen, sugared",
      calories: 288,
      carbs: 0.53,
      proteins: 12.86,
      fats: 9.2,
    },
    {
      foodName: "Vegetables, mixed, canned, solids and liquids",
      calories: 26,
      carbs: 7.05,
      proteins: 1.26,
      fats: 9.2,
    },
    {
      foodName: "Fish, cod, Atlantic, dried and salted",
      calories: 290,
      carbs: 3.21,
      proteins: 62.82,
      fats: 9.2,
    },
    {
      foodName: "Nuts, raw, hazelnuts or filberts",
      calories: 628,
      carbs: 3.4,
      proteins: 3.12,
      fats: 9.2,
    },
    {
      foodName: "Nuts, raw, butternuts",
      calories: 612,
      carbs: 1.93,
      proteins: 2.71,
      fats: 9.2,
    },
    {
      foodName: "Sausage, turkey, skinless",
      calories: 142,
      carbs: 2.9,
      proteins: 16.12,
      fats: 9.2,
    },
    {
      foodName: "Rice, white, long-grain, precooked or instant, enriched",
      calories: 376,
      carbs: 79.95,
      proteins: 7.13,
      fats: 9.2,
    },
  ];
  const resData = [
    {
      foodName: "Chicken Karahi - Kolachi",
      calories: 350,
      carbs: 10.2,
      proteins: 25,
      fats: 17.6,
    },
    {
      foodName: "Chicken Malai Boti - Kolachi",
      calories: 150,
      carbs: 1,
      proteins: 9,
      fats: 16,
    },
    {
      foodName: "Chicken Tikka (Leg) - Kababjees",
      calories: 250,
      carbs: 1,
      proteins: 9,
      fats: 38,
    },
    {
      foodName: "Chicken Biryani - Al Rahman Biryani",
      calories: 373,
      carbs: 28,
      proteins: 14.5,
      fats: 32.5,
    },
    {
      foodName: "Beef Biryani - Al Rahman Biryani",
      calories: 383,
      carbs: 52.4,
      proteins: 7.5,
      fats: 25.4,
    },
    {
      foodName: "Katakat - Café Lazeez",
      calories: 300,
      carbs: 20,
      proteins: 30,
      fats: 15,
    },
    {
      foodName: "Margherita Pizza - Xanders",
      calories: 348,
      carbs: 42.6,
      proteins: 16.9,
      fats: 12.3,
    },
    {
      foodName: "Pasta Alfredo - Xanders",
      calories: 360,
      carbs: 39,
      proteins: 9,
      fats: 19,
    },
    {
      foodName: "Big Mac - Mcdonalds",
      calories: 530,
      carbs: 47,
      proteins: 24,
      fats: 27,
    },
    {
      foodName: "Quarter Pounder with Cheese - Mcdonalds",
      calories: 520,
      carbs: 41,
      proteins: 30,
      fats: 26,
    },
    {
      foodName: "Hot Fudge Sundae - Mcdonalds",
      calories: 330,
      carbs: 53,
      proteins: 8,
      fats: 9,
    },
    {
      foodName: "Small French Fries - Mcdonalds",
      calories: 230,
      carbs: 30,
      proteins: 2,
      fats: 11,
    },
    {
      foodName: "Medium French Fries - Mcdonalds",
      calories: 340,
      carbs: 44,
      proteins: 4,
      fats: 16,
    },
    {
      foodName: "Large French Fries - Mcdonalds",
      calories: 510,
      carbs: 67,
      proteins: 6,
      fats: 24,
    },
  ];

  const [selectedFood, setSelectedFood] = useState({
    foodName: "",
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  });

  const handleFoodChange = (food) => {
    setSelectedFood(food);
  };

  const handleFoodNameChange = (text) => {
    setSelectedFood((prevFood) => ({
      ...prevFood,
      foodName: text,
    }));
  };

  const handleCaloriesChange = (text) => {
    setSelectedFood((prevFood) => ({
      ...prevFood,
      calories: parseInt(text) || 0,
    }));
  };

  const handleProteinsChange = (text) => {
    setSelectedFood((prevFood) => ({
      ...prevFood,
      proteins: parseInt(text) || 0,
    }));
  };

  const handleCarbsChange = (text) => {
    setSelectedFood((prevFood) => ({
      ...prevFood,
      carbs: parseInt(text) || 0,
    }));
  };

  const handleFatsChange = (text) => {
    setSelectedFood((prevFood) => ({
      ...prevFood,
      fats: parseInt(text) || 0,
    }));
  };

  const [count, setCount] = useState(0);
  const [menuInput, setMenuInput] = useState(null);
  const [resInput, setResInput] = useState(null);
  const [ingredeientInput, setIngredeientInput] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [formData, setFormData] = useState({
    foodname: "",
    calories: "",
    carbs: "",
    proteins: "",
    fats: "",
    errors: {},
  });

  const [targetData, setTargetData] = useState({
    email: "",
    dailycals: "",
    weeklycals: "",
    monthlycals: "",
    dailycarbs: "",
    dailyprots: "",
    dailyfats: "",
  });

  const validateTargetForm = () => {
    let errors = {};

    if (!targetData.dailycals) {
      errors.name = " Food name is required";
      err = err + 1;
    }
    if (!targetData.dailycarbs) {
      err = err + 1;
    }
    if (!targetData.dailyfats) {
      err = err + 1;
    }
    if (!targetData.dailyprots) {
      err = err + 1;
    }

    setFormData({ ...formData, errors });
  };

  const currentDate = new Date();

  // Format the date as desired
  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  // console.log('date: '+formattedDate);
  // console.log('global email:' +globalusername);
  const pressHandler = () => {
    // console.log(globalusername);
    // validateInputFields();
    console.log("PRESSED");
    let totalCalories1 = selectedFood.calories + parseInt(achCalories);
    let totalProteins1 = selectedFood.proteins + parseInt(achProts);
    let totalCarbs1 = selectedFood.carbs + parseInt(achCarbs);
    let totalFats1 = selectedFood.fats + parseInt(achFats);

    let achweeklyy = parseInt(selectedFood.calories);
    let achmonthlyy = parseInt(selectedFood.calories);
    console.log(totalProteins1);
    // console.log(achmonthlyy);
    if (
      err === 0 &&
      totalMonthlyCalories > 0 &&
      totalCalories > 0 &&
      totalWeeklyCalories > 0
    ) {
      const data = {
        data1: {
          email: globalusername,
          date: formattedDate,
          achcals: totalCalories1,
          achprots: totalProteins1,
          achcarbs: totalCarbs1,
          achfats: totalFats1,
        },

        data2: {
          email: globalusername,
          date: formattedDate,
          totWcals: totalWeeklyCalories,
          achWcals: achweeklyy,
        },

        data3: {
          email: globalusername,
          date: formattedDate,
          totMcals: totalMonthlyCalories,
          achMcals: achmonthlyy,
        },
      };
      console.log(data);
      console.log(selectedFood);
      // console.log('achcals: '+achCalories);
      console.log("cals: " + achweeklyy);
      // console.log(data1);
      setCount(count + 1);

      axios
        .post("https://amused-handkerchief-seal.cyclic.app/addData2", data)
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible(false);
          Alert.alert("Calories Added");
        })

        .catch((error) => {
          Alert.alert(
            "Server Error"
            // "This is the alert message.",
          );
          console.log(error);
        });

      setCount(count + 1);

      const getDataFromScreenA = async () => {
        try {
          const email = await AsyncStorage.getItem("dataKey1");
          console.log("store: " + email);
          globalusername = email;
      
          // Fetching weekly calories
          const fetchWeeklyCalories = async () => {
            try {
              const response = await axios.post(
                "https://amused-handkerchief-seal.cyclic.app/weeklyCalories",
                { email },
                { maxContentLength: 1000000 }
              );
      
              if (response.data === "0") {
                console.log("NO DATA FOUND for weekly calories");
              } else {
                const [weeklyData] = response.data;
                const { total_calories, total_achieved_calories } = weeklyData;
                const currentWeeklyCalories = (total_achieved_calories / total_calories) * 100;
                setWeeklyCalories(currentWeeklyCalories);
                setAchWeeklyCalories(total_achieved_calories);
                setTotalWeeklyCalories(total_calories);
                console.log("Weekly calories fetched successfully");
              }
            } catch (error) {
              console.log("Error fetching weekly calories:", error);
            }
          };
      
          // Fetching monthly calories
          const fetchMonthlyCalories = async () => {
            try {
              const response = await axios.post(
                "https://amused-handkerchief-seal.cyclic.app/monthlyCalories",
                { email },
                { maxContentLength: 1000000 }
              );
      
              if (response.data === "0") {
                console.log("NO DATA FOUND for monthly calories");
              } else {
                const [monthlyData] = response.data;
                const { total_calories, total_achieved_calories } = monthlyData;
                const currentMonthlyCalories = (total_achieved_calories / total_calories) * 100;
                setMonthlyCalories(currentMonthlyCalories);
                setAchMonthlyCalories(total_achieved_calories);
                setTotalMonthlyCalories(total_calories);
                console.log("Monthly calories fetched successfully");
              }
            } catch (error) {
              console.log("Error fetching monthly calories:", error);
            }
          };
      
          // Fetching daily calories
          const fetchDailyCalories = async () => {
            try {
              const response = await axios.post(
                "https://amused-handkerchief-seal.cyclic.app/dailyCalories",
                { email, formattedDate },
                { maxContentLength: 1000000 }
              );
      
              if (response.data === "0") {
                console.log("NO DATA FOUND for daily calories");
              } else {
                const [dailyData] = response.data;
                const { achievedprots, achievedcarbs, achievedfats, achievedcal } = dailyData;
                const currentProts = achievedprots / totalProts;
                const currentCarbs = achievedcarbs / totalCarbs;
                const currentFats = achievedfats / totalFats;
                const currentCalories = (achievedcal / totalCalories11) * 100;
                setProts(currentProts);
                setCarbs(currentCarbs);
                setFats(currentFats);
                setAchCalories(achievedcal);
                setDailyCalories(currentCalories);
                console.log("Daily calories fetched successfully");
              }
            } catch (error) {
              console.log("Error fetching daily calories:", error);
            }
          };
      
          // Fetching data sequentially
          await Promise.all([fetchWeeklyCalories(), fetchMonthlyCalories(), fetchDailyCalories()]);
      
          setIsLoading(false);
        } catch (error) {
          console.log("Error retrieving data from AsyncStorage:", error);
        }
      };
      

      getDataFromScreenA();
    } else {
      alert("Set Your Targets First!");
    }

    //name req
  };
  const recentSubmit = () => {
    if (
      err === 0 &&
      totalMonthlyCalories > 0 &&
      totalCalories > 0 &&
      totalWeeklyCalories > 0
    ) {
      const data = {
        email: globalusername,
        foodname: selectedFood.foodName,
        calories: selectedFood.calories,
      };
      axios
        .post("https://amused-handkerchief-seal.cyclic.app/addrecentmeals", {
          data,
        })
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible1(false);
          Alert.alert("Calories Added");
          console.log("recent" + data);
        })
        .catch((error) => {
          Alert.alert("Server Error");
          console.log(error);
        });
    }
  };
  const logoutHandle = () => {
    navigation.navigate("First");
  };
  const handleSubmit = () => {
    validateTargetForm();
    if (err == 0) {
      let targetWeekCals = parseInt(targetData.dailycals) * 7;
      let targetMonthCals = parseInt(targetData.dailycals) * 30;

      // console.log(targetMonthCals);
      const data = {
        data2: {
          email: globalusername,
          totalcals: targetData.dailycals,
          totalprots: targetData.dailyprots,
          totalcarbs: targetData.dailycarbs,
          totalfats: targetData.dailyfats,
        },
        data1: {
          email: globalusername,
          targweeklycal: targetWeekCals,
          date: formattedDate,
          achCals: achWeeklyCalories,
        },
        data3: {
          email: globalusername,
          targetmonthlycal: targetMonthCals,
          date: formattedDate,
          achCals: achMonthlyCalories,
        },
      };

      console.log(data.data3);
      axios
        .post("https://amused-handkerchief-seal.cyclic.app/addData", data)
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible1(false);
          Alert.alert("Calorie Target Added!");
          console.log("daily");
        })
        .catch((error) => {
          Alert.alert("Server Error");
          console.log(error);
        });

      setCount(count + 1);

      const getDataFromScreenA = async () => {
        try {
          const email = await AsyncStorage.getItem("dataKey1");
          console.log("store: " + email);
          globalusername = email;
          console.log("submit handle email: " + email);
      
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://amused-handkerchief-seal.cyclic.app/getTotalCalories",
                { email },
                { maxContentLength: 1000000 }
              );
      
              const { totalResult, weeklyResult, monthlyResult, dailyResult } =
                response.data;
      
              // Total Calories
              if (totalResult && totalResult.length > 0) {
                const totalData = totalResult[0];
                myd = { ...totalData };
                totalCalories11 = totalData.totalcalories;
                setTotalCalories(totalCalories11);
                totalProts = totalData.totalproteins;
                totalFats = totalData.totalfats;
                totalCarbs = totalData.totalcarbs;
                console.log("carbs " + totalProts);
              }
      
              // Weekly Calories
              if (weeklyResult && weeklyResult.length > 0) {
                const weeklyData = weeklyResult[0];
                totalWeeklyCalories2 = weeklyData.total_calories;
                achWeeklyCals2 = weeklyData.total_achieved_calories;
                const currentWeeklyCalories =
                  (achWeeklyCals2 / totalWeeklyCalories2) * 100;
                console.log(currentWeeklyCalories);
                setWeeklyCalories(currentWeeklyCalories);
                setAchWeeklyCalories(achWeeklyCals2);
                setTotalWeeklyCalories(totalWeeklyCalories2);
              }
      
              // Monthly Calories
              if (monthlyResult && monthlyResult.length > 0) {
                const monthlyData = monthlyResult[0];
                totalMonthlyCalories2 = monthlyData.total_calories;
                achMonthlyCals2 = monthlyData.total_achieved_calories;
                const currentMonthlyCalories =
                  (achMonthlyCals2 / totalMonthlyCalories2) * 100;
                setMonthlyCalories(currentMonthlyCalories);
                setAchMonthlyCalories(achMonthlyCals2);
                setTotalMonthlyCalories(totalMonthlyCalories2);
              }
      
              // Daily Calories
              if (dailyResult && dailyResult.length > 0) {
                const dailyData = dailyResult[0];
                const achCalories1 = dailyData.achievedcal;
                const currentCalories1 = (achCalories1 / totalCalories11) * 100;
                setAchCalories(achCalories1);
                setDailyCalories(currentCalories1);
              }
      
              console.log("Data fetched successfully");
            } catch (error) {
              console.log("Error fetching data:", error);
              throw error;
            }
          };
      
          await fetchData();
          setIsLoading(false);
        } catch (error) {
          console.log("Error retrieving data from AsyncStorage:", error);
        }
      };
      
      

      getDataFromScreenA();
    } else {
      alert("Plese fill all fields");
    }
  };
  const [refresh, setRefresh] = useState(false);

  function handleRefresh() {
    setRefresh(true);
  }

  // clearAsyncStorage();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoading && !isNaN(prots) && !isNaN(carbs) && !isNaN(fats)) {
    return (
      <ScrollView style={{ backgroundColor: "#161416" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <View style={styles.welcome}>
              <Text style={styles.welcText}>Good Day, {dataz.name.toUpperCase()}</Text>
              <Pressable onPress={logoutHandle}>
                <Image
                  style={styles.logout}
                  source={require("../assets/logout.png")}
                ></Image>
              </Pressable>
            </View>

            <View style={styles.container1}>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={weeklyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>
                    {achWeeklyCalories + "/"}
                  </Text>
                  <Text style={styles.prog1Text}>{totalWeeklyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Weekly</Text>
              </View>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={parseInt(dailyCalories)}
                  radius={80}
                  borderWidth={15}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.progText}>{achCalories + "/"}</Text>
                  <Text style={styles.progText}>{totalCalories}</Text>
                  <Text style={styles.totText}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog3Text}>Today</Text>
              </View>
              <View style={styles.Circle1}>
                <ProgressCircle
                  percent={monthlyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>
                    {achMonthlyCalories + "/"}
                  </Text>
                  <Text style={styles.prog1Text}>{totalMonthlyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Monthly</Text>
              </View>
            </View>

            <View style={styles.leg}>
              <Text style={styles.legText}>{"Protein:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#5F9EA0" }]}
                progress={prots}
                color="#0047AB"
              />

              <Text style={styles.legText}>{"Carbs:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#F88379" }]}
                progress={carbs}
                color="#D2042D"
              />

              <Text style={styles.legText}>{"Fat:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#FFFF8F" }]}
                progress={fats}
                color="#FFEA00"
              />
            </View>
            {/* Set Cal Modal */}
            <Modal
              style={styles.modal}
              visible={modalVisible1}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible1(false);
              }}
            >
              <View style={styles.addCAL}>
                <Pressable
                  onPress={() => {
                    setModalVisible1(false);
                    // navigation.navigate('calorie')
                  }}
                >
                  <Image
                    source={require("../assets/close.png")}
                    style={styles.image}
                  ></Image>
                </Pressable>
                <Text style={styles.addcalText}>
                  Set Your Targeted Calories
                </Text>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Calories (g)
                </Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Calories (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailycals}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycals: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Proteins (g)
                </Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Proteins (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailyprots}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyprots: text })
                  }
                ></TextInput>

                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Carbs (g)
                </Text> */}

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Carbs (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailycarbs}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycarbs: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Fats (g)
                </Text> */}

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Fats (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailyfats}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyfats: text })
                  }
                ></TextInput>

                <View style={styles.buttonDisplay}>
                  <Pressable style={styles.modalButton} onPress={handleSubmit}>
                    <Text style={styles.modalbuttonText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* Meal modal */}
            <Modal
              style={styles.modal}
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <ScrollView>
                <View style={styles.addCAL}>
                  <Pressable
                    style={styles.close1}
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
                  <Text style={styles.addcalText}> Add Calories</Text>
                  <View style={styles.pickerstyle}>
                    <Picker
                      selectedValue={selectedFood}
                      onValueChange={handleFoodChange}
                      style={styles.picker}
                    >
                      <Picker.Item label="Add by Menu" value={null} />
                      {foodData.map((food, index) => (
                        <Picker.Item
                          key={index}
                          label={food.foodName}
                          value={food}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.pickerstyle}>
                    <Picker
                      selectedValue={selectedFood}
                      onValueChange={handleFoodChange}
                      style={styles.picker}
                    >
                      <Picker.Item label="Add by Ingredients" value={null} />
                      {ingData.map((food, index) => (
                        <Picker.Item
                          key={index}
                          label={food.foodName}
                          value={food}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.pickerstyle}>
                    <Picker
                      selectedValue={selectedFood}
                      onValueChange={handleFoodChange}
                      style={styles.picker}
                    >
                      <Picker.Item label="Add by restaurant" value={null} />
                      {resData.map((food, index) => (
                        <Picker.Item
                          key={index}
                          label={food.foodName}
                          value={food}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* {selectedFood && ( */}
                  <Text style={styles.addcalText}> Add calories Manually</Text>
                  <View>
                    <Text style={styles.txt}>Food Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter food name"
                      placeholderTextColor="#000"
                      value={selectedFood.foodName}
                      onChangeText={handleFoodNameChange}
                    ></TextInput>

                    <Text style={styles.txt}>Calories (grams)</Text>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Calories (g)"
                      placeholderTextColor="#000"
                      value={selectedFood.calories.toString()}
                      onChangeText={handleCaloriesChange}
                      keyboardType="numeric"
                    ></TextInput>
                    <Text style={styles.txt}>Carbs (grams)</Text>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Carbs (g)"
                      placeholderTextColor="#000"
                      value={selectedFood.carbs.toString()}
                      onChangeText={handleCarbsChange}
                      keyboardType="numeric"
                    ></TextInput>
                    <Text style={styles.txt}>Fats (grams)</Text>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Fats (g)"
                      placeholderTextColor="#000"
                      value={selectedFood.fats.toString()}
                      onChangeText={handleFatsChange}
                      keyboardType="numeric"
                    ></TextInput>
                    <Text style={styles.txt}>Proteins (grams)</Text>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Proteins (g)"
                      placeholderTextColor="#000"
                      value={selectedFood.proteins.toString()}
                      onChangeText={handleProteinsChange}
                      keyboardType="numeric"
                    ></TextInput>
                  </View>
                  {/* )} */}
                  <View style={styles.buttonDisplay}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={pressHandler}
                      onPressOut={recentSubmit}
                    >
                      <Text style={styles.modalbuttonText}>Update</Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </Modal>

            <View style={styles.recent}>
              <Text style={styles.reText}>Recent Meals</Text>

              {recentdata.slice(0, 4).map((item) => (
                <Card key={item.foodname} data={item} navigation={navigation} />
              ))}
            </View>
            <View style={styles.buttonDisplay}>
              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Add meal</Text>
              </Pressable>

              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible1(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Set Targets</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  } else {
    return(
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <Text style={{fontSize:20, alignSelf:'center'}}>Network Error, Signin Again!</Text> 
    </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161416",

    // justifyContent:'center',
  },
  logout: {
    height: 25,
    width: 25,
    marginTop: 40,
    marginRight: 15,
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
    marginTop: 20,
  },
  recent: {
    marginHorizontal: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 280,
    height: 45,
    marginHorizontal: 20,
    marginRight: 20,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 280,
    height: 45,
    marginHorizontal: 20,
    marginRight: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 13,
    borderRadius: 6,
    width: 280,
    height: 45,
    marginHorizontal: 20,
    marginRight: 20,
    marginVertical: 10,
  },
  addcalText: {
    marginVertical: 10,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  addcalText1: {
    marginVertical: 5,
    marginLeft: 20,
    fontSize: 12,
    fontWeight: "500",
  },
  reText: {
    marginVertical: 10,
    // marginLeft: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#d4dce4",
  },
  container1: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  Circle: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  Circle1: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: fullWidth,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161416",
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image1: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  close1: {
    marginTop: 5,
  },
  calText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 5,
  },
  calText1: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 2,
  },
  progText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog1Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog3Text: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  prog2Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },

  welcText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 40,
  },
  welcome: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totText: {
    fontSize: 24,
    color: "#707B7C",
    fontWeight: "600",
  },
  tot1Text: {
    fontSize: 14,
    color: "#707B7C",
    fontWeight: "600",
  },
  leg: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 20,
  },
  legText: {
    fontSize: 18,
    color: "#d4dce4",
    fontWeight: "400",
    paddingBottom: 5,
    paddingTop: 5,
  },
  bar: {
    width: 370,
    height: 10,
    borderWidth: 0.5,
    borderRadius: 100,
  },
  button: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    backgroundColor: "#083444",
    // marginBottom:5,
  },
  mealButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 150,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 120,
    marginHorizontal: 20,
  },
  button1: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // marginBottom:10,
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 300,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 20,
    marginHorizontal: 20,
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
    marginTop: 20,
    marginBottom: 20,
    // paddingBottom:20,
    // marginHorizontal: 20,
  },
  modalbuttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  txt: {
    fontSize: 16,
    marginLeft: 20,
  },
  pickerstyle: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    overflow: "hidden",
    width: 280,
    height: 45,
    marginHorizontal: 20,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
export default USRDASH2;
