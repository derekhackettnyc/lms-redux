import { ASYNC_START, ASYNC_END, ASYNC_ERROR } from '../actions/types'


const INITIAL_STATE = {
    loading:false,
    name:null
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                loading: true,
                name:action.payload
            }
        case ASYNC_END:
            return {
                ...state,
                loading: false,
                name:null
            }
        case ASYNC_ERROR:
            return {
                ...state,
                loading: false,
                name:null
            }
        default:
            return state
    }

}
