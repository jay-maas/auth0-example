import React from 'react'
// import { Provider } from 'react-redux'
// import store from './store'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginLogoutMainView  from './LoginLogoutMainView'
import EditProfile from './EditProfile'
import { StyleSheet, Text, View, Button, Alert } from 'react-native';



export default class App extends React.Component {

componentDidMount() {

}

 render() {
   return (
     //<Provider store={ store }>
       <AppContainer
         onNavigationStateChange={console.log('changed')}
         uriPrefix="/app"
       />
     //</Provider>
   )
 }
}

//Screen value is the name of the Component
const RootStack = createStackNavigator({
  Login : {
   screen: LoginLogoutMainView
 },
 EditProfile: {
   screen: EditProfile
 },
}, {
 initialRouteName: 'Login',
 headerTitle: 'Key Conservation'

})

const styles = StyleSheet.create({

})

const AppContainer = createAppContainer(RootStack)