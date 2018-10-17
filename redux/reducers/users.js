const initialState = [
    user1 = {},
    user2={}
]

export default function users (state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [action.payload]
        default: return state
    }
}