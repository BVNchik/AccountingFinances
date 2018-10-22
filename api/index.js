

import axios from 'axios';
const baseUrl = 'https://financial-calculator-backend.herokuapp.com/api/v1/'

export function fetchCategoriesPayments() {
    return axios.get(baseUrl + 'categories/payment')
}

export function fetchCategoriesIncomes() {
    return axios.get(baseUrl + 'categories/income')
}

export function fetchCategories() {
    return axios.get(baseUrl + 'categories')
}

export function fetchPayment() {
    return axios.get(baseUrl + 'payments')
}
export function fetchIncome() {
    return axios.get(baseUrl + 'incomes')
}

export function addPayment(data) {
    return axios.post(baseUrl + 'payments', data)
}

export function addIncome(data) {
    return axios.post(baseUrl + 'incomes', data)
}

export function fetchCategoriesAll(){
    return axios.get(baseUrl + 'categories')
}

export function addCategory(data){
    return axios.post(baseUrl + 'categories', data)
}

export function updateCategory(categoryId, data){
    return axios.put(baseUrl + 'categories/' + categoryId, data)
}

export function deleteCategory(categoryId){
    return axios.delete(baseUrl + 'categories/' +  categoryId)
}

export function fetchCategoriesAllSum(params){
    return axios.get(baseUrl + 'categories/sum',{ params})
}

export function authRequest(){
    return {id: 1, name: 'vasy'}
} 
// import axios from 'axios';
// export const api = axios.create({
//     baseUrl: 'https://financial-calculator-backend.herokuapp.com/api/v1/'
// })

// export function fetchCategoriesPayments() {
//     return api.get('categories/payment')
// }

// export function fetchCategoriesIncomes() {
//     return api.get('categories/income')
// }

// export function fetchCategories() {
//     return api.get('categories')
// }

// export function fetchPayment() {
//     return api.get('payments')
// }
// export function fetchIncome() {
//     return api.get('incomes')
// }

// export function addPayment(data) {
//     return api.post('payments', data)
// }

// export function addIncome(data) {
//     return api.post('incomes', data)
// }

// export function fetchCategoriesAll() {
//     return api.get('categories')
// }

// export function addCategory(data) {
//     return api.post('categories', data)
// }

// export function updateCategory(categoryId, data) {
//     return api.put('categories/' + categoryId, data)
// }

// export function deleteCategory(categoryId) {
//     return api.delete('categories/' + categoryId)
// }

// export function fetchCategoriesAllSum(params) {
//     return api.get('categories/sum', { params })
// }

// export function authRequest() {
//     return { id: 1, name: 'vasy' }
// } 