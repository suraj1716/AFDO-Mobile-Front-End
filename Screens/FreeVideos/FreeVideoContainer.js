import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button, View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions, Text, TextInput, SafeAreaView
} from "react-native";
import { Container, Header, Icon, Item, Input } from "native-base";
import FreeVideoList from "./FreeVideoList";
import SearchedFreeVideo from "./SearchedFreeVideos";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import { withTheme } from "styled-components";

//   //Add comment when data is coming from axios URL  
// const data=require('../../assets/data/freeVideos.json');
// const FreeVideoscategories=require('../../assets/data/categories');


var { height } = Dimensions.get('window');

const FreeVideoContainer = (props) => {

  const [freeVideos, setFreeVideos] = useState([]);
  const [freeVideosFiltered, setFreeVideosFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [freeVideosCtg, setFreeVideosCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [loading, setLoading] = useState(true);
 

  useFocusEffect(
    React.useCallback(
       () => {
        
      
       
        // FreeVideos
        axios
          .get(`${baseURL}freeVideos`)
          .then((res) => {
           
            setFreeVideos(res.data);
            setFreeVideosFiltered(res.data);
            setFreeVideosCtg(res.data);
            setInitialState(res.data);
            setLoading(false)


          })
          .catch((error) => {
            console.log('Api call error')
          })


        return () => {
          setFreeVideos([]);
          setFreeVideosFiltered([]);
          setFocus();
        
          setActive();
          setInitialState();

        };

      },
      [],
    
  )
  )



  //   //Add comment when data is coming from axios URL  
  // useFocusEffect(()=>{

  //     setFreeVideos(data);
  //     setFreeVideosFiltered(data);
  //     setFreeVideosCtg(data);
  //     setInitialState(data);
  //     setcategories(data)
  //     setFocus(false);
  //     setActive(-1);

  //   return()=>{
  //       setFreeVideos([]);
  //       setFreeVideosFiltered([]);
  //       setFocus();
  //       setcategories([]);
  //       setActive();
  //       setInitialState();

  //   }

  //   }, [])









    // FreeVideo Methods
  const searchFreeVideo = (text) => {
    setFreeVideosFiltered(
      freeVideos.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };


  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };


 // Categories
 const changeCtg = (ctg) => {
  {
    ctg === "all"
      ? [setFreeVideosCtg(initialState), setActive(true)]
      : [
          setFreeVideosCtg(
            freeVideos.filter((i) => i.category?._id === ctg),
            setActive(true)
          ),
        ];
  }
};





  return (

    <>
    {loading==false ? (

<Container>
      <Header>
        <View style={styles.passwordContainer}>
         <Icon name="search-outline" style={styles.icon} />
          <TextInput
          placeholderTextColor={"#ffffff"}
            placeholder="Search"
            style={styles.searchBox}
            onChangeText={(text) => searchFreeVideo(text)}
            onFocus={openList}

          />


          {focus == true ? (
            <Icon onPress={onBlur} name="close" />
          ) : null}

        </View>

      </Header>

      {focus == true ? (
        <SearchedFreeVideo
        navigation={props.navigation}
          freeVideosFiltered={freeVideosFiltered}

        />
      ) : (

        <ScrollView>
          <View >
            <View>
              <Banner />
            </View>

<ScrollView horizontal>
            {freeVideosCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {freeVideosCtg.map((item) => {
                  return (
                    <FreeVideoList
                      navigation={props.navigation}
                      key={item.name}
                      item={item}
                    />
                  )
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No freeVideos found</Text>
              </View>
            )}
            </ScrollView>

          </View>

        </ScrollView>
      )}

        </Container>
      ) : (

      //Loading
        <Container style={[styles.center, {backgroundColor:"#f2f2f2"}]}>
            <ActivityIndicator size={"large"} color={"red"}/>
        </Container>


      )} 



    </>

  );


};


  


const styles = StyleSheet.create({

  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },

  icon: {
    position: 'absolute',
    left: 10,
    marginTop:13
    
  },


  searchBox:
{
    
    paddingHorizontal:150,
    paddingVertical:10,
    borderColor:"#ccc",
    borderWidth:1,
    borderRadius:8,
    marginTop:10
    
    
},

inputStyle: {
  flex: 1,
},


  container: {
   marginTop:20,
    backgroundColor: "gainsboro",
  },  


  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },

  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
  
});


export default FreeVideoContainer;