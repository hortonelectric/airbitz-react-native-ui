import { combineReducers } from 'redux'

import { NavigationReducer } from '@exponent/ex-navigation'
import { username } from '../modules/Username/Username.reducer'
import { pinNumber } from '../modules/PinNumber/PinNumber.reducer'
import { loading } from '../modules/Loader/Loader.reducer'
import { nextButtonVisible } from '../modules/NextButton/NextButton.reducer'
import { skipButtonVisible } from '../modules/SkipButton/SkipButton.reducer'
import * as PasswordStates from '../modules/Password/Password.reducer'
import { reviewDetails } from '../modules/ReviewDetails/ReviewDetails.reducer'
import * as PasswordValidation from '../modules/Password/PasswordValidation/PasswordValidation.reducer'
import * as Loader from '../modules/Loader/Loader.reducer'
import * as ErrorModal from '../modules/ErrorModal/ErrorModal.reducer'
import * as Login from '../modules/Login/Login.reducer'
const store = combineReducers({
  navigation: NavigationReducer,
  username,
  pinNumber,
  loading,
  password: combineReducers({
    inputState: PasswordStates.inputState,
    password: PasswordStates.password,
    passwordRepeat: PasswordStates.passwordRepeat,
    notification: PasswordStates.notification,
    validation: combineReducers({
      upperCaseChar: PasswordValidation.upperCaseChar,
      lowerCaseChar: PasswordValidation.lowerCaseChar,
      number: PasswordValidation.number,
      characterLength: PasswordValidation.characterLength
    })
  }),
  reviewDetails,

  login: combineReducers({
    view: Login.view,
    username: Login.username,
    password: Login.password,
    pin: Login.pin
  }),

  nextButtonVisible,
  skipButtonVisible,
  loader: combineReducers({
    loading: Loader.loading,
    message: Loader.message
  }),
  errorModal: combineReducers({
    visible: ErrorModal.visible,
    message: ErrorModal.message
  })
})

export default store
