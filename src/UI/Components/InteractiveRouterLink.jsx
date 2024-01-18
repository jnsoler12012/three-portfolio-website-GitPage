import React from 'react'
import { Interactive } from 'react-interactive'

export default function ({ as, href, to, children, className, onClick }) {
    if (href)
        return (<Interactive as={as} href={href} className={className} onClick={onClick}>
            {children}
        </Interactive>)
    else
        return (<Interactive as={as} to={to} className={className} onClick={onClick}>
            {children}
        </Interactive>)

}