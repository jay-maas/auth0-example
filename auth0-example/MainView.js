import React from "react";
import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import { login } from './store'
import { connect } from 'react-redux'

class App extends React.Component {
  static navigationOptions = () => {
    return { 
    headerTitle: 'Key Conservation',
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
  }
  };
  state = {
    name: null,
    age: null,
    location: null,
    access_token: null,
    registrationCompleted: null
  };

  componentDidMount() {
    login(this.props.navigation)
  }

  loginHandler = () => {
    login(this.props.navigation)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewsContainer}>
          <Text style={styles.mainViewText}>I am an organization</Text>
            <View style={styles.buttonContainer}>
                <Button 
                title="Log In"
                onPress={this.loginHandler}
                color="white"
                />
            </View>
        </View>
        <Image style={styles.image} source={require('./assets/Key.png')} />
        <View style={styles.viewsContainer}>
          <Text style={styles.mainViewText}>I am a guest</Text>
          <View style={styles.buttonContainer}>
            <Button 
            title="View Posts"
            onPress={this.loginHandler}
            color="white"
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  loggingIn: state.loggingIn
}) 

// Leo wrote this


export default connect(mapState)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(189, 195, 199, 1)",
  },
  viewsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainViewText: {
    fontSize: 25,
    marginBottom: 15
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4511e",
    width: '50%',
    height: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'flex-end'
  }
});
