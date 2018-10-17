import { fetchIncome, addIncome } from '../../components/api/api'

export function fetchIncomes() {
    return dispatch => {
        fetchIncome()
            .then(res => dispatch({ type: 'FETCH_INCOMES', payload: res.data.incomes }))
    }
}

export function addIncomes(categoryName, value) {
    return dispatch => {
        addIncome(categoryName, value)
            .then(res => dispatch({ type: 'ADD_INCOME', payload: res.data.income}))
    }
}

