import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default class EditProfile extends React.Component {
  static navigationOptions = {
    title: "Edit Your Profile",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    return (
      <>
        <View>
          <Text>Hello </Text>
        </View>
      </>
    );
  }
}
