import React, { useEffect, useState } from 'react'
import InteractiveRouterLink from './InteractiveRouterLink'
import { Link } from 'react-router-dom'

export default function () {
    const [selected, setSelected] = useState(window.location.href.split('/'));
    const checkRouteIsPresent = (to) => {

        const toString = to.split('/')[1]

        const finalStringRoute = window.location.href.split('/')


        //console.log(toString, '-separator-', finalStringRoute[finalStringRoute.length - 1], (toString === finalStringRoute[finalStringRoute.length - 1]))
        //console.log(window.location.href, to, toString === finalStringRoute[finalStringRoute.length - 1]);
        return (toString === finalStringRoute[finalStringRoute.length - 1])
    }

    return (
        <header className="header">
            <InteractiveRouterLink as={Link} to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md" onClick={() => setSelected('')}>
                <p className="blue-gradient_text" >AH</p>
            </InteractiveRouterLink>
            <nav className="flex text-lg gap-7 font-medium">
                <InteractiveRouterLink as={Link} to="/about" className={`${checkRouteIsPresent("/about") ? 'text-blue-500' : 'text-black'}`} onClick={() => setSelected('about')}>
                    About
                </InteractiveRouterLink>
                <InteractiveRouterLink as={Link} to="/projects" className={`${checkRouteIsPresent("/projects") ? 'text-blue-500' : 'text-black'}`} onClick={() => setSelected('projects')}>
                    Projects
                </InteractiveRouterLink>
                <InteractiveRouterLink as={Link} to="/contact" className={`${checkRouteIsPresent("/contact") ? 'text-blue-500' : 'text-black'}`} onClick={() => setSelected('contact')}>
                    Contact
                </InteractiveRouterLink>
            </nav>
        </header>
    )
}