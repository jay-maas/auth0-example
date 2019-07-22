import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainView  from './MainView'
import EditProfile from './EditProfile'
import LoggedInView from './LoggedInView'
import OrganizationLoggedIn from './OrganizationLoggedIn'



export default class App extends React.Component {
 render() {
   return (
     <Provider store={ store }>
       <AppContainer
         onNavigationStateChange={console.log('changed')}
         uriPrefix="/app"
       />
     </Provider>
   )
 }
}

const GuestStack = createStackNavigator({
  LoggedInView: LoggedInView
})
//Screen value is the name of the Component
const OrgStack = createStackNavigator({
  OrganizationLoggedIn: OrganizationLoggedIn
})

const EditStack = createStackNavigator({
  EditProfile: EditProfile
 })

const AuthStack = createStackNavigator({
  MainView: MainView
})

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Edit: EditStack,
    OrgApp: OrgStack,
    GuestApp: GuestStack,
    Auth:  AuthStack
  },
  {
    initialRouteName: 'Auth',
    headerTitle: 'Key Conservation'
   }
))