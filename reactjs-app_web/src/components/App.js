import React, { useEffect } from 'react'
import Header from './Header'
import Movies from './Movies'
import '../styles/App.css'
import { keepTheme } from './Theme'

function App() {

    useEffect(() => {
        keepTheme()
    })

    return (
        <div>
            <Header/>
            <Movies/>
        </div>
    )

}

export default App
