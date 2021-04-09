import { combineReducers } from 'redux'
import asyncReducer from './asyncReducer'
// import streamReducer from './streamReducer'

export default combineReducers({
    async:asyncReducer,
    // streams: streamReducer
})