import  * as API  from '../../api/index'

export function login () {
    return dispatch => {
       API.authRequest()
          .then(res => dispatch({type: 'LOGIN_SUCCESS', payload: res}))
    }
}