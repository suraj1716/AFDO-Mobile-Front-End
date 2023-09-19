import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
//import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';

import baseURL from '../../assets/common/baseURL';
import axios from "axios";

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import CourseContent from '../../MobileApp/Components/CourseContent';
import CourseFilter from './CourseFilter';
import ChapterList from './ChapterList';
import { Video, ResizeMode } from 'expo-av';
import YoutubePlayer from 'react-native-youtube-iframe';

import { SocialIcon } from 'react-native-elements'
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import { ScrollableComponent } from 'react-native-keyboard-aware-scroll-view';

var { height } = Dimensions.get('window');

const SingleChapter = (props) => {

    const [chapter, setChapter] = useState(props.route.params.item);
    const [videoUrl, setVideoUrl] = useState()
    const [playing, setPlaying] = useState(false);
    const [item, setItem] = useState(props.route.params.item);


    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);



    return (
        <Container style={styles.container}>


            <View style={{ padding: 20, paddingTop: 50 }}>

                <View style={styles.socialicons} >
                    <TouchableOpacity style={{}} onPress={() =>
                        Linking.openURL('https://www.facebook.com/AFDOAustralianFederationofDisabilityOrganisations/')
                    }>
                        <SocialIcon 
                            type='facebook'
                            iconSize={30}
                            
                            
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{}} onPress={() =>
                        Linking.openURL('https://www.youtube.com/@AFDO2012')
                    }>
                        <SocialIcon
                            type='youtube'

                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backIcon} onPress={() =>
                        props.navigation.navigate("Home", { chapter: chapter })
                    }>

                        <Ionicons name="arrow-back-circle" size={50} color="#04acab" />
                    </TouchableOpacity>

                </View>

                <ScrollView>

                    <View style={{ marginTop: 80 }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{chapter.name}</Text>
                        <Text style={{ color: Colors.gray, marginBottom: 10 }}>By AFDO</Text>


                        {chapter.YoutubeUrl ? (

                            <YoutubePlayer
                                height={200}
                                play={playing}
                                videoId={chapter.YoutubeUrl}

                                onChangeState={onStateChange}

                            />
                        ) : (

                            <Video
                                ref={video}
                                style={{ height: 250, marginTop: 0, borderRadius: 10 }}
                                source={{
                                    uri: chapter.video ? chapter.video : <YoutubePlayer
                                        height={200}
                                        play={playing}
                                        videoId={chapter.YoutubeUrl}

                                        onChangeState={onStateChange}

                                    />
                                }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                                onPlaybackStatusUpdate={status => setStatus(() => status)} 
                            />
                        )}



                        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }}>About Chapter</Text>
                        <Text numberOfLines={50}
                            style={{ color: Colors.gray }}>{chapter.description}</Text>


                    </View>

                </ScrollView>

            </View>

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
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    backIcon: {
        position: 'absolute',
        right: -180,
        marginTop: -20,
        marginBottom: 20,
        paddingLeft: 10

    },

    socialicons: {
        flex: 1,
        
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        marginTop: 25,
        marginRight: 210,
        // backgroundColor:"blue",
        padding: 10,
        width: -200,




    }
})

export default connect(null, mapToDispatchToProps)(SingleChapter);




















