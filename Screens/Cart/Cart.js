import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1
} from "native-base";


import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";


var { height, width } = Dimensions.get("window");

const Cart = (props) => {

  return (
    
    <View style={{flex:1}}>
        {props.cartItems.map(x=>{
          return(
            <Text>{x.course.name}</Text>
          )
        })}

    </View>
  )


}
  

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red'
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
});

export default connect(mapStateToProps, null)(Cart);