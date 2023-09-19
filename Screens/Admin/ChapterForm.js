import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../../Shared/Form/FormContainer"
import Input from "../../Shared/Form/Input"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseURL"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import mime from "mime";

const ChapterForm = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [videoUrl, setVideoUrl] = useState();
    const [YoutubeUrl, setYoutubeUrl] = useState();
    const [course, setCourse] = useState();
    const [courses, setCourses] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {

        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setYoutubeUrl(props.route.params.item.YoutubeUrl);

            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setVideoUrl(props.route.params.item.video);
            setImage(props.route.params.item.image);
            setCourse(props.route.params.item.course._id);

        }

        // AsyncStorage.getItem("jwt")
        //     .then((res) => {
        //         setToken(res)
        //     })
        //     .catch((error) => console.log(error))

        // Courses
        axios
            .get(`${baseURL}courses`)
            .then((res) => setCourses(res.data))
            .catch((error) => alert("Error to load courses"));

        // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })();

        return () => {
            setCourses([])
        }
    }, [])

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     });

    //     if (!result.canceled) {
    //         setMainImage(result.uri);

    //     }
    // };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {

            setVideoUrl(result.uri);
        }
    };

    const addChapter = () => {
        if (
            name == "" ||
            description == "" ||
            course == ""

        ) {
            setError("Please fill in the form correctly")
        }

        let formData = new FormData();

        // const newImageUri = "file:///" + image?.split("file:/").join("");

        const newVideoUri = "file://" + videoUrl?.split("file:/").join("");



        formData.append("video",
            {
                uri: newVideoUri,
                type: mime.getType(newVideoUri),
                name: newVideoUri?.split("/").pop()
            });
        formData.append("name", name),
            formData.append("image", image),
            formData.append("YoutubeUrl", YoutubeUrl),
            formData.append("description", description);
        formData.append("course", course);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                //Authorization: `Bearer ${token}`
            }
        }

        if (item !== null) {
            axios
                .put(`${baseURL}chapters/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Chapter successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Chapters");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        } else {
            axios
                .post(`${baseURL}chapters`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Chapter added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Chapters");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        }
    }

    return (
        <FormContainer title="Add Chapter" >
            {/* <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: mainImage}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View> */}
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: videoUrl }} />
                <TouchableOpacity onPress={pickVideo} style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>


            <View style={styles.label}>
                <Text style={{}}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <View style={styles.label}>
                <Text style={{}}>Thumbnail Image Url</Text>
            </View>
            <Input
                placeholder="Thumbnail Url"
                name="image"
                id="image"
                value={image}
                onChangeText={(text) => setImage(text)}
            />

            <View style={styles.label}>
                <Text style={{}}>YouTube Id</Text>
            </View>
            <Input
                placeholder="YouTube Id"
                name="YoutubeUrl"
                id="YoutubeUrl"
                value={YoutubeUrl}
                onChangeText={(text) => setYoutubeUrl(text)}
            />


            <View style={styles.label}>
                <Text style={{}}>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your Course"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCourse(e)]}
                >
                    {courses.map((c) => {
                        return <Picker.Item key={c.id} label={c.name} value={c._id} />
                    })}
                </Picker>
            </Item>
            {err ? <Error message={err} /> : null}
            <View style={styles.buttonContainer}>
                <EasyButton
                    large
                    primary
                    onPress={() => addChapter()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default ChapterForm;