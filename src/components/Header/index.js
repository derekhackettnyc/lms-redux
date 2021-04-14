import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
import { useDispatch, useSelector } from "react-redux"

import { menuDrawOpened } from '../../actions'
import MainMenu from '../Nav/MainMenu'
import SearchBar from '../ui/SearchBar'

const Header = ({ nav }) => {

    const isMenuDrawOpened = useSelector( state => state.menu.isDrawOpened )
    const dispatch = useDispatch()

    return (
        <header className="header">
            <Link className="" to="/">
                <img src="/assets/images/logo.png" alt="Star Logo" />
            </Link>
            <div

                onClick={() => dispatch(menuDrawOpened(!isMenuDrawOpened))}
                className={isMenuDrawOpened ? "menu-icon-container change" : "menu-icon-container"}
            >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            <SearchBar />
            <MainMenu nav={nav} />
        </header>
    )
}


// export default connect(mapStateToProps, { menuDrawOpened })(Header)
export default Header