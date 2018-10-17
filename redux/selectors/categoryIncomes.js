import { createSelector } from 'reselect'

const categoriesSelector = state => state.incomes

export const mapCategoriesForIncomesPrice = createSelector(
    categoriesSelector,
    categories => categories.map(category => { return { id: category.id.toString(), category: category.name, value: category.price } })
)