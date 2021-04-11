import { ASYNC_START, ASYNC_END, ASYNC_ERROR, FETCH_COURSES } from '../actions/types'


const INITIAL_STATE = {
    loading:false,
}
export default (state = INITIAL_STATE, action) => {
// export default (state=false, action) => {

    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                loading: true,
            }
        case ASYNC_END:
            return {
                ...state,
                loading: false,
            }
        case ASYNC_ERROR:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }

}
