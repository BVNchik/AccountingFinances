import { createSelector } from 'reselect'

const categoriesSelector = state => state.categories
const spinerSelector = state => state.isSpinerShow

export const filteredCategoriesForIncomes = createSelector(
    categoriesSelector,
    spinerSelector,
    (categories, isSpinerShow) => (isSpinerShow ?  ([]): (categories.filter(category => category.name !== 'Other' && category.type_of_pay === "income")))
)