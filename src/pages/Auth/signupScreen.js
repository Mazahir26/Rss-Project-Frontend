import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function signup({navigation, message}) {
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [email, setemail] = useState(null);

  return (
    <View style={styles.container}>
      <TextInput
        label="User Name"
        value={username}
        onChangeText={(text) => setusername(text)}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setpassword(text)}
      />
      <Button
        mode="contained"
        onPress={() => console.log("Pressed the button")}
      >
        Signup
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
