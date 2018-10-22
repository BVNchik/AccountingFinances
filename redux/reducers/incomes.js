import INCOMES from '../consts/incomes'
const initialState = {
    incomes: [],
    isSpinerShowIncomesScreen: true,
}

export default function incomes(state = initialState, action) {
    switch (action.type) {
        case INCOMES.FETCH_INCOMES:
            return { incomes: action.payload.filter(category => category.category !== 'Other'), isSpinerShowIncomesScreen: false }
        case INCOMES.ADD_INCOME:
            return  { incomes: [...state.incomes, action.payload], isSpinerShowIncomesScreen: false }
        default: return state
    }
}