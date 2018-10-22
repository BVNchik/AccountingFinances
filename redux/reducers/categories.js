import CATEGORIES from '../consts/cotegories'

const initialState = {
    categories: [],
    categoriesSum: [],
    isSpinerShowChartsScreen: true,
    isSpinerShow: true,
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES.FETCH_CATEGORIES:
            return { ...state, categories: action.payload, isSpinerShow: false }
        case CATEGORIES.FETCH_CATEGORIES_SUM:
            return { ...state, categoriesSum: action.payload, isSpinerShowChartsScreen: false }
        case CATEGORIES.ADD_CATEGORY:
            return addCategory(state, action.payload)
        case CATEGORIES.UPDATE_CATEGORY:
            return updateCategory(state, action.payload)
        case CATEGORIES.DELETE_CATEGORY:
            return deleteCategory(state, action.payload)
        default: return state
    }
}

const deleteCategory = (state, categoryId) => {
    return { ...state, categories: state.categories.filter(category => category.id !== categoryId) }
}

const updateCategory = (state, categorys) => {
    return { ...state, categories: [categorys.category, ...state.categories.filter(category => category.id !== categorys.category.id)] }
}

const addCategory = (state, categorys) => {
    return { ...state, categories: [categorys.category, ...state.categories] }
}