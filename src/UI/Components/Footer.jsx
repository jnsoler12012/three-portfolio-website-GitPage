import React from 'react'
import InteractiveRouterLink from './InteractiveRouterLink';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../Application/staticData';

export default function () {
    return (
        <footer className='footer font-poppins'>
            <hr className='border-slate-200' />

            <div className='footer-container'>
                <p>
                    © 2023 <strong>Nicolas Soler</strong>. All rights reserved.
                </p>

                <div className='flex gap-3 justify-center items-center'>
                    {socialLinks.map((link) => (
                        <a key={link.name} target='_blank' href={link.link} className="btn">
                            <img
                                src={link.iconUrl}
                                alt={link.name}
                                className='w-6 h-6 object-contain'
                            />
                        </a>

                    ))}
                </div>
            </div>
        </footer>
    );
}