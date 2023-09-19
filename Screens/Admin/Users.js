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
import UserList from "./UserList";


var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            
         
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Email</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' , marginLeft:40}}>Phone</Text>
            </View>
            
        </View>
    )
}

const Users = (props) => {

    const [userList, setUserList] = useState();
    const [userFilter, setUserFilter] = useState();
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
                    .get(`${baseURL}users`)
                    .then((res) => {
                        setUserList(res.data);
                        setUserFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setUserList();
                    setUserFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchUser = (text) => {
        if (text == "") {
            setUserFilter(userList)
        }
        setUserFilter(
            userList.filter((i) => 
                i.name?.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteUser = (id) => {
        axios
            .delete(`${baseURL}users/${id}`, {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const users = userFilter.filter((item) => item.id !== id)
                setUserFilter(users)
            })
            .catch((error) => console.log(error));
    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            
            <ScrollView horizontal={true} style={{ flex: 1, flexWrap: "wrap" }} >
          


</ScrollView>
        


        </View>
      <View>
          <Header searchBar rounded>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    onChangeText={(text) => searchUser(text)}
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
            data={userFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                <UserList 
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    delete={deleteUser}
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
        margin: 12,
   
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

export default Users;