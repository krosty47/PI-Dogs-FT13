import React from 'react'
import Home from '../home/home'
import HomeFilters from '../homeFilters/homeFilters'

import '../homeRender/homeRender.css'

export default function HomeRender() {
    return (
        <div className='homeRender'>
            <HomeFilters/>
            <Home/>
        </div>
    )
}
