// import Main from './Navigators/Main'
import { NavigationContainer } from '@react-navigation/native';


//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Screens
import Header from "./Shared/Header";
import { LogBox, View, Text, Button, Image, StyleSheet } from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

//Context API 
import Auth from './Context/store/Auth';

import DrawerNavigator from './Navigators/DrawerNavigator';
import { UserProvider } from './User-Context';
import { AppProvider } from './Context/AppContext';




LogBox.ignoreAllLogs();



export default function App() {
  return (
    
    // <Auth>
      <Provider store={store}>
      <AppProvider>
        <>
          <NavigationContainer>
       {/*   <Login/> */}
       {/* <Header/>  */}
                <DrawerNavigator/>
            

            {/* <Main /> */}
            <Toast ref={(ref) => Toast.setRef(ref)} /> 

          </NavigationContainer>

        </>

        </AppProvider>

      </Provider>

      // </Auth>


  );
}

const styles = StyleSheet.create({
  icon: {
      width: 24,
      height: 24,
  },
});
