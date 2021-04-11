import React from 'react'
import { connect } from 'react-redux'
import { asyncStart, asyncEnd, fetchCourses } from '../../actions'


class Test extends React.Component {

    componentDidMount() {
        this.props.fetchCourses()
    }

    render() {

        console.log('COURSES',this.props.courses)

        return(<div>BLAH</div>)
    }
}

const mapStateToProps = state => {
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps, {fetchCourses})(Test)