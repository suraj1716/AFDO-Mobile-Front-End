import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

var { width } = Dimensions.get("window")

const SearchedCourses = (props) => {
    const { coursesFiltered } = props;
    return(
        <Content style={{ width: width }}>
            {coursesFiltered?.length > 0 ? (
                coursesFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Course Detail", {item: item})
                        }}
                        key={item._id}
                        avatar
                    >
                        <Left>
                            <Thumbnail 
                                source={{uri: item.image ? 
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                        }}
                            />
                             <Text style={styles.price}>${item.price}</Text>
                        </Left>
                        
                          
                      
                        
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf:  'center' }}>
                        No courses match the selected criteria
                    </Text>
                </View>
            )}
        </Content>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },

    price: {
      
        fontSize: 20,
        color: 'orange',
        marginTop: 70,
        paddingLeft:-50
    }
})

export default SearchedCourses;