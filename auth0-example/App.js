import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { AuthSession } from 'expo'
import jwtDecode from 'jwt-decode'

/**
 * Converts an object to a query string to be used by the request to auth0 via the dashboard application
 */
function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export default class App extends React.Component {
  state= {
    name: null,
    age: null,
    location: null,
    access_token: null,
    registrationCompleted: null 
  }

  login = async () => {

    const redirectUrl = AuthSession.getRedirectUrl()
    console.log(`***************Redirect URL---place inside of Auth0 dashboard for callback url: ${redirectUrl}`)

    //this variable structures a query param for the /authorize API call to the auth0 API
    const queryParams = toQueryString({

      //this must come from your auth0 dashboard. 
      client_id: 'aWbcrJuDRzAgU0cba0Jj7oPVM1gKAWEr',
      redirect_uri: redirectUrl,
      // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
      audience: 'https://auth0-example',
      // id_token will return a JWT token, token is access_token
      response_type: 'id_token token', 
      // retrieve the user's profile and email from the openID
      scope: 'openid profile email', 
      nonce: 'nonce', 
    })

    //dynamicly navigating the proper routes on the auth0 app
    // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain 
    const domain = 'https://jaymaasdev.auth0.com'
    const authUrl = `${domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

      //if successful then it will call the next function!!!
      //this should contain the access token and the id token
      //this calls the function below, passing the tokens as parameters
      if (response.type === 'success') {
        this.handleResponse(response.params);
        console.log('*******************RESPONSE**********************',response)
      }
  }

  //receives token from Auth0 sign in as params
  handleResponse = (response) => {

    //error handling
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    //set the access token to be assigned to state for later use
    const access_token = response.access_token
    // Retrieve the JWT token and decode it using the jwtToken imported above
    const jwtToken = response.id_token;
    //decodes the token so we can access the available attributes of the users Auth0 profile
    const decoded = jwtDecode(jwtToken);
    console.log('*******************', decoded)
    const { name } = decoded;
    this.setState({ 
      name: name,
      access_token:  access_token
    })

    console.log(this.state)
  };

  logout = () => {

  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={
          this.state.access_token ? 
          styles.logoutButtonContainer 
          : styles.loginButtonContainer
          }>
          {this.state.access_token ?
          <Button 
          color='white'
          title="LOGOUT"
          onPress={this.logout}
          />
          :
          <Button 
          color='white'
          title="LOGIN"
          onPress={this.login}
          />
          }
        </View>
        {this.state.name && <Text>Hello {this.state.name}, We need your help!</Text>}
        <View style={styles.card}>
          <Text>Lions</Text>
          {this.state.access_token && <Text>The lions really need some more food!</Text>}
        </View>
        <View style={styles.card}>
          <Text>Tigers</Text>
          {this.state.access_token && <Text>The tigers really need some more shade!</Text>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    backgroundColor: 'rgba(189, 195, 199, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonContainer: {
    backgroundColor: 'rgba(165, 55, 253, 1)',
    width: '100%',
    height: 50
  },
  logoutButtonContainer: {
    backgroundColor: 'rgba(244, 247, 118, 1)',
    width: '100%',
    height: 50
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(200, 247, 197, 1)',
    width: '50%',
    padding: 5,
    margin: 5
  }
});
