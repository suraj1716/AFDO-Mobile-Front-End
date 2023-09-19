import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { setCurrentUser } from "../../Context/actions/Auth.actions";

import AppContext from '../../Context/AppContext'
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";



const Login = (props) => {
  // const context = useContext(AuthGlobal);
  // const [user, setUser] = useContext(UserContext);
  const {email, setEmail}= useContext(AppContext)
  const[text, setText]=useState('')
  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loogedIn, setLoggedIn] = useState("");


  // useEffect(() => {
  //   if (email === "cody@gmail.com") {
  //     navigation.navigate("UserProfile");
  //   }
  // });

  // const handleSubmit = () => {
  //   const user = {
  //     email,
  //     password,
  //   };

  //   if (email === "" || password === "") {
  //     setError("Please fill in your credentials");
  //   } else {
  //     loginUser(user, context.dispatch);
  //   }
  // };


  // const handleSubmit = (e) => {
  
  //   setEmail({email: {email}})
  // };


  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        // value={email}
        onChangeText={(value) => setText(value.toLowerCase())}
      />

      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}

        <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
        <Button style={{width:20}} onPress={()=>     setEmail(text)} title={"Login"} />
        </View> 



        {/* <EasyButton large primary onPress={(text) =>setEmail(text)}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton> */}
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
        large
        secondary 
        onPress={() => props.navigation.navigate("Register")}>
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;