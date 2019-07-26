import { createStore } from 'redux'
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";
import reducer, { loginStart, loginError, loginSuccess, editProfileStart, editProfileError, editProfileSuccess, logoutStart, logoutSuccess } from './reducer.js'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

/**
 * Converts an object to a query string to be used by the request to auth0 via the dashboard application
 */
function toQueryString(params) {
    return (
      "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    );
  }

export const login = async (navigation) => {
    store.dispatch(loginStart())
    const redirectUrl = AuthSession.getRedirectUrl();
    // console.log(
    //   `***************Redirect URL---place inside of Auth0 dashboard for callback url: ${redirectUrl}`
    // );

    //this variable structures a query param for the /authorize API call to the auth0 API
    const queryParams = toQueryString({
      //this must come from your auth0 dashboard.
      client_id: "aWbcrJuDRzAgU0cba0Jj7oPVM1gKAWEr",
      redirect_uri: redirectUrl,
      // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
      audience: "https://auth0-example",
      // id_token will return a JWT token, token is access_token
      response_type: "id_token token",
      // retrieve the user's profile and email from the openID
      scope: "openid profile email",
      nonce: "nonce"
    });

    //dynamicly navigating the proper routes on the auth0 app
    // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain
    const domain = "https://jaymaasdev.auth0.com";
    const authUrl = `${domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    // console.log("Authentication response", response);

    //if successful then it will call the next function!!!
    //this should contain the access token and the id token
    //this calls the function below, passing the tokens as parameters
    if (response.type === "success") {
      if (response.error) {
          store.dispatch(loginError(response.error))
        Alert(
          "Authentication error",
          response.error_description || "something went wrong"
        );
        return;
      }
      //set the access token to be assigned to state for later use
      const access_token = response.params.access_token;
      // Retrieve the JWT token and decode it using the jwtToken imported above
      const id_token = response.params.id_token;
      //decodes the token so we can access the available attributes of the users Auth0 profile
      const idDecoded = jwtDecode(id_token);
      const accessDecoded = jwtDecode(access_token)
      // console.log("********    ID TOKEN    ***********", idDecoded);
      // console.log("********    ACCESS TOKEN    ***********", accessDecoded);
      const role = accessDecoded.permissions[0] && accessDecoded.permissions[0].replace('role:', '')
      console.log(idDecoded.name,"*******************",role)
      const chosenDecoded = {
          name: idDecoded.name,
          picture: idDecoded.picture,
          role: role || "supporter"
      }
      
      store.dispatch(loginSuccess(chosenDecoded))

      if(role === 'organization') {
        console.log('test1', role)
        return navigation.navigate('OrgApp')
      }  else if (role === 'supporter') {
        console.log('test2', role)
        return navigation.navigate('GuestApp' )
      } else if (!role){
        return navigation.navigate('GuestApp')
      }
    }
  };

export const editProfile = async (updatedInfo, navigation) => {
    store.dispatch(editProfileStart())
    try {
        console.log(updatedInfo)
        if (updatedInfo && updatedInfo.orgName && updatedInfo.orgLocation && updatedInfo.orgEmail) {
            store.dispatch(editProfileSuccess(updatedInfo))
            navigation.navigate('OrganizationLoggedIn')
        } else {
            throw "Must contain all items in order to complete profile"
        }
    } catch (error) {
        store.dispatch(editProfileError(error))
    }
}

export const logout = navigation => {
    store.dispatch(logoutStart())
    store.dispatch(logoutSuccess())
    navigation.navigate('Auth')
}

export default store

