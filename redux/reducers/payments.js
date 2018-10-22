import PAYMENTS from '../consts/payments'
const initialState = {
    payments: [],
    isSpinerShowPaymentsScreen: true,
}
export default function payments(state = initialState, action) {
    switch (action.type) {
        case PAYMENTS.FETCH_PAYMENTS:
            return { payments: action.payload.filter(category => category.category !== 'Other'), isSpinerShowPaymentsScreen: false }
        case PAYMENTS.ADD_PAYMENT:
            return { payments: [...state.payments, action.payload], isSpinerShowPaymentsScreen: false }
        default: return state
    }
}