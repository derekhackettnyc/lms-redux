import coursesAPI from '../apis/courses'
import { ASYNC_START, ASYNC_END, ASYNC_ERROR, FETCH_COURSES, FILTER_COURSES, OPEN_DROPDOWN } from './types'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))


// Action creators for async operations
export const asyncStart = () => ({type:ASYNC_START})
export const asyncEnd = () => ({type:ASYNC_END })
export const asyncError = () => ({type:ASYNC_ERROR })

export const fetchCourses = (subcategory, topic) => async dispatch => {

    // This action creator is called when a menu item is selected. 

    dispatch(asyncStart())
    await wait(700) // for development only
    const response = await coursesAPI.get('/courses')
    const filterData = response.data.filter(course => course.catagories[1] === subcategory && course.catagories[2] === topic)
    dispatch({ type: FETCH_COURSES, payload: filterData})
    dispatch(asyncEnd())
}

export const filterCourses = (query) => async dispatch => {

    // This action creator is called when the user enters a query into the search bar

    dispatch(asyncStart())

    await wait(700) // for development only
    const response = await coursesAPI.get(`/courses?title_like=${query}`)
    dispatch({ type: FILTER_COURSES, payload: response.data})

    dispatch(asyncEnd())
}



export const openDropDown = (category) => {
    return{
        type:OPEN_DROPDOWN,
        payload: category
}
}

// export const filterCourses = () => async dispatch => {
//     const response = await coursesAPI.get('/courses')
//     dispatch({ type: FETCH_COURSES, payload: response.data})
// }

// export const fetchCourses = () => async dispatch => {
//     try {

//         console.log("SSDSDSDSDSDSDSDSD")
//         const response = await coursesAPI.get('/courses')

//         // dispatch(asyncStart())
//         // const events = await fetchSampleData()
//         // dispatch({ type: FETCH_EVENTS, payload: events })
//         // dispatch(asyncEnd())
//     } catch (error) {
//         console.log("ERROR", error)
//         // dispatch(asyncError())

//     }
// }

// export const fetchCourses = () => {
//     console.log("SSDSDSDSDSDSDSDSD")
// }
// export const fetchCourses = () => async dispatch => {

//     console.log("AAAAAAAaaaa")

//     const response = await coursesAPI.get('/courses')
//     console.log("response,data !!!",response.data)
//     dispatch({ type: FETCH_COURSES, payload: response.data})

// }

// export const fetchCourses = () => async dispatch => {
//     const response = await coursesAPI.get('/courses')
//     dispatch({ type: FETCH_COURSES, payload: response.data})
// }

// export const filterCourses = (query) => async dispatch => {
//     const response = await coursesAPI.get('/courses')
//     dispatch({ type: FETCH_COURSES, payload: response.data})
// }

// export const fetchCourses = async () => {

//     // console.log("AAAAAAAaaaa")

//     const response = await coursesAPI.get('/courses')
//     console.log("response,data !!!",response.data)
//     return { 
//         type: FETCH_COURSES, 
//         payload: response.data
//     }
 

// }

// export const fetchResources = () => async dispatch => {
//     try {

//         dispatch(asyncStart())
//         const events = await fetchSampleData()
//         dispatch({ type: FETCH_EVENTS, payload: events })
//         dispatch(asyncEnd())
//     } catch (error) {
//         console.log("ERROR", error)
//         dispatch(asyncError())

//     }
// }




// export const fetchStreams = () => async dispatch => {
//     const response = await streams.get(`/streams`)
//     dispatch({ type: FETCH_STREAMS, payload: response.data})
// }

// export const fetchStream = id => async dispatch => {
//     const response = await streams.get(`/streams/${id}`)
//     dispatch({type:FETCH_STREAM, payload:response.data})
// }

// export const editStream = (id, formValues )=> async dispatch => {
//     const response = await streams.patch(`/streams/${id}`, formValues)
//     dispatch({type:EDIT_STREAM, payload:response.data})
//     history.push('/')
// }

// export const deleteStream = id => async dispatch => {
//     await streams.delete(`/streams/${id}`)
//     dispatch({type:DELETE_STREAM, payload:id})
//     history.push('/')
// }