import { createSelector } from 'reselect'

const paymentsSelector = state => state.payments

export const mapCategoriesForPaymentsPrice = createSelector(
    paymentsSelector,
    payments => payments.map(payment => { return { id: payment.id.toString(), category: payment.category, value: payment.price } })
)