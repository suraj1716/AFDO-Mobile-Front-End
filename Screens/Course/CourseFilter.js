import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Button } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions'

const CourseFilter = (props) => {

    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "white", marginTop: -20 }}
        >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                {/* <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.courseFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                         style={[styles.center, {margin: 5, height:100, marginBottom:10},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>Select</Text>
                        <Text style={{ color: 'white' }}>Modules</Text>
                    </Badge>
                </TouchableOpacity> */}

                {props.courses?.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            props.courseFilter(item._id),
                                props.setActive(props.courses.indexOf(item))
                        }}
                    >
                        <Badge
                            style={[styles.center,
                            { margin: 5, height: 30, marginBottom: 10, },
                            props.active == props.courses.indexOf(item) ? styles.active : styles.inactive
                            ]}
                        >



                            <Text style={{ color: 'white'}}>{item.name?.length > 15 ? item.name.substring(0, 30 )
                +'...': item.name
                }</Text>
                            {/* <View style={{ marginBottom: 60 }}>
                                <Text style={styles.price}>
                                    ${item.price}
                                </Text>

                                <Button
                                    styles={styles.price}
                                    title={'Add'}
                                    color={'green'}

                                    onPress={() => {
                                        props.addItemToCart(props),
                                            Toast.show({
                                                topOffset: 40,
                                                type: "success",
                                                text1: `${item.name} added to Cart`,
                                                text2: "Go to your cart to complete order"

                                            })

                                    }}

                                />
                            </View> */}
                        </Badge>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (course) =>
            dispatch(actions.addToCart({ quantity: 1, course }))
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    active: {
        backgroundColor: '#1db4b3'
    },
    inactive: {
        backgroundColor: '#9bdedd'
    },
    title: {
        // fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
        top: -15,
        backgroundColor: "#ffffff",
        width: 122
    },
    price: {
        flexDirection:'row',
        fontSize: 15,
        color: 'blue',
        padding: 5,
    }
})

export default connect(null, mapDispatchToProps)(CourseFilter);