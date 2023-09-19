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

const LiveStreamForm = (props) => {
    
    const [pickerValue, setPickerValue] = useState();
    
    const [name, setName] = useState();
   
    const [description, setDescription] = useState();
    const [streamUrl, setStreamUrl] = useState();
    const [passcode, setPassCode] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
 
    const [imageUrl, setImageUrl] = useState();
    const [course, setCourse] = useState();
    const [courses, setCourses] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();

    const [item, setItem] = useState(null);

    useEffect(() => {

        if(!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
         
            setName(props.route.params.item.name);
  
            setDescription(props.route.params.item.description);
         
            setImageUrl(props.route.params.item.image);
            
            setStreamUrl(props.route.params.item.streamUrl);
            setPassCode(props.route.params.item.passcode);
            setDate(props.route.params.item.date);
            setTime(props.route.params.item.time);
        
           
        }

        // AsyncStorage.getItem("jwt")
        //     .then((res) => {
        //         setToken(res)
        //     })
        //     .catch((error) => console.log(error))

   

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

       
    }, [])



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
          
            setImageUrl(result.uri);
        }
    };

    const addLiveStream = () => {
        if (
            name == "" ||
            description == "" ||
            streamUrl==""||
            passcode==""||
            date==""||
            time==""
            
           
        ) {
            setError("Please fill in the form correctly")
       

        }

        let formData = new FormData();

        // const newImageUri = "file:///" + image?.split("file:/").join("");
        
        const newImageUri= "file://" + imageUrl?.split("file:/").join("");

       

        formData.append("image", 
        {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri?.split("/").pop()
        });
        formData.append("name", name),
        formData.append("description", description);
        formData.append("streamUrl", streamUrl)
        formData.append("passcode", passcode)
        formData.append("date", date)
        formData.append("time", time)
      

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                //Authorization: `Bearer ${token}`
            }
        }

        if(item !== null) {
            axios
            .put(`${baseURL}liveStreams/${item.id}`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "LiveStream successfuly updated",
                        text2: ""
                    }); 
                    setTimeout(() => {
                        props.navigation.navigate("LiveStreams");
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
            .post(`${baseURL}liveStreams`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New LiveStream added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("LiveStreams");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Please fill form correctly",
                        text2: "Please try again"
                })
            })
        } 
    }

    return (
       <FormContainer title="Add LiveStream">
           {/* <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: mainImage}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View> */}
           <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: imageUrl}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
          
           
           <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Name</Text>
           </View>
           <Input 
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
            
           
           
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Description</Text>
           </View>
           <Input 
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}
           />

<View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Passcode</Text>
           </View>
           <Input 
            placeholder="Passcode"
            name="passcode"
            id="passcode"
            value={passcode}
            onChangeText={(text) => setPassCode(text)}
           />

<View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>streamUrl</Text>
           </View>
           <Input 
            placeholder="StreamUrl"
            name="streamUrl"
            id="streamUrl"
            value={streamUrl}
            onChangeText={(text) => setStreamUrl(text)}
           />

<View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Date</Text>
           </View>
           <Input 
            placeholder="Date"
            name="date"
            id="date"
            value={date}
            onChangeText={(text) => setDate(text)}
           />
           

           <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Time</Text>
           </View>
           <Input 
            placeholder="Time"
            name="time"
            id="time"
            value={time}
            onChangeText={(text) => setTime(text)}
           />
           
           
           {err ? <Error message={err} /> : null}
           <View style={styles.buttonContainer}>
               <EasyButton
                large
                primary
                onPress={() => addLiveStream()}               
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

export default LiveStreamForm;