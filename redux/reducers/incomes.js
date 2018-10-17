const initialState = {
    incomes: [],
    isSpinerShowIncomesScreen: true,
}

export default function incomes(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_INCOMES':
            return { incomes: action.payload, isSpinerShow: false }
        case 'ADD_INCOMES':
            return { incomes: [...state.incomes, action.payload], isSpinerShowIncomesScreen: false }
        default: return state
    }
}