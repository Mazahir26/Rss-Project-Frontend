import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  StatusBar,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import * as Animatable from "react-native-animatable";
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
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState(null);

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

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
  });

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
    } else {
      var data = {
        username: `${username}`,
        password: `${password}`,
        email: "",
      };
      setmessage("");
      axios
        .post("/login", data)
        .then((res) => {
          Setcontext(res.data.token);
          setmessage(null);
        })
        .catch((err) => {
          if (err.response == null) {
            setmessage("Something went wrong, Please try again");
          } else if (err.response.data == null) {
            setmessage("Something went wrong, Please try again");
          } else if (err.response.data.error) {
            setmessage(err.response.data.error);
          } else {
            setmessage("Something went wrong, Please try again");
          }
        });
    }
  }
  if (!fontsLoaded) {
    return <View></View>;
  }
  return (
    <LinearGradient
      colors={["#8275c7", "#8f85cc"]}
      start={[0.9, 0.9]}
      end={[0, 0]}
      style={styles.container}
    >
      <StatusBar backgroundColor="#8f85cc" />
      <View style={styles.Headdingcontainer}>
        {!keyboardStatus ? (
          <Animatable.Image
            delay={200}
            animation="fadeInDown"
            style={{ height: "70%", width: "70%" }}
            resizeMode="contain"
            source={require("../assets/login.png")}
          />
        ) : null}
        <Animatable.Text
          animation="slideInDown"
          delay={100}
          style={[styles.heading, { fontSize: 20 }]}
        >
          Welcome Back!
        </Animatable.Text>
        <Animatable.Text animation="slideInDown" style={styles.heading}>
          Please, Login
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
                  disabled={message == "" ? true : false}
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
        {message == "" || message == null ? null : (
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
            {message != "" ? "Login" : "Loading"}
          </Text>
        </TouchableRipple>
      </Animatable.View>
      {!keyboardStatus ? (
        <TouchableOpacity
          disabled={message == "" ? true : false}
          onPress={() => navigation.navigate("Signup")}
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
              New here? Sign Up instead
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
    marginTop: 10,
  },
  textinput_container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 15,
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
  },
});
