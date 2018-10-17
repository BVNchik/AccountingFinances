import { createSelector } from 'reselect'

const categoriesSelector = state => state.categories.categoriesSum
const spinerSelector = state => state.categories.isSpinerShowChartsScreen

export const filteredCategoriesForChartsPayments = createSelector(
    categoriesSelector,
    spinerSelector,
    (categories, isSpinerShow) => (isSpinerShow ? ([]) : (categories.filter(category => category.type_of_pay === "payment" && category.sum !== 0)))
)

export const filteredCategoriesForChartsIncomes = createSelector(
    categoriesSelector,
    spinerSelector,
    (categories, isSpinerShow) => (isSpinerShow ? ([]) : (categories.filter(category => category.type_of_pay === "income" && category.sum !== 0)))
)