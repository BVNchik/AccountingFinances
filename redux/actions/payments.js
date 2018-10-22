import * as API from '../../api/index'
import PAYMENTS from '../consts/payments'

export function fetchPayment() {
    return dispatch => {
        API.fetchPayment()
            .then(res =>
                dispatch({ type: PAYMENTS.FETCH_PAYMENTS, payload: res.data.payments }))
    }
}

export function addPayment(data) {
    return dispatch => {
        API.addPayment(data)
            .then(res => dispatch({ type: PAYMENTS.ADD_PAYMENT, payload: res.data.payment }))
    }
}

