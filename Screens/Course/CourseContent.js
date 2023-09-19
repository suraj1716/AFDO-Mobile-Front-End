import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Button  } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';

const CourseContent = (props) => {

    return(
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "white" , marginTop:-20 }}
        >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.courseContent('all'), props.setActive(-1)
                    }}
                >
                    {/* <Badge
                         style={[styles.center, {margin: 5, height:100, marginBottom:10},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>All Modules</Text>
                    </Badge> */}
                </TouchableOpacity>
                
                {props.courses?.map((item) => (
                 props.active == props.courses.indexOf(item),
                      <TouchableOpacity
                      key={item._id}
                      onPress={() => {
                          props.courseContent(item._id), 
                          props.setActive(props.courses.indexOf(item))
                      }}
                  >
                      <Badge
                          style={[styles.center, 
                            {margin: 5, height:100, marginBottom:10},
                            props.active == props.courses.indexOf(item) ? styles.active : styles.inactive
                          ]}
                      >
                          <Text style={{ color: 'white', marginTop:50 }}>{item.name}</Text>
                          <View style={{marginBottom: 60}}>
                    <Button 
                    
                    title={'Add'} 
                    color={'green'}
                    
                    onPress={()=>{
                       // props.addItemToCart(props),
                        Toast.show({
                            topOffset:40,
                            type:"success",
                            text1:`${name} added to Cart`,
                            text2:"Go to your cart to complete order"

                        })

                    }}
                    
                    />
                </View>
                      </Badge>
                  </TouchableOpacity>
                ))}




            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CourseContent;