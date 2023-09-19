import React from "react";
import { TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import FreeVideoCard from "./FreeVideoCard";

var {width}=Dimensions.get("window");

const FreeVideoList=(props)=>{

        const {item}= props;

        return(

                     
        
        <TouchableOpacity style={{width: '21%' }}
                onPress={() => 
                    props.navigation.navigate("FreeVideo Detail", { item: item})
                }
                >
                        
                  
                        <View style={{width:width, backgroundColor:'grainsboro'}}>
                                <FreeVideoCard {...item}/>
                        </View>
                        
                </TouchableOpacity>
             


        )
}



export default FreeVideoList;

