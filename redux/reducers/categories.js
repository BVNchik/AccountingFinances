const initialState = {
    categories: [],
    categoriesSum: [],
    isSpinerShowChartsScreen: true,
    isSpinerShow: true,
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_CATEGORIES':
            return { ...state, categories: action.payload, isSpinerShow: false }
        case 'FETCH_CATEGORIES_SUM':
            return { ...state, categoriesSum: action.payload, isSpinerShowChartsScreen: false }
        case 'ADD_CATEGORY':
            return addCategory(state, action.payload)
        case 'UPDATE_CATEGORY':
            return updateCategory(state, action.payload)
        case 'DELETE_CATEGORY':
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