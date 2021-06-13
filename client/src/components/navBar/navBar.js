import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div>
            <h1>Dog App</h1>
            <div className='navBar'>
                <div className='navBarOptions'><Link to='/home'>Home</Link></div>
                <div className='navBarOptions'><Link to='/createBreed' >Create Breed</Link></div>
            </div>
        </div>
    )
}
