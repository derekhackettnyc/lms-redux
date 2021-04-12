import { FETCH_COURSES, FILTER_COURSES } from '../actions/types'

export default (state = [], action) => {

    switch (action.type) {
        case FETCH_COURSES:
            return action.payload  
        case FILTER_COURSES:
            return action.payload               
        default:
            return state
    }

}