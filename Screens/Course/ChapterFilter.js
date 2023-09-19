import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';

const ChapterFilter = (props) => {

    return(
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.courseFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 1},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>Modules</Text>
                    </Badge>
                </TouchableOpacity>
                
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
                            {margin: 5},
                            props.active == props.courses.indexOf(item) ? styles.active : styles.inactive
                          ]}
                      >
                          <Text style={{ color: 'white' }}>{item.name}</Text>
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

export default ChapterFilter;