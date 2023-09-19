import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";


import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../Navigators/DrawerNavigator';


const Header = () => {
    return(
     
     
        <SafeAreaView style={styles.header}>

                <Image
                    source={require("../assets/favicon.png")}
                    resizeMode="contain"
                    style={{ height: 50, width: 100}} />
        
            </SafeAreaView>
           


       /* <>
            
            <StatusBar bg="#3700B3" barStyle="light-content" />
            <Box safeAreaTop bg="violet.600" />
            <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
                <HStack alignItems="center">
                    <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
                    <Text color="white" fontSize="20" fontWeight="bold">
                        Home
                    </Text>
                </HStack>
                <HStack>
                    <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
                </HStack>
            </HStack></>
*/



       
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        marginLeft:0
        
    }
})

export default Header;