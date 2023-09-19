import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import { useContext } from "react";
import AppContext from '../Context/AppContext'


const Stack = createStackNavigator();


function MyStack() {

    const { email } = useContext(AppContext);
    return (

        <Stack.Navigator>


            {email == "cody@gmail.com" ? (

                <Stack.Screen
                    name="UserProfile"
                    component={UserProfile}
                    options={{
                        headerShown: false

                    }}

                />
            ) : (

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />

            )}







            {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown:false

            }}
            
            /> */}

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false

                }}

            />

            {/* <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
                headerShown:false

            }}
            
            /> */}

        </Stack.Navigator>

    )

}


export default function UserNavigator() {

    return <MyStack />

}