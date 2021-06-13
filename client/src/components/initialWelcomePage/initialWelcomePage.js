import React from 'react'
import { Link } from 'react-router-dom'

import '../initialWelcomePage/initialWelcomePage.css'

export default function InitialWelcomePage () {
    return (
        <center className='allWelcome'>

                <h1 className='welcomeTitle'>wanna aDOGt</h1>

                <div className='welcomeImage'></div>

                <p className='welcomeInfo1'>All the information you need before addopting a dog</p>

                <div className='welcomeLink'>
                <Link to='/home'>SHOW ME MORE</Link>
                </div>

        </center>
    )
}
