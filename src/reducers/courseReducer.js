import { FETCH_COURSES, FILTER_COURSES } from '../actions/types'


// const INITIAL_STATE = {
//     loading:false,
//     courses:[]
// }
export default (state = [], action) => {
// export default (state=false, action) => {

    switch (action.type) {
        case FETCH_COURSES:
            return action.payload  
        case FILTER_COURSES:
            return action.payload               
        default:
            return state
    }

}

// import { FETCH_COURSES } from '../actions/types'

// export const INITIAL_STATE = {
//     courses: [],
//     loading: false,
//     menuDrawOpened: false,
//     navigation: null,
//     openDropDown: '',
// }


// export default (state=[], { type, payload }) => {
//     switch (type) {
//         case FETCH_COURSES: {
//             console.log("fetching..........")
//             return {
//                 ...state,
//                 // menuDrawOpened: false,
//                 courses: payload,
//             }
//         }
//         default:
//             return state 

//     }
// }

// export default (state = [], action) => {
//     console.log("ACTION",action)
//     switch (action.type) {
//         case FETCH_COURSES:
//             console.log("fetch courses")
//             return {
//                 ...state,
//                 courses:action.payload
//             }
//         default:
//             console.log("fetch default")
//             return state
//     }

// }

