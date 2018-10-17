const initialState = {
    payments: [],
    isSpinerShowPaymentsScreen: true,
}
export default function payments(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PAYMENTS':
            return {payments: action.payload, isSpinerShowPaymentsScreen: false }
        case 'ADD_PAYMENT':
            return  {payments: [...state.payments, action.payload] ,  isSpinerShowPaymentsScreen: false }
        default: return state
    }
}