import { fetchPayment, addPayment } from '../../components/api/api'

export function fetchPayments() {
    return dispatch => {
        fetchPayment()
            .then(res => dispatch({ type: 'FETCH_PAYMENTS', payload: res.data.payments }))
    }
}

export function addPayments(categoryName, value) {
    return dispatch => {
        addPayment(categoryName, value)
            .then(res => dispatch({ type: 'ADD_PAYMENT', payload: res.data.payment }))
    }
}

