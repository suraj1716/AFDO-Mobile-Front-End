import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"
import CourseForm from "../Screens/Admin/CourseForm"
import Course from "../Screens/Admin/Courses";
import ChapterForm from "../Screens/Admin/ChapterForm"
import Courses from "../Screens/Admin/Courses"
import Chapters from "../Screens/Admin/Chapters"
import LiveStreamForm from "../Screens/Admin/LiveStreamForm"
import LiveStreamList from "../Screens/Admin/LiveStreamList"
import LiveStreams from "../Screens/Admin/LiveStreams"
import UsersList from "../Screens/Admin/Users"
import Users from "../Screens/Admin/Users"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Chapters"
                component={Chapters}
                options={{
                    title: "Admin Control"
                }}
            />
            {/* <Stack.Screen name="Categories" component={Categories} options={{
                    headerShown: false,
                }} /> */}
            <Stack.Screen name="Orders" component={Orders} />

            {/* <Stack.Screen name="ProductForm" component={ProductForm} options={{
                    headerShown: false,
                }} /> */}

            <Stack.Screen name="Courses" component={Courses} options={{
                headerShown: true,
            }} />
            <Stack.Screen name="ChapterForm" component={ChapterForm} options={{
                headerShown: true,
            }} />

            <Stack.Screen name="LiveStreamForm" component={LiveStreamForm} options={{
                headerShown: false,
            }} />

<Stack.Screen name="LiveStreamList" component={LiveStreamList} options={{
                headerShown: false,
            }} />

<Stack.Screen name="LiveStreams" component={LiveStreams} options={{
                headerShown: true,
            }} />

<Stack.Screen name="UsersList" component={UsersList} options={{
                headerShown: true,
            }} />

<Stack.Screen name="Users" component={Users} options={{
                headerShown: true,
            }} />

        </Stack.Navigator>


    )
}
export default function AdminNavigator() {
    return <MyStack />
}