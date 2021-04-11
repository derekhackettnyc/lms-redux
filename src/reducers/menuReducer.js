import { OPEN_DROPDOWN } from '../actions/types'
// const INITIAL_STATE = {
//     loading:false,
//     courses:[]
// }
export default (state = '', action) => {
// export default (state=false, action) => {

    switch (action.type) {
        case OPEN_DROPDOWN:
            return action.payload             
        default:
            return state
    }

}