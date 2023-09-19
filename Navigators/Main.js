import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";
import { TabBarItem } from "react-native-tab-view";
import setCurrentUser, { loginUser } from '../Context/actions/Auth.actions'
import Login from "../Screens/User/Login";
import UserContext, { UserProvider } from "../User-Context";
import AppContext from '../Context/AppContext'

const Tab = createBottomTabNavigator();

const Main = () => {

  // const context = useContext(AuthGlobal)
  const { email } = useContext(AppContext);


  return (



    <Tab.Navigator

      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: false,
        showLabel: true,
        activeTintColor: "#e91e63",
      }}

    >

      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              style={{ position: "relative" }}
              name="home"
              color={color}
              size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />

      {/* {context.stateUser.user.email == "cody@gmail.com" ? ( */}
      {email == "cody@gmail.com" ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : (
        null
      )}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />


    </Tab.Navigator>




  );
};

export default Main;