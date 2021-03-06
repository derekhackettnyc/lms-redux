import coursesAPI from '../apis/courses'
import { wait } from '../components/utils'

import { ASYNC_START, ASYNC_END, FETCH_COURSES, FILTER_COURSES, OPEN_DROPDOWN, MENUDRAW_OPENED } from './types'

// actions creators

export const fetchCourses = (topic) => async dispatch => {

    // This action creator is called when a menu item is selected. 

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only

    const response = await coursesAPI.get(`/courses?catagories_like=${topic}`)
    dispatch({ type: FETCH_COURSES, payload: response.data})
    dispatch(asyncEnd())
}


export const filterCourses = (query) => async dispatch => {

    // This action creator is called when the user enters a query into the search bar
    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only

    const response = await coursesAPI.get(`/courses?title_like=${query}`)
    dispatch({ type: FILTER_COURSES, payload: response.data})

    dispatch(asyncEnd())
}


export const openDropDown = category => ({
        type:OPEN_DROPDOWN,
        payload: category
})


export const menuDrawOpened = flag => ({
    type: MENUDRAW_OPENED,
    payload:flag
})


// Action creators for async operations
export const asyncStart = () => ({type:ASYNC_START})
export const asyncEnd = () => ({type:ASYNC_END })

