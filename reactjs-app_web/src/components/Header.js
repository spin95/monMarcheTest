import React, { useEffect, useState } from 'react'
import DarkModeToggle from "react-dark-mode-toggle"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Header.css'
import { setTheme } from './Theme'

function Header() {

    const [togClass, setTogClass] = useState('light')
    let theme = localStorage.getItem('theme');
    const [isDarkMode, setIsDarkMode] = useState(() => true)

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
            setIsDarkMode(true)
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setIsDarkMode(false)
            setTogClass('light')
        }
    }, [theme])

    // change the theme (dark/light) on click
    const changeTheme = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setIsDarkMode(true)
            setTheme('theme-light')
            setTogClass('light')
        } else {
            setIsDarkMode(false)
            setTheme('theme-dark')
            setTogClass('dark')
        }
    }

    return (
        <div className="headerTheme">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="headerTitle">
                        Movies
                    </div>
                </div>
                <div className="col-3">
                    <DarkModeToggle
                        onChange={changeTheme}
                        checked={isDarkMode}
                        size={60}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
