import React from 'react'
import { Link } from 'react-router-dom'

import '../initialWelcomePage/initialWelcomePage.css'

export default function InitialWelcomePage () {
    return (
        <div className='allWelcome'>

                <h1 className='welcomeTitle'>Wanna aDOGt?</h1>

                <div class="welcomeImage" ></div>
                <div className='welcomeInfo1'>All the information you need before addopting a dog.</div>

                <Link className='Btext' to='/home'>
                    <button className='welButton' type="button" >PLEASE I WANT TO KNOW !</button>
                    </Link>

        </div>
    )
}
