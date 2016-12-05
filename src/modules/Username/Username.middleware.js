import async_auto from 'async/auto'

import abcContext from '../../lib/abcContext'
import { NavigationActions } from '@exponent/ex-navigation'


import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { Store, Router } from "../../app"
import t from '../../lib/LocaleStrings'
export const checkUsername = username => {
  return dispatch => {
    async_auto({
      checkUsernameLength: function (callback) {
        if (username.length >= 3) {
          callback(null, null)
        } else {
          callback(t('activity_signup_insufficient_username_message'), null)
        }
      },
      openLoading: function (callback) {
        dispatch(openLoading(t('activity_signup_checking_username')))
        callback(null, null)
      },
      getUsernameAvailability: function (callback) {
        setTimeout(() => {
          abcContext.usernameAvailable(username, function (error, available) {
            if (error) {
              callback(t('activity_signup_username_unavailable'), null)
            }
            if (!error) {
              callback(null, null)
            }
          })
        }, 500)
      }
    }, function (err, results) {
      dispatch(closeLoading())

      if (err) {
        dispatch(openErrorModal(err))
      }
      if (!err) {
        let navigatorUID = Store.getState().navigation.currentNavigatorUID;
        Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('signup', {screen: "pin"})))

      }
    })
  }
}
