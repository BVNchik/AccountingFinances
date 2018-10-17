import { authRequest } from '../../components/api/api'

export function login () {
    return dispatch => {
        let data = authRequest()
        dispatch({type: 'LOGIN_SUCCESS', payload: data})
    }
}