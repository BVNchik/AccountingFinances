import * as API from '../../api/index'

export function login() {
    return dispatch => {
        let data = API.authRequest()
        dispatch({type: 'LOGIN_SUCCESS', payload: data})
    }
}