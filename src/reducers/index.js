import { combineReducers } from 'redux'
import asyncReducer from './asyncReducer'
import courseReducer from './courseReducer'
import menuReducer from './menuReducer'

export default combineReducers({
    courses: courseReducer,
    async: asyncReducer,
    menu: menuReducer
})