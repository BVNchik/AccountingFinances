import { createSelector } from 'reselect'

const categoriesSelector = state => state.categories

export const filteredCategoriesForIncomes = createSelector(
    categoriesSelector,
    categories => categories.filter(category => category.name !== 'Other' && category.type_of_pay === "income")
)