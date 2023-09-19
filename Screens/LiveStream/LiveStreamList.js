import React from "react";
import {
        TouchableOpacity, View, Dimensions, FlatList,
        StyleSheet,
} from "react-native";
import LiveStreamCard from "./LiveStreamCard";


var { width } = Dimensions.get("window");

const LiveStreamList = (props) => {
        const{name, price, image,}=props;
        const { item } = props;

        return (
                    <TouchableOpacity 
                    style={{ width:220, marginTop:-50 }}
                    onPress={() => 
                        props.navigation.navigate("LiveStream Detail", { item: item})
                    }
                    >
                    
                        <LiveStreamCard {...item} />
                       
                    </TouchableOpacity>
                )
}



export default LiveStreamList;