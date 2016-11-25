import * as ACTION from './action'

export const username = (state = null, action) => {

	switch (action.type) {
		case ACTION.CHANGE_USERNAME_VALUE :
			return action.data

		default:      
			return state
	}

}
