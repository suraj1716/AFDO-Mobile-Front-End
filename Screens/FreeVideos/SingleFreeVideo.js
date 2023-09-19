import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, Linking } from 'react-native';
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

const SingleFreeVideo = (props) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [playing, setPlaying] = useState(false);

    const [item, setItem] = useState(props.route.params.item);
    const [course, setCourse] = useState(props.route.params.item)
    const [freeVideo, setfreeVideo] = useState(props.route.params.item)

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);


    return (
        <Container style={styles.container}>


            <View style={{ padding: 20, paddingTop: 20 }}>

                <TouchableOpacity style={{ paddingBottom: 30 }} onPress={() =>
                    props.navigation.navigate("Home", { freeVideo: freeVideo })
                }>
                    <Ionicons name="arrow-back-circle" style={styles.backIcon} size={50} color="black" />
                </TouchableOpacity>

                <View >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>{freeVideo.name}</Text>
                    <Text style={{ color: Colors.gray, marginBottom:20 }}>By AFDO</Text>


                    <YoutubePlayer
                        height={200}
                        play={playing}
                        videoId={item.video}
                        onChangeState={onStateChange}
                    />

                    {/* <Video source={{
                        uri: item.video ? item.video
                            : 'https://www.transport.nsw.gov.au/sites/default/files/styles/content_mobile_1x/public/media/images/2022/community-scene-supporting-people-with-disability.png?itok=tMipE9hs'
                    }}  style={{ height: 150, marginTop: 10, borderRadius: 10 }} /> */}

                    {/* <Video
                    ref={video}
                    style={{ height: 200, marginTop: 10, borderRadius: 30 }}
                    source={{
                    //   uri: Linking.openURL(freeVideo.video)'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    auto
                  /> */}



                    <Text style={{
                        marginTop: 10,
                        fontSize: 16, fontWeight: 'bold'
                    }}>About Video</Text>
                    <Text numberOfLines={4}
                        style={{ color: Colors.gray }}>{freeVideo.description}</Text>


                    {/* <CourseContent course={course} /> */}

                </View>

            </View>




        </Container>
    )

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (freeVideos) =>
            dispatch(actions.addToCart({ quantity: 1, freeVideos }))
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
    
      }

})

export default connect(null, mapToDispatchToProps)(SingleFreeVideo);


















