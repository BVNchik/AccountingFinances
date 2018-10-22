const initialState = [
    user1 = {}
]

export default function users (state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {user1: action.payload}  
        default: return state
    }
}