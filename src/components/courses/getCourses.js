import React, { useContext, useEffect, useState, Fragment } from 'react'
import AppStoreContext from '../../contexts/AppStore'

import Course from './Course'

import InfiniteScroll from 'react-infinite-scroller'
import Spinner from '../ui/Spinner'

import coursesAPI from '../../apis/courses'
import FilterButtons from './FilterButtons'

// Each course contains a property called categories, 
// mainCatagory, subCatagroy, topic

// example:
// categories:["development","web","react"]
// 
// lookupTables is used - using computed member access operator to get the desired 'category'

const MAIN = 0
const SUB = 1
const TOPIC = 2

const lookUpTable = {
    main: 0,
    sub: 1,
    topic: 2
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))


const GetCourses = (props) => {

    const { state, dispatch } = useContext(AppStoreContext)
    const { catagory, subcatagory, topic, query } = props.match.params;

    // Not using pagination, using InfiniteScroll to display new content when user scoll. 
    const [ptr, setPtr] = useState(0)
    const [perPage] = useState(5)

    const [count, setCount] = useState({})
    const [filter, setFilter] = useState([])

    // Grab the data once mounted and/or props changes

    useEffect(() => {
        (async () => {

            dispatch({ type: "ASYNC_START" })

            await wait(700) // for development only

            // the user selected a menu item
            const response = await coursesAPI.get('/courses')

            if (query) {

                // Since we are not using a real database with all its powers, we grab all the content from our mock 'server' api
                // and do our own LIKE filtering based ONLY on the title field of each course using the string method includes (case sensitive)

                const toLowerCaseQuery = query.toLowerCase()
                // response = await coursesAPI.get('/courses') // grab the ALL courses

                // filter based on the query string
                const filtedData = response.data.reduce((acc, cur) => {
                    if (cur.title.toLowerCase().includes(toLowerCaseQuery))
                        acc.push(cur)
                    return acc
                }, [])

                // update our store state
                dispatch({ type: "FETCH_COURSES", payload: filtedData })
            }
            else {
                // otherwise, compare the corresponding porperties from props.match.params with each course categories
                const filted = response.data.filter(course => course.catagories[1] === subcatagory && course.catagories[2] === topic)
                dispatch({ type: "FETCH_COURSES", payload: filted })
            }

            setFilter([])
            dispatch({ type: "ASYNC_END" })

        })()
    }, [dispatch, catagory, subcatagory, topic, query])

    useEffect(() => {

         // Basically, tally up each of the categories e.g categories:["development","web","react"].

        const groupTally = group => state.courses.reduce((acc, { catagories }) => {
            acc[catagories[group]] = (acc[catagories[group]] || 0) + 1
            return acc
        }, {})

        setCount({
            main: groupTally(MAIN),
            sub: groupTally(SUB),
            topic: groupTally(TOPIC)
        })

    }, [state.courses, query])

    return (
        <Fragment>

            {state.loading ?
                <Spinner />
                :
                <section>
                    {
                        query ? // When a search/query is requested, display filtering choices to the user
                            <>
                                {
                                    state.courses.length > 0 ?
                                        <>
                                            <h1 className="page-heading">{`Totol of ${state.courses.length} courses for : ${query}`}</h1>
                                            {/* <FilterButtons lists={{ main:count.main, sub: count.sub, topic: count.topic }} handleClick={setFilter} selected={filter[1]} /> */}
                                            <FilterButtons lists={{ sub: count.sub, topic: count.topic }} handleClick={setFilter} selected={filter[1]} />

                                        </>
                                        :
                                        <>
                                            <div style={{ textAlign: "center", marginTop: '20rem', marginBottom: "3rem" }}>
                                                <i className="fas fa-exclamation-triangle fa-9x" style={{ color: "orangered", marginBottom: "3rem" }}></i>
                                                <h2 >OOPs...nothing found using search query : {query}</h2>
                                            </div>
                                        </>
                                }
                            </>
                            : // otherwise, the user selected an option from the main menu, just display the details regarding this menu selection. No filtering required.
                            <h1 className="page-heading">{`${subcatagory} | ${topic}  - ${state.courses.length} courses`}</h1>
                    }

                    <InfiniteScroll pageStart={1} loader={<Spinner key={0} />} loadMore={() => setPtr(ptr + perPage)} hasMore={(ptr + perPage <= state.courses.length - 1)} initialLoad={false}>
                        <ul className="courses">
                            {
                                state.courses
                                    .filter(course => course.catagories[lookUpTable[filter[0]]] === filter[1])
                                    .slice(0, ptr + perPage)
                                    .map(course => <Course course={course} key={course.id} />) // display the courses
                            }
                        </ul>
                    </InfiniteScroll>

                    <section className="section get-learning">

                        <h2 className="section__heading">Get Learning!</h2>
                        <h3 className="section__caption color--navyblue">Vestibulum ante nisl, euismod eu augue id, rhoncus pharetra urna. Mauris sit amet mi sed dolor luctus suscipit vel non enim.</h3>


                        <ul className="spotlights">
                            <li className="spotlight">
                                <i className="fas fa-hourglass-half fa-2x spotlight__icon"></i>
                                <div className="spotlight__blurb-box">
                                    <h3 className="spotlight__title">Go at your own pace</h3>
                                    <p className="spotlight__text">Enjoy lifetime access to courses on Udemy’s website and app</p>
                                    <p className="spotlight__link">More Info</p>
                                </div>
                            </li>
                            <li className="spotlight">
                                <i className="fas fa-chalkboard-teacher fa-2x spotlight__icon"></i>
                                <div className="spotlight__blurb-box">
                                    <h3 className="spotlight__title">Learn from industry experts</h3>
                                    <p className="spotlight__text">Select from top instructors around the world</p>
                                    <p className="spotlight__link">More Info</p>
                                </div>
                            </li>
                            <li className="spotlight">
                                <i className="fas fa-video fa-2x spotlight__icon"></i>
                                <div className="spotlight__blurb-box">
                                    <h3 className="spotlight__title">Find video courses on almost any topic</h3>
                                    <p className="spotlight__text">Build your library for your career and personal growth</p>
                                    <p className="spotlight__link">More Info</p>
                                </div>
                            </li>
                        </ul>

                        <div className="align--center margins--small">
                            <button className="fadeIn">Learn More</button>
                        </div>
                    </section>
                </section>

            }
        </Fragment>
    )

}

export default GetCourses