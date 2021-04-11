import React, { useContext, useState, useEffect } from 'react';
import NavMenuItem from './NavMenuItem'
import AppStoreContext from '../../contexts/AppStore';
import { connect } from 'react-redux';
import { openDropDown } from '../../actions'

const actions = {
    openDropDown
}

const MainMenu = props => {

    const { openDropDown } = props

    const { state, dispatch } = useContext(AppStoreContext) 
    const [touchDevice, setTouchDevice] = useState(false)

    const onFirstTouch = () => {
        setTouchDevice(true)
    }

    useEffect(() => {

        window.addEventListener('touchstart', onFirstTouch);
        return function cleanup() {
            window.removeEventListener('touchstart', onFirstTouch)
        }
    }, []);    

    const handleClickEvent = (nav) => {
        // dispatch({type:'OPEN_DROPDOWN', payload:''})
        openDropDown('')
        dispatch({type:'SELECT_NAVIGATION', payload:nav})
        console.log("here")
        // dispatch({type:'MENUDRAW_OPENED', payload:false})
    }

    const handleTouchStart = (category) => {
        openDropDown(category)
        // return (state.openedDropDown ? dispatch({type:'OPEN_DROPDOWN', payload:''}) : dispatch({type:'OPEN_DROPDOWN', payload:category}))
        return state.openedDropDown ? openDropDown('') : openDropDown(category)

    }

    const handleUserEvent = (event, category) => {
        event.stopPropagation()
        openDropDown(category)
        // dispatch({type:'OPEN_DROPDOWN', payload:category})
        console.log("there")

    }

        const { nav } = props

        const actions = {
            handleClickEvent,
            handleTouchStart,
            handleUserEvent,
        }

        return (

            <nav id="mainNav" className={`overlay ${props.isMenuDrawOpened? "opened" : "closed"}`}  >
                <div className="overlay-content">
                    <ul
                        className={`navigation ${!touchDevice ? "non-touch" : ""}`}
                    >
                        {
                            Object.keys(nav).map(key => {
                                return <NavMenuItem key={key} category={key} menuItem={nav[key]} actions={actions}/>
                            })
                        }
                    </ul>
                </div>
            </nav>

        )
}

const mapStateToProps = state => {
    return {
        dropDown:state.menu
    }
}



export default connect(mapStateToProps,actions)(MainMenu)
