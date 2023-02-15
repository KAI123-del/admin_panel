"use client"; //this is a client component

import React, { useState, useRef } from 'react'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import { IoMdAnalytics } from 'react-icons/io'
import { FaGlobeAmericas } from 'react-icons/fa'
import { MdWorkspacesFilled } from 'react-icons/md'

function Sidebar() {
    const sidebarRef = useRef()
    const homeRef = useRef()
    const analyticsRef = useRef()
    const globeRef = useRef()
    const workspaceRef = useRef()
    const settingRef = useRef()

    // IF PIN FUNCTIONALITY IS REQUIRED
    const [isPinned, setIsPinned] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)


    // FUNCTION TO DEAL WITH SIDEBAR SMOOTH REVEAL
    const startSmoothReveal = () => {
        // sidebar smooth slide
        sidebarRef.current.style.animation = 'Reveal 0.8s ease-in-out forwards';

        // home icon text reveal
        homeRef.current.style.fontFamily = 'josefinRegular';
        homeRef.current.style.color = 'white';
        homeRef.current.style.letterSpacing = '0.2rem';
        homeRef.current.style.fontSize = '1rem';
        homeRef.current.style.animation = 'textReveal 0.8s ease-in-out forwards';

        // analytics icon text reveal
        analyticsRef.current.style.fontFamily = 'josefinRegular';
        analyticsRef.current.style.color = 'white';
        analyticsRef.current.style.letterSpacing = '0.2rem';
        analyticsRef.current.style.fontSize = '1rem';
        analyticsRef.current.style.animation = 'textReveal 0.8s ease-in-out forwards';

        // Explore icon text reveal
        globeRef.current.style.fontFamily = 'josefinRegular';
        globeRef.current.style.color = 'white';
        globeRef.current.style.letterSpacing = '0.2rem';
        globeRef.current.style.fontSize = '1rem';
        globeRef.current.style.animation = 'textReveal 0.8s ease-in-out forwards';

        // workspace icon text reveal
        workspaceRef.current.style.fontFamily = 'josefinRegular';
        workspaceRef.current.style.color = 'white';
        workspaceRef.current.style.letterSpacing = '0.2rem';
        workspaceRef.current.style.fontSize = '1rem';
        workspaceRef.current.style.animation = 'textReveal 0.8s ease-in-out forwards';

        // setting icon text reveal
        settingRef.current.style.fontFamily = 'josefinRegular';
        settingRef.current.style.color = 'white';
        settingRef.current.style.letterSpacing = '0.2rem';
        settingRef.current.style.fontSize = '1rem';
        settingRef.current.style.animation = 'textReveal 0.8s ease-in-out forwards';

        setIsRevealed(true)


    }

    // FUNCTION TO DEAL WITH SIDEBAR END ANIMATIONS
    const endSmoothReveal = () => {
        sidebarRef.current.style.animation = 'endReveal 0.8s ease-in-out forwards';
        setIsRevealed(false)

    }

    return (
        <div ref={sidebarRef} onMouseOut={endSmoothReveal} onMouseOver={startSmoothReveal} className='w-[6%] h-[100%] bg-[#0c4bcc] flex flex-col justify-start items-center  sticky top-0'>

            <p className='text-[2.4rem] text-white mt-[1rem] '>
                <HiBars3BottomLeft />
            </p>

            {/* ICONS GOES HERE */}

            <p className='text-[2.4rem] px-[1rem] py-[1rem] text-white flex justify-center items-end w-[100%] space-x-4 hover:bg-[#4573cf] border-t border-b border-[#4573cf] mt-[2rem]'>
                <span>
                    <AiFillHome />
                </span>
                <span ref={homeRef} className={isRevealed ? 'w-[80%]' : 'hidden'} >HOME</span>
            </p>


            <p className='text-[2.4rem] px-[1rem] py-[1rem] text-white flex justify-center items-end w-[100%] space-x-4 hover:bg-[#4573cf]  border-b border-[#4573cf]'>
                <span >
                    <IoMdAnalytics />
                </span>
                <span ref={analyticsRef} className={isRevealed ? 'w-[80%]' : 'hidden'} >ANALYTICS</span>
            </p>


            <p className='text-[2.4rem] px-[1rem] py-[1rem] text-white flex justify-center items-end w-[100%] space-x-4 hover:bg-[#4573cf]  border-b border-[#4573cf]'>
                <span>
                    <FaGlobeAmericas />
                </span>
                <span ref={globeRef} className={isRevealed ? 'w-[80%]' : 'hidden'} >EXPLORE</span>
            </p>




            <p className='text-[2.4rem] px-[1rem] py-[1rem] text-white flex justify-center items-end w-[100%] space-x-4 hover:bg-[#4573cf]  border-b border-[#4573cf]'>
                <span>
                    <MdWorkspacesFilled />
                </span>
                <span ref={workspaceRef} className={isRevealed ? 'w-[80%]' : 'hidden'} >WORKSPACE</span>
            </p>



            <p className='text-[2.4rem] px-[1rem] py-[1rem] text-white flex justify-center items-end w-[100%] space-x-4 hover:bg-[#4573cf] '>
                <span>
                    <AiFillSetting />
                </span>
                <span ref={settingRef} className={isRevealed ? 'w-[80%]' : 'hidden'} >SETTINGS</span>
            </p>

        </div>
    )
}

export default Sidebar