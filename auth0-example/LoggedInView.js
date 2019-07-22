import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LoggedInView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { 
    headerTitle: 'Guest',
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: (
      
      <Button
        onPress={() => navigation.navigate('Auth')}
        title="Logout"
        color="#fff"
      />
    )}
  };

  render() {
    return (
      <View style={styles.container}>
          <Text>Hello! We need your help!</Text>
        <View style={styles.card}>
          <Text>Tigers</Text>
            <Text>The tigers really need some more shade!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(189, 195, 199, 1)",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButtonContainer: {
    backgroundColor: "rgba(165, 55, 253, 1)",
    width: "100%",
    height: 50
  },
  logoutButtonContainer: {
    backgroundColor: "rgba(244, 247, 118, 1)",
    width: "100%",
    height: 50
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(200, 247, 197, 1)",
    width: "50%",
    padding: 5,
    margin: 5
  }
});
