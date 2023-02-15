"use client"; //this is a client component
import React from 'react'
import DataGrid from './DataGrid'
import Header from './Header'

function MainContainer() {
    return (
        <div className='flex-grow '>
            <Header />
            <DataGrid/>
        </div>
    )
}

export default MainContainer