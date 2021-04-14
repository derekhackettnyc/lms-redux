import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NavMenuItem from './NavMenuItem'
import { openDropDown } from '../../actions'


const MainMenu = ({ nav,  dropDown }) => {

    const isMenuDrawOpened = useSelector( state => state.menu.isDrawOpened )
    const dispatch = useDispatch()

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

    const handleClickEvent = () => {
        dispatch(openDropDown(''))
    }

    const handleTouchStart = (category) => {
        dispatch(openDropDown(category))
        // return dropDown ? openDropDown('') : openDropDown(category)
    }

    const handleUserEvent = (event, category) => {
        event.stopPropagation()
        dispatch(openDropDown(category))
    }

        const actions = {
            handleClickEvent,
            handleTouchStart,
            handleUserEvent,
        }

        return (

            <nav id="mainNav" className={`overlay ${isMenuDrawOpened? "opened" : "closed"}`}  >
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

export default MainMenu
