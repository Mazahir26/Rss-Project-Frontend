import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableRipple } from "react-native-paper";

import axios from "../api/api_axios";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
export default function login({ navigation, Setcontext }) {
  const [showpassword, setshowpassword] = useState(false);
  const [showpassword2, setshowpassword2] = useState(false);
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [password2, setpassword2] = useState(null);
  const [message, setmessage] = useState(null);

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
  });
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  function login() {
    if (
      username == null ||
      username == "" ||
      password == null ||
      password == ""
    ) {
      setmessage("Please fill in your details");
      return;
    }
    if (username.length <= 3) {
      setmessage("Username is too short");
      return;
    } else if (password.length <= 5) {
      setmessage("Password is too short");
      return;
    } else if (password != password2) {
      setmessage("Passwords don't match");
      return;
    } else {
      var data = {
        username: `${username}`,
        password: `${password}`,
        email: "",
      };
      setmessage("");
      axios
        .post("/signup", data)
        .then((res) => {
          console.log(res.data);
          Setcontext(res.data.token);
          setmessage(null);
        })
        .catch((err) => {
          if (err.response.data.error) {
            setmessage(err.response.data.error);
          } else {
            setmessage("Something went wrong, Please try again");
          }
          console.log(err.response.data);
        });
    }
  }
  if (!fontsLoaded) {
    return <View></View>;
  }
  return (
    <LinearGradient
      colors={["#8275c7", "#628cd4"]}
      start={[1, 1]}
      end={[0, 0]}
      style={styles.container}
    >
      <View style={styles.Headdingcontainer}>
        {!keyboardStatus ? (
          <Animatable.Image
            delay={200}
            animation="fadeInDown"
            style={{ height: "70%", width: "70%" }}
            resizeMode="contain"
            source={require("../assets/signup.png")}
          />
        ) : null}
        <Animatable.Text
          animation="slideInDown"
          delay={100}
          style={[styles.heading, { fontSize: 20 }]}
        >
          Hi There!
        </Animatable.Text>
        <Animatable.Text animation="slideInDown" style={styles.heading}>
          Let's Get Started
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="slideInUp"
        delay={100}
        style={styles.middle_container}
      >
        <View style={styles.textinput_container}>
          <MaterialCommunityIcons
            style={{ marginRight: 8 }}
            name="account"
            size={24}
            color={message ? "#FF7F7F" : "white"}
          />
          <TextInput
            editable={message == "" ? false : true}
            style={[
              styles.input,
              { borderColor: message ? "#FF7F7F" : "white" },
            ]}
            value={username}
            onChangeText={(text) => setusername(text)}
            placeholder="Name"
            placeholderTextColor="#cccc"
          />
        </View>
        <View style={styles.textinput_container}>
          <MaterialCommunityIcons
            style={{ marginRight: 8 }}
            name="key"
            size={24}
            color={message ? "#FF7F7F" : "white"}
          />
          <TextInput
            editable={message == "" ? false : true}
            style={[
              styles.input,
              { borderColor: message ? "#FF7F7F" : "white" },
            ]}
            secureTextEntry={!showpassword}
            value={password}
            onChangeText={(text) => setpassword(text)}
            textContentType="password"
            placeholder="Password"
            placeholderTextColor="#cccc"
          />
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: message ? "#FF7F7F" : "white",
            }}
          >
            {password ? (
              password.length > 0 ? (
                <TouchableOpacity
                  onPress={() => setshowpassword(!showpassword)}
                >
                  <MaterialCommunityIcons
                    name={showpassword ? "eye" : "eye-off"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ) : null
            ) : null}
          </View>
        </View>
        <View style={styles.textinput_container}>
          <MaterialCommunityIcons
            style={{ marginRight: 8 }}
            name="key"
            size={24}
            color={message ? "#FF7F7F" : "white"}
          />
          <TextInput
            editable={message == "" ? false : true}
            style={[
              styles.input,
              { borderColor: message ? "#FF7F7F" : "white" },
            ]}
            secureTextEntry={!showpassword2}
            value={password2}
            onChangeText={(text) => setpassword2(text)}
            textContentType="password"
            placeholder="Confirm Password"
            placeholderTextColor="#cccc"
          />
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: message ? "#FF7F7F" : "white",
            }}
          >
            {password2 ? (
              password2.length > 0 ? (
                <TouchableOpacity
                  onPress={() => setshowpassword2(!showpassword2)}
                >
                  <MaterialCommunityIcons
                    name={showpassword2 ? "eye" : "eye-off"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ) : null
            ) : null}
          </View>
        </View>
        {message == "" || message == null ? (
          <Text style={styles.Helptext}>{message}</Text>
        ) : (
          <Animatable.Text animation="jello" style={styles.Helptext}>
            {message}
          </Animatable.Text>
        )}
      </Animatable.View>
      <Animatable.View
        animation="slideInUp"
        delay={200}
        style={styles.bottomContainer}
      >
        <TouchableRipple
          disabled={message == "" ? true : false}
          rippleColor="#eeee"
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonlable}>
            {message != "" ? "Signup" : "Loading"}
          </Text>
        </TouchableRipple>
      </Animatable.View>
      {!keyboardStatus ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ flex: 0.05, alignItems: "center" }}
        >
          <Animatable.View animation="slideInUp" delay={300}>
            <Text
              style={{
                fontSize: 13,
                color: "white",
                fontFamily: "Inter_400Regular",
              }}
            >
              Have an account? Login
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  bottomContainer: {
    flex: 0.1,
    marginHorizontal: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textinput_container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 20,
  },
  Headdingcontainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "white",
    fontFamily: "Inter_600SemiBold",
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#cccc",
    color: "white",
    fontSize: 18,
    flex: 1,
    paddingLeft: 4,
  },
  middle_container: {
    flex: 0.45,
    marginHorizontal: 25,
    justifyContent: "flex-end",
  },
  buttonlable: {
    marginHorizontal: 25,
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    marginVertical: 5,
  },
  Helptext: {
    marginHorizontal: 15,
    alignSelf: "center",
    color: "white",
    fontSize: 12,
    minHeight: 15,
    textAlignVertical: "center",
    textAlign: "center",
    marginVertical: 5,
  },
});

{
  /* <Text
style={[
  styles.Helptext,
  { textAlign: "center", marginHorizontal: 40, marginBottom: 20 },
]}
>
By creating an account you agree to our terms of use and privacy policy
</Text> */
}
