import React from 'react'
import { Link } from 'react-router-dom'
import InteractiveRouterLink from './InteractiveRouterLink'

export default function () {
    return (
        <section className="cta">
            <p className="cta-text">Have a project in mind?<br className="sm:block hidden" />
                Let's build something together! </p>
            <InteractiveRouterLink as={Link} to="/contact" className="btn">
                Contact
            </InteractiveRouterLink>
        </section>
    )
}