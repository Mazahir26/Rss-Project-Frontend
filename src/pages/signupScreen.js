import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
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
      colors={["#005EB6", "#002D5A"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.Headdingcontainer}>
        <Text style={styles.heading}>Get on Board!</Text>
      </View>
      <View style={styles.middle_container}>
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
            name="lock"
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
            name="lock"
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
        <Text style={styles.Helptext}>{message}</Text>
      </View>
      <View style={styles.bottomContainer}>
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
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ flex: 0.05, alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "white",
            fontFamily: "Inter_400Regular",
          }}
        >
          Have an account? Login
        </Text>
      </TouchableOpacity>
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
    flex: 0.3,
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
    marginTop: 20,
  },
  Headdingcontainer: {
    flex: 0.35,
    marginHorizontal: 25,
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
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
    flex: 0.3,
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