import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    ScrollView

} from "react-native"
import Toast from "react-native-toast-message"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
//import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (

        <View style={styles.item}>
            <Text>{props.item.name}</Text>

            {/* <EasyButton
                primary
                mild
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>${props.item.price}</Text>
            </EasyButton> */}


            <EasyButton
                danger
                medium
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
            </EasyButton>
        </View>

    )
}

const Courses = (props) => {

    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState();
    const [coursePrice, setCoursePrice] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        // AsyncStorage.getItem("jwt")
        //     .then((res) => {
        //         setToken(res);
        //     })
        //     .catch((error) => console.log(error));

        axios
            .get(`${baseURL}courses`)
            .then((res) => setCourses(res.data))
            .catch((error) => alert("Error to load Modules"))

        return () => {
            setCourses();
            setToken();
        }
    }, [])

    const addCourse = () => {
        const course = {
            name: courseName,
            price: coursePrice
        };

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // };

        axios
            .post(`${baseURL}courses`, course /*, config*/)
            .then((res) => {
                setCourses([...courses, res.data])


                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Course successfully added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Courses");
                    }, 500)
                }


            })

        setCourseName("");
        setCoursePrice(0);
    }
    

    const deleteCourse = (id) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // };

        axios
            .delete(`${baseURL}courses/${id}`/*, config*/)
            .then((res) => {
                const newCourses = courses.filter((item) => item.id !== id);
                setCourses(newCourses);
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Course successfully deleted",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Courses");
                    }, 500)
                }

            })


    }

    return (
        <ScrollView>
            <View style={{ position: "relative", height: "100%" }}>
                <View style={{ marginBottom: 60 }}>
                    <FlatList
                        data={courses}
                        renderItem={({ item, index }) => (
                            <Item item={item} index={index} delete={deleteCourse} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={{ marginLeft: 10, marginTop: 30 }}>
                    <View>
                        <Text style={{ marginLeft: 10 }}>Add Course</Text>
                    </View>
                    <View style={{ width: width / 2.5 }}>
                        <TextInput

                            placeholder="Name"
                            value={courseName}
                            style={styles.item2}
                            onChangeText={(text) => {setCourseName(text)}}
                        />
                    </View>
                    <View style={{ width: width / 2.5 }}>
                        <TextInput

                            placeholder="Price"
                            value={coursePrice}
                            style={styles.item2}
                            onChangeText={(text) => setCoursePrice(text)}
                        />
                    </View>
                    <View>
                        <EasyButton
                            medium
                            secondary
                            onPress={() => addCourse()}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                        </EasyButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,

        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        alignItems: "center",
        padding: 10,

    },
    item: {
        width:width-100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    },

    item2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        width: width / 1.15
    }
})

export default Courses;