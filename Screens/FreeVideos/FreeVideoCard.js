import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button, TouchableOpacity
} from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions'


var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");


const FreeVideoCard=(props)=>{
    const{name, image, item, video}=props;
    return(

        <View style={styles.container}>

            <Image style={styles.image}
            resizeMode="cover"
            source={{uri: image ? image: "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png"}}
            />

       <TouchableOpacity  onPress={() => 
                    props?.navigation?.navigate("FreeVideo Detail")
                }> 
        <Icon name="play-circle" color="white" size={70} style={{marginTop:40}} />
       </TouchableOpacity> 
          
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring()
                +'...': name
                }

            </Text>  

        </View>

    )
            
        


    



}



const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (freeVideo) => 
            dispatch(actions.addToCart({quantity: 1, freeVideo}))
    }
}




const styles = StyleSheet.create({
    container: {
        width: width / 2.5 - 20,
        height: width/2.2 ,
        borderRadius: 10,
        marginTop: 12,
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
        borderRadius:10
        
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
        textAlign: 'left',
        top:-15,
        backgroundColor:"#ffffff",
        width:122,
        padding:5
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

//export default FreeVideoCard;

export default connect(null, mapDispatchToProps)(FreeVideoCard);