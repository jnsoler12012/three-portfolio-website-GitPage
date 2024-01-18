import React from 'react'
import InteractiveRouterLink from './InteractiveRouterLink';
import { Link } from 'react-router-dom';
import { arrow } from 'Icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <InteractiveRouterLink as={Link} to={link} className={'neo-brutalism-white neo-btn'}>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' />
        </InteractiveRouterLink>
    </div>
)


const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Nicolas</span>
            <br />
            A Software Engineer from Colombia
        </h1>
    ),
    2: (
        <InfoBox
            text="Worked on many projects and picked up many skills along the way"
            link='/about'
            btnText="Learn more about me"
        />
    ),
    3: (
        <InfoBox
            text="Led multiple projects to success over the years"
            link='/projects'
            btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox
            text="Need a project done or looking for a dev? I'm just a few keystrokes away"
            link='/contact'
            btnText="Let's talk"
        />
    )
}


export default function ({ currentStage }) {
    return renderContent[currentStage] || null;
}