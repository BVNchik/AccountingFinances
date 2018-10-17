import  * as API  from '../../api/index'
export function fetchPayment() {
    return dispatch => {
        API.fetchPayment()
            .then(res => dispatch({ type: 'FETCH_PAYMENTS', payload: res.data.payments }))
    }
}

export function addPayment(data) {
    return dispatch => {
        API.addPayment(data)
            .then(res => dispatch({ type: 'ADD_PAYMENT', payload: res.data.payment }))
    }
}

