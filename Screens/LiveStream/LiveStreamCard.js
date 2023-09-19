import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button,TouchableOpacity
} from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome";

import { Toast } from 'react-native-toast-message/lib/src/Toast';

// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions'

var { width } = Dimensions.get("window");

const LiveStreamCard=(props)=>{
    const{name, price, image, time, date}=props;
    return(

        <View style={styles.container}>
          
        
            <Image style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image: "https://www.unison.org.uk/content/uploads/2021/11/panel-debate-745x420.jpeg"}}
            />


            <View style={styles.card}/>
            <Icon name="play-circle" color="gainsboro" size={70} style={{ marginTop:-70}}  />
            <Text style={styles.title}>
           
                {name?.length > 15 ? name.substring(0, 60 )
                +'...': name
                }
                

            </ Text>
            <Text style={{flex:1}}>Date: {date}</ Text>
         

        
            

        </View>

    )
            
        



}



const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (course) => 
            dispatch(actions.addToCart({quantity: 1, course}))
    }
}




const styles = StyleSheet.create({
    container: {
        width: width / 2,
        height: width/ 1.9,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        
       
       
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -5
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default LiveStreamCard;

// export default connect(null, mapDispatchToProps)(CourseCard);