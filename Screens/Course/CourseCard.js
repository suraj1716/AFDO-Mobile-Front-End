import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions'

var { width } = Dimensions.get("window");

const CourseCard=(props)=>{
    const{name, price, image,}=props;
    return(

        <View style={styles.container}>

            <Image style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image: "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png"}}
            />

            <View style={styles.card}/>
            <Text style={styles.price}>
                ${price}

            </Text>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 -3)
                +'...': name
                }

            </Text>


   

          
            

        </View>

    )
            
        



}



// const mapDispatchToProps = (dispatch) => {
//     return {
//         addItemToCart: (course) => 
//             dispatch(actions.addToCart({quantity: 1, course}))
//     }
// }




const styles = StyleSheet.create({
    container: {
        width: width / 2.5 - 20,
        height: width/2.2 ,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 28,
        alignItems: 'center',
       
        backgroundColor: 'white',

       
    },
    image: {
        width: width / 2 - 20 - 50,
        height: width / 2 - 20 - 50,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 6,
        borderRadius:10,
        objectFit:"cover"
        
    },
    card:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:100,
        height: 100,
        borderRadius:4,
        margin:8
      },
    title: {
        // fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
        top:-15,
        backgroundColor:"#ffffff",
        width:122
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default CourseCard;

// export default connect(null, mapDispatchToProps)(CourseCard);