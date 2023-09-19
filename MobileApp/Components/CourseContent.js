import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
export default function CourseContent({course /*, courseType*/}) {
    // const navigation=useNavigation();

    // useEffect(()=>{
    //   console.log("userProgress")
    // })
   
    // const checkUserProgress=(contentId)=>{
    //   return userProgress.find(item=>item.courseContentId==contentId)
    // }
    
    // const onChapterPress=(courseContent)=>{
    //   if(courseType=='text')
    //   {
    //   navigation.navigate('course-chapter',
    //   {courseContent:courseContent,
    //     courseId:course.id, 
    //   })
    // }
    // else{
    //   navigation.navigate('play-video',
    //   {
    //     courseContent:courseContent,
    //     courseId:course.id, 
    //   })
    // }
    // }
  
  return (
    <View style={{marginTop:10}}>

      <Text style={{fontWeight:'bold',
    fontSize:16}}>Course Content</Text>
    
    <FlatList
    style={{marginTop:10}}
    data={course?.id}
    renderItem={({item})=>(
      <View>
        <Text> {item.name}</Text>
        </View>
    )}
  
    />
    </View>
  )
}
