import PropTypes from 'prop-types'
import React, { Component } from 'react'

const WorkerStatus = (props) => {
    return (
        <div>
            <div className='flex flex-row p-4 m-4 rounded'>
                <img src={require('../images/template_profile.png')} className='h-16 mr-6'></img>
                <div className='flex flex-col'>
                    <h1 className='text-white text-2xl'>{props.name}</h1>
                    <p className='text-white mt-1'>{props.status}</p>
                </div>
            </div>
        </div>
    )
}

export default WorkerStatus