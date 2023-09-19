import Main from './Main'
import { NavigationContainer } from '@react-navigation/native';

import { LogBox, View, Text, Button, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';


import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function NotificationsScreen(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} style={{ marginTop: 30, paddingBottom: 10 }} >
            <DrawerItemList {...props} />
            <DrawerItem label="Support Our Work" onPress={() => Linking.openURL('https://www.afdo.org.au/support-us/donate-now/')} />
            <DrawerItem label="About Us" onPress={() => Linking.openURL('https://www.afdo.org.au/about-us/what-we-do/')} />
            <DrawerItem label="Our Services" onPress={() => Linking.openURL('https://www.afdo.org.au/our-services/')} />
            <DrawerItem label="Contact Us" onPress={() => Linking.openURL('https://www.afdo.org.au/contact-us/')} />
           
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {

    return (
        <Drawer.Navigator styles={{marginTop:10}} 
        initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props}/>}
        screenOptions={{
            swipeEdgeWidth: 0,
          }} >
            <Drawer.Screen name="Menu" component={Main} options={{
                
                drawerActiveBackgroundColor: "#FFFFFF",
                
                drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/AFDO_logo.jpg')}
                        style={{ height: "230%", width: "80%" }}
                    />
                )
            }} />

        </Drawer.Navigator>


    );
};



const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


export default DrawerNavigator;