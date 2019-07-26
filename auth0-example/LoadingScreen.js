import React from "react";
import { StyleSheet, ActivityIndicator, View, } from "react-native";
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default class LoggedInView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Loading',
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  };
  async componentDidMount() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken", {})
    console.log(refreshToken)
    if (refreshToken) {
      const config2 = {
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      const data2 = {
        grant_type: 'refresh_token',
        client_id: 'aWbcrJuDRzAgU0cba0Jj7oPVM1gKAWEr',
        client_secret: 'Qh8cQ6KsRsvPtHzBMcXy4--1s3o7M6MGD2WvU5vlOiHpt_VtU5B1lsE75mORlsqH',
        refresh_token: refreshToken,
      }
      axios
        .post('https://jaymaasdev.auth0.com/oauth/token', data2, config2)
        .then(res => {
          // console.log({name: '****************ACCESS TOKEN AGAIN****************', token: jwtDecode(res.data.access_token)})
          // console.log({name: '****************ID TOKEN AGAIN****************', token: jwtDecode(res.data.id_token)})
          const access_token = jwtDecode(res.data.access_token)
          if (access_token.permissions.length === 0) {
            this.props.navigation.navigate('GuestApp')
          } else if (access_token.permissions[0] === 'role:organization') {
            this.props.navigation.navigate('OrgApp')
          }
        })
        .catch(err => {
          console.log(err, 'error2')
        })
    } else {
      console.log('no')
      this.props.navigation.navigate('Auth')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
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
  }
});
