import  * as API  from '../../api/index'
import CATEGORIES from '../consts/cotegories'

export function fetchCategoriesAll() {
    return dispatch => {
        API.fetchCategoriesAll()
            .then(res => dispatch({ type: CATEGORIES.FETCH_CATEGORIES, payload: res.data.categories }))
    }
}

export function fetchCategoriesAllSum(params) {
    return dispatch => {
        API.fetchCategoriesAllSum(params)
            .then(res => dispatch({ type: CATEGORIES.FETCH_CATEGORIES_SUM, payload: res.data.categories }))
    }
}

export function addCategory(data) {
    return dispatch => {
        API.addCategory(data)
            .then(res => dispatch({ type: CATEGORIES.ADD_CATEGORY, payload: res.data }))
    }
}

export function updateCategory(categoryId, data) {
    return dispatch => {
        API.updateCategory(categoryId, data)
            .then(res => dispatch({ type: CATEGORIES.UPDATE_CATEGORY, payload: res.data }))
    }
}

export function deleteCategory(categoryId) {
    return dispatch => {
        API.deleteCategory(categoryId)
            .then(res => dispatch({ type: CATEGORIES.DELETE_CATEGORY, payload: categoryId }))
    }
}
