import { combineReducers } from 'redux'
import asyncReducer from './asyncReducer'
import courseReducer from './courseReducer'

export default combineReducers({
    courses:courseReducer,
    async:asyncReducer
})