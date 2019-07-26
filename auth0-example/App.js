import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainView  from './MainView'
import EditProfile from './EditProfile'
import LoggedInView from './LoggedInView'
import OrganizationLoggedIn from './OrganizationLoggedIn'
import Loading from './LoadingScreen'



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
  EditProfile: EditProfile,
  OrganizationLoggedIn: OrganizationLoggedIn
})

const AuthStack = createStackNavigator({
  MainView: MainView
})

const LoadingStack = createStackNavigator({
  Loading: Loading
})

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    OrgApp: OrgStack,
    GuestApp: GuestStack,
    Auth:  AuthStack,
    Loading: LoadingStack
  },
  {
    initialRouteName: 'Loading',
    headerTitle: 'Key Conservation'
   }
))