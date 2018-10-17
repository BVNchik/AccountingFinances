import { combineReducers } from 'redux';
import users from './users'
import payments from './payments'
import incomes from './incomes'
import categories from './categories'

export const rootReducer = combineReducers({
    users,
    categories,
    payments,
    incomes
})