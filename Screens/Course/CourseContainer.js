import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button, View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions, Text, TextInput, SafeAreaView
} from "react-native";
import { Container, Header, Icon, Item, Input } from "native-base";
import CourseList from "./CourseList";
import SearchedCourses from "./SearchedCourses";
import Banner from "../../Shared/Banner";
import CourseFilter from "./CourseFilter";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import { withTheme } from "styled-components";

//   //Add comment when data is coming from axios URL  
// const data=require('../../assets/data/Courses.json');
// const Coursescourses=require('../../assets/data/courses');


var { height } = Dimensions.get('window');

const CourseContainer = (props) => {

  const [chapters, setChapters] = useState([]);
  const [ChaptersFiltered, setChaptersFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [courses, setcourses] = useState([]);
  const [chaptersCtg, setChaptersCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [loading, setLoading] = useState(true);
 

  useFocusEffect(
    React.useCallback(
       () => {
        
        // setFocus(false);
        // setActive(-1);


       const url= `${baseURL}chapters`
       console.log(url,"url")
       
        // Chapters
        axios
          .get(`${baseURL}chapters`)
          .then((res) => {
            
            setChapters(res.data);
            setChaptersFiltered(res.data);
            setChaptersCtg(res.data);
            setInitialState(res.data);
            setLoading(false)


          })
          .catch((error) => {
            console.log('Api call error')
          })


        // Courses
        axios
          .get(`${baseURL}courses`)
          .then((res) => {
            setcourses(res.data)
          })
          .catch((error) => {
            console.log('Api call error')
          })


        return () => {
          setChapters([]);
          setChaptersFiltered([]);
          setFocus();
          setcourses([]);
          setActive();
          setInitialState();

        };

      },
      [],
    // )
  )
  )




    // Chapter Methods
  const searchCourse = (text) => {
    setChaptersFiltered(
      chapters.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
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
      ? [setChaptersCtg(initialState), setActive(true)]
      : [
        setChaptersCtg(
            chapters.filter((i) => i.course?._id === ctg),
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
            onChangeText={(text) => searchCourse(text)}
            onFocus={openList}

          />


          {focus == true ? (
            <Icon onPress={onBlur} name="close" />
          ) : null}

        </View>

      </Header>

      {focus == true ? (
        <SearchedCourses
        navigation={props.navigation}
          chaptersFiltered={ChaptersFiltered}

        />
      ) : (

        <ScrollView>
          <View >
            <View>
              <Banner />
            </View>

            <View>
              <CourseFilter
                courses={courses}
                courseFilter={changeCtg}
                chaptersCtg={chaptersCtg}
                active={active}
                setActive={setActive}

              />

            </View>


            {chaptersCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {chaptersCtg.map((item) => {
                  return (
                    <CourseList
                      navigation={props.navigation}
                      key={item.name}
                      item={item}
                    />
                  )
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No Courses found</Text>
              </View>
            )}

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


export default CourseContainer;