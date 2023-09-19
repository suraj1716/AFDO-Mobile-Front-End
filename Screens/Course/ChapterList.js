import React from "react";
import {
        TouchableOpacity, View, Dimensions, FlatList,
        StyleSheet,
} from "react-native";
import ChapterCard from "./ChapterCard";


var { width } = Dimensions.get("window");

const ChapterList = (props) => {
        const{name, price, image,}=props;
        const { item } = props;

        return (
                    <TouchableOpacity 
                    style={{ width:210, marginTop:-50 }}
                    onPress={() => 
                        props.navigation.navigate("Chapter Detail", { item: item})
                    }
                    >
                    
                        <ChapterCard {...item} />
                       
                    </TouchableOpacity>
                )
}



export default ChapterList;