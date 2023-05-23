import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  focused,
  Pressable,
} from "react-native";
import First from "./screens/first";
import Second from "./screens/second";
import Feed from "./screens/feed";
import USRDASH from "./screens/userdashboard";
import Course from "./screens/course";
import Signup1 from "./screens/signup1";
import Signup2 from "./screens/signup2";
import Signup3 from "./screens/singup3";
import Signin from "./screens/signin";
import TrainerDash from "./screens/trainerDashboard";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
// import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { enableScreens } from "react-native-screens";
import TrainerSignup1 from "./screens/trainersignup1";
import TrainerSignin from "./screens/train_signin";
import train_dash from "./screens/train_dashboard";
import Train_dash from "./screens/train_dashboard";
import signSecond from "./screens/signSecond";
import SignSecond from "./screens/signSecond";
import TrainerSignup2 from "./screens/trainersignup2";
import { useState } from "react";
import Chatbox from "./screens/chat";
import USRDASH2 from "./screens/userdashboard2";
import Course2 from "./screens/course2";
import Feed2 from "./screens/feed2";
import Chatbox2 from "./screens/chat2";
export default function App() {
  enableScreens();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen
          name="First"
          component={First}
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Signup1"
          component={Signup1}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Signup2"
          component={Signup2}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Signup3"
          component={Signup3}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Feed"
          component={Tabs}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            gestureHandler: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="Train"
          component={Tabs2}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            gestureHandler: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }}
        />

        <Stack.Screen
          name="Course"
          component={Course}
          options={{
            headerShown: false,
            gestureHandler: true,
            gestureDirection: "horizontal",
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={TrainerDash}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Second"
          component={Second}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />

        <Stack.Screen
          name="SecSignin"
          component={SignSecond}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />

        <Stack.Screen
          name="TrainerSignup1"
          component={TrainerSignup1}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="TrainerSignup2"
          component={TrainerSignup2}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />

        <Stack.Screen
          name="TrainerSignin"
          component={TrainerSignin}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />

        <Stack.Screen
          name="Train_dash"
          component={Train_dash}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />

      <Stack.Screen
          name="Course2"
          component={Course2}
          options={{
            headerShown: false,
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = ({ navigation, route }) => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";
  const [isTabVisible, setisTabVisible] = useState(true);
  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: "flex" },
    });
  };

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="calorie"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
      inactiveColor="#3e2465"
      labeled={false}
      barStyle={{
        backgroundColor: "#FFF",
        position: "absolute",
        overflow: "hidden",
        // borderRadius: 15,
        // left: 10,
        // bottom: 10,
        // right: 10,
        height: 60,
        justifyContent: "center",
      }}
    >
      <Tab.Screen
        name="calorie"
        component={USRDASH}
        options1={{unmountOnBlur: true}}
        options={{
          gestureHandler: true,
          gestureDirection: "horizontal",
          animationEnabled: true,
          unmountOnBlur: true,

          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                // tintColor='#2d3436'
                source={require("./assets/home.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                  marginBottom: 80,
                }}
              ></Image>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          gestureHandler: true,
          gestureDirection: "horizontal",
          animationEnabled: true,
          unmountOnBlur: true, // Set unmountOnBlur to true
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/gym.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                }}
              ></Image>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chatbox2}
        tabBarVisible={false}
        options1={{unmountOnBlur: true}}
        options={({ route }) => ({
         
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/chat.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                }}
              ></Image>
            </View>
          ),
        })}
      />

      {/* <Tab.Screen
        name="First"
        component={First}
        options={({ route }) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Pressable onPress={hideTabBar}>
              <Image
                source={require("./assets/logout.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                }}
              ></Image>
              </Pressable>
            </View>
          ),
        })}
      /> */}
    </Tab.Navigator>
    // </NavigationContainer>
  );
};
export function showBottomNavigation(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Feed";

  switch (routeName) {
    case "First":
      return false;
    default:
      return true;
  }
}

const Tabs2 = ({ navigation, route }) => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="calorie"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
      inactiveColor="#3e2465"
      labeled={false}
      barStyle={{
        backgroundColor: "#F4F6F6",
        borderTopColor: "#28282B#000000",
        // bordeSrWidth: 1,
        position: "absolute",
        overflow: "hidden",
        // borderRadius: 15,
        // left: 10,
        // bottom: 10,
        // right: 10,
        height: 60,
        justifyContent: "center",
      }}
    >
      <Tab.Screen
        name="calorie"
        component={USRDASH2}
        // options1={{unmountOnBlur: true}}
        options={{
          gestureHandler: true,
          gestureDirection: "horizontal",
          animationEnabled: true,
          unmountOnBlur: true,

          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                // tintColor='#2d3436'
                source={require("./assets/home.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                  marginBottom: 80,
                }}
              ></Image>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Feed2"
        component={Feed2}
        // options1={{unmountOnBlur: true}}
        options={{
          gestureHandler: true,
          gestureDirection: "horizontal",
          animationEnabled: true,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/gym.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                }}
              ></Image>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Trainer"
        component={train_dash}
        // options1={{unmountOnBlur: true}}
        options={{
          gestureHandler: true,
          gestureDirection: "horizontal",
          animationEnabled: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/user.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#36454F" : "#808080",
                }}
              ></Image>
            </View>
          ),
        }}
      />

<Tab.Screen
  name="Chat"
  component={Chatbox}
  // options1={{unmountOnBlur: true}}
  tabBarVisible={false} // Set tabBarVisible to false
  options={({ route }) => ({
    tabBarStyle: { display: "none" },
    tabBarIcon: ({ focused }) => (
      <View>
        <Image
          source={require("./assets/chat.png")}
          resizeMode="contain"
          style={{
            width: focused ? 30 : 25,
            height: focused ? 30 : 25,
            tintColor: focused ? "#36454F" : "#808080",
          }}
        ></Image>
      </View>
    ),
  })}
/>

    </Tab.Navigator>
    // </NavigationContainer>
  );
};
