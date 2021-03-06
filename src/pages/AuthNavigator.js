import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import Login from "./loginScreen";
import Signup from "./signupScreen";
import OnBoarded from "./onBoardingScreen";
import { Context } from "../Context/AuthContext";
const Stack = createStackNavigator();

export default function Auth() {
  const { state, signup } = useContext(Context);
  function Login_Screen(props) {
    return (
      <Login
        navigation={props.navigation}
        Setcontext={(t) => signup({ token: t })}
      />
    );
  }
  function Signup_Screen(props) {
    return (
      <Signup
        navigation={props.navigation}
        Setcontext={(t) => signup({ token: t })}
      />
    );
  }
  if (!state.onBoarded) {

    return <OnBoarded />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Signup"
    >
      <Stack.Screen name="Login" component={Login_Screen} />
      <Stack.Screen name="Signup" component={Signup_Screen} />
    </Stack.Navigator>
  );
}
