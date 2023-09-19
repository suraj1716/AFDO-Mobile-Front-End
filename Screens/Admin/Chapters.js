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
import LiveStreams from "./LiveStreams";

import axios from "axios"
import baseURL from "../../assets/common/baseURL"
import AsyncStorage from "@react-native-community/async-storage"
import EasyButton from "../../Shared/StyledComponents/EasyButton";


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
                <Text style={{ fontWeight: '600'}}>Course</Text>
            </View>
            
        </View>
    )
}

const Chapters = (props) => {

    const [chapterList, setChapterList] = useState();
    const [chapterFilter, setChapterFilter] = useState();
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
                    .get(`${baseURL}chapters`)
                    .then((res) => {
                        setChapterList(res.data);
                        setChapterFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setChapterList();
                    setChapterFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchChapter = (text) => {
        if (text == "") {
            setChapterFilter(chapterList)
        }
        setChapterFilter(
            chapterList.filter((i) => 
                i.name?.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteChapter = (id) => {
        axios
            .delete(`${baseURL}chapters/${id}`, {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const chapters = chapterFilter.filter((item) => item.id !== id)
                setChapterFilter(chapters)
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
                onPress={() => props.navigation.navigate("Orders")}
            >
                <Icon name="shopping-bag" size={18} color="white" />
                <Text style={styles.buttonText}>Orders</Text>
            </EasyButton>


            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Courses")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Courses</Text>
            </EasyButton>

            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("ChapterForm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Chapters</Text>
            </EasyButton>

            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Users")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Users</Text>
            </EasyButton>


            {/* <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("LiveStreamForm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>LiveStreams</Text>
            </EasyButton> */}
            
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("LiveStreams")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>LiveStreamList</Text>
            </EasyButton>

</ScrollView>
        


        </View>
      <View>
          <Header searchBar rounded style={{backgroundColor:"#82d6d5"}}>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    onChangeText={(text) => searchChapter(text)}
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
            data={chapterFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                <ListItem 
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    delete={deleteChapter}
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

export default Chapters;