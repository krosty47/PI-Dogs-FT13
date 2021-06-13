import React from 'react'
import { Link } from 'react-router-dom';

import '../navBar/navBar.css'

export default function NavBar() {
    return (
        <div className='navBar'>
            <div className='navTitle' >Wanna aDOGt?</div>
            <div className='navTotal'>
                <div className='navHome'>
                <Link to='/home'>
                    <button className='navHomeB' type="button" >HOME</button>
                </Link>
                </div>
                <div className='navCreate'>
                <Link  to='/createBreed' >
                    <button className='navCreateB' type="button" >CREATE BREED</button>
                </Link>
                </div>
            </div>
        </div>
    )
}
