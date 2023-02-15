"use client"; //this is a client component
import React from 'react'
import Image from 'next/image'
import { FaBell } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'

function Header() {
  return (
    <div className='flex justify-start items-center  shadow-xl py-[1.3rem] px-[0.5rem]'>
      <div className='w-[40%]'></div>

      {/* MAIN DIV */}
      <div className='flex justify-between items-center flex-grow '>

        {/* COMPANY LOGO GOES HERE */}
        <div className='flex justify-center items-center space-x-2'>
          <p className="relative w-[32px] h-[32px]">
            <Image src={'/logo.svg'} priority={true}
              alt=''
              fill
              sizes="100vw"
              style={{
                objectFit: "cover"
              }} />
          </p>
          <p className=' font-josefinRegular text-[1.3rem] font-[600] tracking-widest text-[#0a2351]'>PLANT</p>
        </div>

        {/* MENU ITEMS GOES HERE */}
        <div className='flex justify-center items-center space-x-8'>
          <p className='text-[1.2rem] text-[#0a2351] relative'>
            <FaBell />
            <span className='w-[10px] h-[10px] bg-green-500 rounded-full absolute top-0 right-0'></span>
          </p>
          <p className='text-[1.3rem] text-[#0a2351]'>
            <BsFillPersonFill />
          </p>
          <p className='text-[1.3rem] text-[#0a2351]'>
            <BiDotsVerticalRounded />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header