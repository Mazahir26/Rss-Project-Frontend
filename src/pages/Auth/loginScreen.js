import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, TextInput, Paragraph } from "react-native-paper";

export default function login(
  navigation,
  message,
  password,
  setpassword,
  username,
  setusername
) {
  const [showpassword, setshowpassword] = useState(false);
  console.log(props);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="User Name"
        mode="outlined"
        value={username}
        onChangeText={(text) => setusername(text)}
        left={<TextInput.Icon name="account" size={18} />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry={!showpassword}
        mode="outlined"
        value={password}
        onChangeText={(text) => setpassword(text)}
        left={<TextInput.Icon name="lock" size={18} />}
        right={
          password != "" && password != null ? (
            <TextInput.Icon
              name={showpassword ? "eye-off" : "eye"}
              onPress={() => setshowpassword(!showpassword)}
            />
          ) : null
        }
        textContentType="password"
      />
      <Button
        style={styles.button}
        mode="contained"
        labelStyle={styles.buttonlable}
        onPress={() => console.log("Pressed the button")}
      >
        Login
      </Button>
      <TouchableOpacity
        style={styles.text}
        onPress={() => console.log("Pressed")}
      >
        <Paragraph>Don't have an account, Signup?</Paragraph>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonlable: {
    height: 30,
    textAlignVertical: "center",
  },
  text: {
    marginTop: 8,
    marginHorizontal: 23,
    alignSelf: "center",
  },
});
