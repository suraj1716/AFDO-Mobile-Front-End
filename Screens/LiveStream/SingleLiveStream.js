import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
//import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import CourseContent from '../../MobileApp/Components/CourseContent';
import { Video, ResizeMode } from 'expo-av';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useCallback } from 'react';


const width=Dimensions.get("window");

const SingleLiveStream = (props) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [playing, setPlaying] = useState(false);

    const [item, setItem] = useState(props.route.params.item);
    const [course, setCourse] = useState(props.route.params.item)
    const [liveStream, setliveStream] = useState(props.route.params.item)

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);


    return (
        <Container style={styles.container}>

<ScrollView >
            <View style={{ padding: 20, paddingTop: 20 }}>

                <TouchableOpacity style={{ paddingBottom: 30 }} onPress={() =>
                    props.navigation.navigate("Home", { liveStream: liveStream })
                }>
                    <Ionicons name="arrow-back-circle" style={styles.backIcon} size={50} color="#04acab" />
                </TouchableOpacity>



             
                    <Text style={{

                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>{liveStream.name}</Text>
                    <Text style={{ color: Colors.gray, marginBottom: 20 }}>By AFDO</Text>

                    <Button color={"#04acab"} title='Join' onPress={() => { Linking.openURL(liveStream.streamUrl) }} />


                    <Image style={styles.image}
                        resizeMode="fit"

                        source={{ uri: liveStream.image ? liveStream.image : "https://www.unison.org.uk/content/uploads/2021/11/panel-debate-745x420.jpeg" }}
                    />




                    {/* 

                    <Video
                        ref={video}
                        style={{ height: 200, marginTop: 10, borderRadius: 30 }}
                        source={{
                            uri: Linking.openURL(liveStream.streamUrl),

                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        auto
                    /> */}

                    <View style={[styles.midcontainer, {backgroundColor:"#f1f1f1", width:width}]}>

                        <View style={styles.square}>
                            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}> Passcode    |</Text>
                            <Text style={{ color: Colors.grey }}>  {liveStream.passcode}               </Text>
                        </View>

                        <View style={styles.square}>
                            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }} >Date             |</Text>
                            <Text style={{ color: Colors.gray }}>{liveStream.date}    </Text>
                        </View>

                        <View style={styles.square}>
                            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}> Time </Text>
                            <Text style={{ color: Colors.gray }}>  {liveStream.time}  </Text>
                        </View>

                    </View>

                    <Text style={{
                        marginTop: 10,
                        fontSize: 16, fontWeight: 'bold'
                    }}>About LiveStream</Text>

                    <Text numberOfLines={4}
                        style={{ color: Colors.gray }}>{liveStream.description}</Text>


                    {/* <CourseContent course={course} /> */}

             

            </View>

            </ScrollView>

        </Container>
    )

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (liveStreams) =>
            dispatch(actions.addToCart({ quantity: 1, liveStreams }))
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
        height: 220,
        resizeMode: 'cover',
        marginTop: 5
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

    videoView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoStyle: {
        alignSelf: 'center',
        height: '80%',
        resizeMode: 'contain'
    },

    backIcon: {
        position: 'absolute',
        right: 20,
        marginTop: -20,
        marginBottom: 20

    },

    midcontainer: {
        marginTop:10,
        marginBottom:10,
        marginLeft:0,
        flex: 1,
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "row",
        // backgroundColor:"black",
        // borderRadius:20,
        
        
    },
    square: {
        opacity:20,
        width: 120,
        height: 70,
     paddingLeft:25
        
      },

})

export default connect(null, mapToDispatchToProps)(SingleLiveStream);


















