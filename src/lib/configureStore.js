/* eslint-disable global-require */
/* eslint-disable no-undef */

import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

let middleware = [thunk]

if (__DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant')()
  const createLogger = require('redux-logger')

  const logger = createLogger({ collapsed: true })
  middleware = [...middleware, reduxImmutableStateInvariant, logger]
} else {
  middleware = [...middleware]
}

export default function configureStore (initialState) {
  const createStoreWithNavigation = createNavigationEnabledStore({
    createStore,
    navigationStateKey: 'navigation',
  });

  return createStoreWithNavigation(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}


