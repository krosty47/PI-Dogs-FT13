import React from 'react'
import { Link } from 'react-router-dom'

import '../initialWelcomePage/initialWelcomePage.css'

export default function InitialWelcomePage () {
    return (
        <center className='allWelcome'>

                <h1 className='welcomeTitle'>wanna aDOGt?</h1>

                <div className='welcomeImage'></div>

                <div className='welcomeInfo1'>All the information you need before addopting a dog.</div>

                <div className='welcomeLink'>
                <Link className='Btext' to='/home'>
                    <button className='welButton' type="button" >SHOW ME MORE</button>
                    </Link>
                </div>


        </center>
    )
}
