import React from 'react'
import Home from '../home/home'
import HomeFilters from '../homeFilters/homeFilters'

export default function HomeRender() {
    return (
        <div className=''>
            <HomeFilters/>
            <Home/>
        </div>
    )
}
