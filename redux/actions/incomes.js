import  * as API  from '../../api/index'

export function fetchIncome() {
    return dispatch => {
        API.fetchIncome()
            .then(res => dispatch({ type: 'FETCH_INCOMES', payload: res.data.incomes }))
    }
}

export function addIncome(data) {
    return dispatch => {
        API.addIncome(data)
            .then(res => dispatch({ type: 'ADD_INCOME', payload: res.data.income}))
    }
}

