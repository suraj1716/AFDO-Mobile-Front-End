import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import CourseCard from "./CourseCard";

var {width}=Dimensions.get("window");

const CourseList=(props)=>{

        const {item}= props;

        return(

                <TouchableOpacity style={{width: '1%' }}
                onPress={() => 
                    props.navigation.navigate("Course Detail", { item: item})
                }
                >
                   
                        <View style={{width:width, backgroundColor:'grainsboro'}}>
                                <CourseCard {...item}/> 
                        </View>
                        
                </TouchableOpacity>


        )
}



export default CourseList;