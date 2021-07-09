import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./loginScreen";
import Signup from "./signupScreen";
const Stack = createStackNavigator();

export default function Auth() {
  function Login_Screen(props) {
    return <Login navigation={props.navigation} />;
  }
  function Signup_Screen(props) {
    return <Signup navigation={props.navigation} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login_Screen} />
      <Stack.Screen name="Signup" component={Signup_Screen} />
    </Stack.Navigator>
  );
}
