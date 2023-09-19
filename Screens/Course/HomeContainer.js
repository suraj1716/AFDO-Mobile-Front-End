import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Button, View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions, Text, TextInput, SafeAreaView
} from "react-native";
import { Container, Header, Icon, Item, Input, Badge } from "native-base";
import CourseList from "./CourseList";
import FreeVideoList from "../FreeVideos/FreeVideoList";
import SearchedCourses from "./SearchedCourses";
import Banner from "../../Shared/Banner";
import CourseFilter from "./CourseFilter";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import { withTheme } from "styled-components";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import ChapterList from "./ChapterList";
import LiveStreamList from "./../LiveStream/LiveStreamList"


//   //Add comment when data is coming from axios URL  
// const data=require('../../assets/data/Courses.json');
// const Coursescourses=require('../../assets/data/courses');


var { height } = Dimensions.get('window');

const HomeContainer = (props) => {

  const [chapters, setChapters] = useState([]);
  const [chaptersFiltered, setChaptersFiltered] = useState([]);
  const [coursesFiltered, setCoursesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [courses, setcourses] = useState([]);
   const [chaptersCtg, setChaptersCtg] = useState([]);
  const [courseCtg, setCourseCtg] = useState([]);
  const [freeVideos, setfreeVideos] = useState([]);
  const [liveStreams, setliveStreams] = useState([]);

  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    React.useCallback(
      () => {

        setFocus(false);
        setActive(-1);


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

        // freeVideos
        axios
          .get(`${baseURL}freeVideos`)
          .then((res) => {
            setfreeVideos(res.data)
            setInitialState(res.data);
            setLoading(false)
          })
          .catch((error) => {
            console.log('Api call error')
          })


            // liveStreams
        axios
        .get(`${baseURL}liveStreams`)
        .then((res) => {
          setliveStreams(res.data)
          setInitialState(res.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Api call error')
        })


        return () => {
          setChapters([]);
          setChaptersFiltered([]);
          setFocus();
          setcourses([]);
          setfreeVideos([]);
          setliveStreams([]);
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
    setCoursesFiltered(
      courses.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };


  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };


  // Chapter
  const changeCtg = (ctg) => {
    {
      ctg === ""
        ? [setCourseCtg(initialState), setActive(true)]
        : [
          setCourseCtg(
            chapters.filter((i) => i.course?._id === ctg),
            setActive(true)
          ),
        ];
    }
  };





  return (

    <>
      {loading == false ? (

        <Container>
          <Header style={{backgroundColor:"#04acab"}}>
            <View style={styles.passwordContainer}>
             
              <Icon name="search-outline" style={styles.icon} />

              <TextInput
                placeholderTextColor={"#ffffff"}
                placeholder="Courses"
                style={styles.searchBox}
                onChangeText={(text) => searchCourse(text)}
                onFocus={openList}

              />

{focus == true ? (
                <Icon style={styles.icon2} onPress={onBlur} name="close" />
              ) : null}

            </View>

          </Header>

          {focus == true ? (

            <SearchedCourses
              navigation={props.navigation}
              coursesFiltered={coursesFiltered}

            />
          ) : (

            <ScrollView>
              <View >
                <View>
                  <Banner />
                </View>

                  <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, backgroundColor: "white" }}>Upcoming LiveStreams </Text>
                <ScrollView horizontal={true} style={{ flex: 1, flexWrap: "wrap" }}>
                  <View style={styles.listContainer}>
                    {liveStreams.map((item) => {
                      return (
                        <LiveStreamList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      )
                    })}


                  </View>
                </ScrollView>

                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, backgroundColor: "light-blue" }}>Free Videos</Text>
                <ScrollView horizontal={true} style={{ flex: 1, flexWrap: "wrap" }}>
                  <View style={styles.listContainer}>
                    {freeVideos.map((item) => {
                      return (
                        <FreeVideoList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      )
                    })}


                  </View>
                </ScrollView> */}

                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20 }}>Select Course</Text>


                <View >
                  <CourseFilter
                    courses={courses}
                    courseFilter={changeCtg}
                    chaptersCtg={chaptersCtg}
                    active={active}
                    setActive={setActive}


                  />

                </View>


                <Text style={{ fontSize: 15, padding: 10, marginLeft:10}}>List of Chapters</Text>

                {courseCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    <ScrollView bounces={true} horizontal={true} >
                      {courseCtg.map((item) => {
                        return (
                          <ChapterList
                            navigation={props.navigation}
                            key={item.name}
                            item={item}
                          />

                        )
                      })}
                    </ScrollView>
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No Chapters found</Text>
                  </View>
                )}


              </View>

            </ScrollView>
          )}

        </Container>
      ) : (

        //Loading
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size={"large"} color={"red"} />
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
    marginTop: 13,
    

  },
  icon2: {
    position: 'absolute',
    right: 10,
    marginTop: 13

  },


  searchBox:
  {

    paddingHorizontal: 150,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10


  },

  inputStyle: {
    flex: 1,
  },


  container: {
    marginTop: 20,
    backgroundColor: "gainsboro",
  },


  listContainer: {
    height: height/3.5,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    
  },


  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  

});


export default HomeContainer;