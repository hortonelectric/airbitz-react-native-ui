import async_auto from 'async/auto'

import abcContext from '../../lib/abcContext'

import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

import t from '../../lib/LocaleStrings'

export const loginWithPassword = (username,password) => {

  return dispatch => {
    async_auto({
      openLoading: function (callback) {
        dispatch(openLoading('Logging-in'))
        callback(null, null)
      },
      getUsernameAvailability: function (callback) {
        setTimeout(() => {
			  console.log('before call')
          abcContext.loginWithPassword(username, password, null, null, (error, account) => {
			  console.log('after call')
            if (error) {
			  console.log(error)
              callback('Error on login sample', null)
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

        dispatch(openErrorModal("Login Successfully"))
      }
    })
  }

}
