import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import Login from "./loginScreen";
import Signup from "./signupScreen";
import axios from "..../api/api_axios.js";
const Stack = createStackNavigator();

export default function Auth({ navigation }) {
  const [message, setmessage] = useState(null);
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);

  function Login_Screen(props) {
    return (
      <Login
        message={message}
        navigation={props.navigation}
        username={username}
        password={password}
        setusername={(text) => setusername(text)}
        setpassword={(text) => setpassword(text)}
      />
    );
  }
  function Signup_Screen() {
    return <Signup />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login_Screen} />
      <Stack.Screen name="Signup" component={Signup_Screen} />
    </Stack.Navigator>
  );
}
