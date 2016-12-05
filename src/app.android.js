import tron from './util/reactotron'
import React, { Component } from 'react'; // eslint-disable-line
import { Provider as ReduxProvider, connect } from 'react-redux'
import { AppRegistry, View, StatusBar } from 'react-native'
import configureStore from './lib/configureStore'
import t from './lib/LocaleStrings'

const Store = configureStore()

/**
 * If you're using Exponent, uncomment the line below to import Exponent
 * BEFORE importing `@exponent/ex-navigation`. This sets the status bar
 * offsets properly.
 */
// import Exponent from 'exponent';

import {
  createRouter,
  NavigationContext,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation'

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */

import Home from './modules/Home.ui'
import SignUp from './modules/SignUp.ui'
import Main from './modules/Main/Main.ui'
export const Router = createRouter(() => ({
  home: () => Home,
  signup: () => SignUp,
  main: () => Main
}))
const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
})
class App extends Component {
  render () {
    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <View style={{flex: 1}}>
        <NavigationProvider context={navigationContext}>
          <StatusBar barStyle='default' />
          <ReduxProvider store={Store}>
            <StackNavigation
              id='root'
              initialRoute={Router.getRoute('home')} />
          </ReduxProvider>
        </NavigationProvider>
      </View>
    )
  }
}
AppRegistry.registerComponent('airbitz_ui', () => App)
