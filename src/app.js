import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from './lib/configureStore'
import { Scene, Router } from 'react-native-router-flux'
import { Platform, AppRegistry } from 'react-native'
import t from './lib/LocaleStrings'

String.format = function (format) {
  const args = Array.prototype.slice.call(arguments, 1)
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined'
      ? args[number]
      : match
  })
}

import Landing from './modules/Landing.ui'
import Home from './modules/Home/Home.ui'
import Username from './modules/Username/Username.ui'
import PinNumber from './modules/PinNumber/PinNumber.ui'
import Password from './modules/Password/Password.ui'
import CameraNotification from './modules/SignUpNotifications/Camera.ui'
import ContactNotification from './modules/SignUpNotifications/Contact.ui'
import ReviewDetails from './modules/ReviewDetails/ReviewDetails.ui'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export default class App extends Component {
  noop = () => {
    // noop
  }
  render () {
    let paddingOS = 54
    let exitPaddingOS = 0
    if (Platform.OS === 'ios') {
      paddingOS = 64
      exitPaddingOS = 3
    }
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root'>
            <Scene key='signup'>
              <Scene key='username' leftButtonTextStyle={{marginTop: exitPaddingOS}} leftTitle={t('string_capitalize_exit')} sceneStyle={{paddingTop: paddingOS}} onLeft={this.noop} ref='usernameView' component={Username} title={'Enter Username'} initial />
              <Scene key='pin' component={PinNumber} sceneStyle={{paddingTop: paddingOS}} title={'Enter Pin'} />
              <Scene key='password' component={Password} title={'Enter Password'} sceneStyle={{paddingTop: paddingOS}} />
              <Scene key='cameraNotification' component={CameraNotification} title={'Camera Notification'} sceneStyle={{paddingTop: paddingOS}} type='reset' />
              <Scene key='contactNotification' component={ContactNotification} title={'Contact Notification'} sceneStyle={{paddingTop: paddingOS}} type='reset' />
              <Scene key='review' component={ReviewDetails} title={'Details'} sceneStyle={{paddingTop: paddingOS}} type='reset' />
            </Scene>
            <Scene key='landing' component={Landing} type='reset' initial hideNavBar />
            <Scene key='home' component={Home} hideNavBar type='reset' />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }

}

AppRegistry.registerComponent('airbitz_ui', () => App)
