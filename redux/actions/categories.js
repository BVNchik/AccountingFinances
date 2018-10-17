import { addCategory, updateCategory, deleteCategory, fetchCategoriesAll, fetchCategoriesAllSum } from '../../components/api/api'

export function fetchCategories() {
    return dispatch => {
        fetchCategoriesAll()
            .then(res => dispatch({ type: 'FETCH_CATEGORIES', payload: res.data.categories }))
    }
}

export function fetchCategoriesSum(month, year) {
    return dispatch => {
        fetchCategoriesAllSum(month, year)
            .then(res => dispatch({ type: 'FETCH_CATEGORIES_SUM', payload: res.data.categories }))
    }
}

export function addCategorys(categoryName, type, color) {
    return dispatch => {
        addCategory(categoryName, type, color)
            .then(res => dispatch({ type: 'ADD_CATEGORY', payload: res.data }))
    }
}

export function updateCategorys(categoryId, categoryName, newColor) {
    return dispatch => {
        updateCategory(categoryId, categoryName, newColor)
            .then(res => dispatch({ type: 'UPDATE_CATEGORY', payload: res.data }))
    }
}

export function deleteCategorys(categoryId) {
    return dispatch => {
        deleteCategory(categoryId)
            .then(res => dispatch({ type: 'DELETE_CATEGORY', payload: categoryId }))
    }
}
