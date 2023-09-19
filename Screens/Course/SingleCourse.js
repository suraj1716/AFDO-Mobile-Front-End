import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Left, Right, Container, H1, Badge } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
//import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';

import baseURL from '../../assets/common/baseURL';
import axios from "axios";

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import CourseContent from './CourseContent';
import CourseFilter from './CourseFilter';
import ChapterList from './ChapterList';
import CourseList from './CourseList';
import ChapterFilter from './ChapterFilter'
import { Video, ResizeMode } from 'expo-av';


var { height } = Dimensions.get('window');
const SingleCourse = (props) => {

  const [item, setItem] = useState(props.route.params.item);
  const [course, setCourse] = useState(props.route.params.item);
  const [chapters, setChapters] = useState([]);
  const [chaptersFiltered, setChaptersFiltered] = useState([]);
  const [coursesFiltered, setCoursesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [courses, setcourses] = useState([]);
  // const [chapterCtg, setCourseCtg] = useState([]);
  const [courseCtg, setCourseCtg] = useState([]);
  const [freeVideos, setfreeVideos] = useState([]);

  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [loading, setLoading] = useState(true);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useFocusEffect(
    React.useCallback(
      () => {

        setFocus(false);
        setActive(-1);


        // Chapters
        axios
          .get(`${baseURL}courses`)
          .then((res) => {

            setcourses(res.data);
            setChaptersFiltered(res.data);
            setChapters(res.data);
            setInitialState(res.data);
            setLoading(false)


          })
          .catch((error) => {
            console.log('Api call error')
          })


        // Courses
        axios
          .get(`${baseURL}chapters`)
          .then((res) => {
            setChapters(res.data)
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


  // Chapter
  const changeCtg = (ctg) => {
    {
      ctg === "all"
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
    <Container >

<ScrollView>
      <View style={{ padding: 20, paddingTop: 20 }}>

        <TouchableOpacity onPress={() =>
          props.navigation.navigate("Home", { course: course })
        }>

          <Ionicons name="arrow-back-circle" style={styles.backIcon} size={50} color="black" />

        </TouchableOpacity>

        <View>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold', marginTop: 0
          }}>{course.name}</Text>
          <Text style={{ color: Colors.gray }}>By AFDO</Text>
          <Video
        ref={video}
        style={{height:150,marginTop:10,borderRadius:10}}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
          <Text style={{
            marginTop: 10,
            fontSize: 16, fontWeight: 'bold'
          }}>About Course</Text>
          <Text numberOfLines={4}
            style={{ color: Colors.gray }}>{course.description}</Text>
{/* 
          <View >

            <CourseContent
              courses={courses}
              courseContent={changeCtg}
              courseCtg={courseCtg}
              active={active}
              setActive={setActive}


            />

          </View> */}
{/* 
          <Text style={{ fontSize: 15, padding: 20 }}>List of Chapters</Text>

          {courseCtg.length > 0 ? ( 
            <View style={styles.listContainer}>
              <ScrollView bounces={true} horizontal={true} style={{ flex: 1, flexWrap: "wrap" }}>
                {courseCtg.map((item) => {
                  return (
                    <CourseList
                      navigation={props.navigation}
                      key={item.id}
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
          )}    */}

        </View>

      </View>
      </ScrollView>




      {/* <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}> ${course.price} </Text>
        </Left>
        <Right>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(course.id),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${course.name} added to Cart`,
                  text2: "Go to your cart to complete order"
                })
            }}
          >
            <Text style={{ color: 'white' }}>Add</Text>
          </EasyButton>
        </Right>
      </View> */}
    </Container>
  )

}

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (courses) =>
      dispatch(actions.addToCart({ quantity: 1, courses }))
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%'
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0
  },
  image: {
    width: '100%',
    height: 250
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20
  },

  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },

  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white'
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red'
  },
  backIcon: {
    position: 'absolute',
    right: 20,
    marginTop: -20,
    marginBottom: 20

  }

})

export default connect(null, mapToDispatchToProps)(SingleCourse);

























// import React, { useState, useEffect } from 'react'
// import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
// import { Left, Right, Container, H1 } from 'native-base';
// import Toast from 'react-native-toast-message';
// import EasyButton from '../../Shared/StyledComponents/EasyButton'
// //import TrafficLight from '../../Shared/StyledComponents/TrafficLight'

// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions';

// const SingleCourse = (props) => {

//     const [item, setItem] = useState(props.route.params.item);
//     // const [availability, setAvailability] = useState(null);
//     // const [availabilityText, setAvailabilityText] = useState("")

//     // useEffect(() => {
//     //     if (props.route.params.item.countInStock == 0) {
//     //         setAvailability(<TrafficLight unavailable></TrafficLight>);
//     //         setAvailabilityText("Unvailable")
//     //     } else if (props.route.params.item.countInStock <= 5) {
//     //         setAvailability(<TrafficLight limited></TrafficLight>);
//     //         setAvailabilityText("Limited Stock")
//     //     } else {
//     //         setAvailability(<TrafficLight available></TrafficLight>);
//     //         setAvailabilityText("Available")
//     //     }

//     //     return () => {
//     //         setAvailability(null);
//     //         setAvailabilityText("");
//     //     }
//     // }, [])

//     return (
//         <Container style={styles.container}>
//             <ScrollView style={{ marginBottom: 80, padding: 5 }}>
//                 <View>
//                     <Image
//                         source={{
//                             uri: item.image ? item.image
//                             : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
//                         }}
//                         resizeMode="contain"
//                         style={styles.image}
//                     />
//                 </View>
//                 <View style={styles.contentContainer}>
//                     <H1 style={styles.contentHeader}>{item.name}</H1>
//                     <Text style={styles.contentText}>{item.brand}</Text>
//                 </View>
//                 <View style={styles.availabilityContainer}>
//                     <View style={styles.availability}>
//                         <Text style={{ marginRight: 10 }}>
//                             {/* Availability: {availabilityText} */}
//                         </Text>
//                         {/* {availability} */}
//                     </View>
//                     <Text>{item.description}</Text>
//                 </View>
//             </ScrollView>

//             <View style={styles.bottomContainer}>
//                 <Left>
//                     <Text style={styles.price}> ${item.price} </Text>
//                 </Left>
//                 <Right>
//                    <EasyButton
//                    primary
//                    medium
//                    onPress={() => {props.addItemToCart(item.id),
//                         Toast.show({
//                             topOffset: 60,
//                             type: "success",
//                             text1: `${item.name} added to Cart`,
//                             text2: "Go to your cart to complete order"
//                         })
//                 }}
//                    >
//                        <Text style={{ color: 'white'}}>Add</Text>
//                    </EasyButton>
//                 </Right>
//             </View>
//         </Container>
//     )

// }

// const mapToDispatchToProps = (dispatch) => {
//     return {
//         addItemToCart: (courses) =>
//             dispatch(actions.addToCart({quantity: 1, courses}))
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         height: '100%'
//     },
//     imageContainer: {
//         backgroundColor: 'white',
//         padding: 0,
//         margin: 0
//     },
//     image: {
//         width: '100%',
//         height: 250
//     },
//     contentContainer: {
//         marginTop: 20,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     contentHeader: {
//         fontWeight: 'bold',
//         marginBottom: 20
//     },
//     contentText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20
//     },
//     bottomContainer: {
//         flexDirection: 'row',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         backgroundColor: 'white'
//     },
//     price: {
//         fontSize: 24,
//         margin: 20,
//         color: 'red'
//     },
//     availabilityContainer: {
//         marginBottom: 20,
//         alignItems: "center"
//     },
//     availability: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     }
// })

// export default connect(null, mapToDispatchToProps)(SingleCourse);