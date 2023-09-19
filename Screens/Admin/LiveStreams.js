import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView
} from "react-native";
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import ListItem from "./ListItem"

import axios from "axios"
import baseURL from "../../assets/common/baseURL"
import AsyncStorage from "@react-native-community/async-storage"
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import LiveStreamList from "./LiveStreamList";


var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Thumbnail</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Date</Text>
            </View>

            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Time</Text>
            </View>
            
        </View>
    )
}

const LiveStreams = (props) => {

    const [liveStreamList, setLiveStreamList] = useState();
    const [liveStreamFilter, setLiveStreamFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        React.useCallback(
            () => {
                // Get Token
                // AsyncStorage.getItem("jwt")
                //     .then((res) => {
                //         setToken(res)
                //     })
                //     .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}liveStreams`)
                    .then((res) => {
                        setLiveStreamList(res.data);
                        setLiveStreamFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setLiveStreamList();
                    setLiveStreamFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchLiveStream = (text) => {
        if (text == "") {
            setLiveStreamFilter(liveStreamList)
        }
        setLiveStreamFilter(
            liveStreamList.filter((i) => 
                i.name?.toLowerCase().includes(text.toLowerCase())
            ) 
        )
    }

    const deleteLiveStream = (id) => {
        axios
            .delete(`${baseURL}liveStreams/${id}`, {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const liveStreams = liveStreamFilter.filter((item) => item.id !== id)
                setLiveStreamFilter(liveStreams)
            })
            .catch((error) => console.log(error));
    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            
            <ScrollView horizontal={true} style={{ flex: 1, flexWrap: "wrap" }} >
         

            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("LiveStreamForm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>LiveStreams</Text>
            </EasyButton>
            
            

</ScrollView>
        


        </View>
      <View>
          <Header searchBar rounded>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    onChangeText={(text) => searchLiveStream(text)}
                  />
              </Item>
          </Header>
      </View>

      {loading ? (
          <View style={styles.spinner}> 
              <ActivityIndicator size="large" color="red" />
          </View>
      ) : (
          <FlatList 
            data={liveStreamFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                <LiveStreamList 
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    delete={deleteLiveStream}
                />
            )}
            keyExtractor={(item) => item.id}
          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 3
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
    
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: width,
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
});

export default LiveStreams;