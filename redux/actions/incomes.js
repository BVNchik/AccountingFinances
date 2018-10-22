import  * as API  from '../../api/index'
import INCOMES from '../consts/incomes'

export function fetchIncome() {
    return dispatch => {
        API.fetchIncome()
            .then(res => dispatch({ type: INCOMES.FETCH_INCOMES, payload: res.data.incomes }))
    }
}

export function addIncome(data) {
    return dispatch => {
        API.addIncome(data)
            .then(res => dispatch({ type: INCOMES.ADD_INCOME, payload: res.data.income}))
    }
}

