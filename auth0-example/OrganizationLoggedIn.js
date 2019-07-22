import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { connect } from 'react-redux'
import { logout } from './store'
import axios from 'axios'

class OrganizationLoggedIn extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { 
    headerTitle: 'Organization',
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: (
      
      <Button
        onPress={()=> logout(navigation)}
        title="Logout"
        color="#fff"
      />
    )}
  };


  APICALL = () => {
    axios
  //     .create({
  //       headers: {
  //           Authorization: this.props.accessToken
  //       },
  //       baseURL: 'https://react-native-testing-server.herokuapp.com/'
  // })
      .get('https://react-native-testing-server.herokuapp.com/')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
         <Text>Welcome {this.props.orgName}!</Text>
         <Button 
         title="API CALL"
         onPress={this.APICALL}
         />
      </View>
    );
  }
}

const mapState = state => ({
  orgName: state.orgName,
  orgLocation: state.orgLocation,
  orgEmail: state.orgEmail,
  accessToken: state.accessToken
})

export default connect(mapState)(OrganizationLoggedIn)

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
