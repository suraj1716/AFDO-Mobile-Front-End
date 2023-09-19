import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import ProductContainer from "../Screens/Products/ProductContainer";
// import CourseContainer from "../Screens/Course/CourseContainer";
import HomeContainer from "../Screens/Course/HomeContainer";
import SingleCourse from "../Screens/Course/SingleCourse"
import SingleFreeVideo from "../Screens/FreeVideos/SingleFreeVideo";
import SingleChapter from '../Screens/Course/SingleChapter';
import SingleLiveStream from "../Screens/LiveStream/SingleLiveStream"

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen 
                name='Home'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            /> */}

            <Stack.Screen
                name='Home'
                component={HomeContainer}
                options={{
                    headerShown: false,
                }}
            />


            <Stack.Screen
                name='Chapter Detail'
                component={SingleChapter}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='Course Detail'
                component={SingleCourse}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='FreeVideo Detail'
                component={SingleFreeVideo}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='LiveStream Detail'
                component={SingleLiveStream}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}