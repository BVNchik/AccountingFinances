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

export function addPayment(categoryPayments, value) {
    return axios.post(baseUrl + 'payments', { category: categoryPayments, price: value })
}

export function addIncome(categoryIncomes, value) {
    return axios.post(baseUrl + 'incomes', { category: categoryIncomes, price: value })
}

export function fetchCategoriesAll(){
    return axios.get(baseUrl + 'categories')
}

export function addCategory(categoryName, type, color){
    return axios.post(baseUrl + 'categories', { category: categoryName, type: type , color: color})
}

export function updateCategory(categoryId, categoryName, color ){
    return axios.put(baseUrl + 'categories/' + categoryId, {category: categoryName, color: color })
}

export function deleteCategory(categoryId){
    return axios.delete(baseUrl + 'categories/' +  categoryId)
}

export function fetchCategoriesAllSum(month, year){
    return axios.get(baseUrl + 'categories/sum', {params: {month: month, year: year}})
}

export function authRequest(){
    return {id: 1, name: 'vasy'}
} 