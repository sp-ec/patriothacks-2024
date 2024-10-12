import React, { Component } from 'react'
import Dropdown from './Dropdown'

export class ProfileHeader extends Component {
    render() {
        return (
            <>
                <div className='flex flex-row'>
                    <img src={require('../images/template_profile.png')} alt='Template' className='h-20'></img>
                    <div className='flex flex-col mt-1'>
                        <h1 className='text-3xl text-white ml-8'>Your Name</h1>
                        <div className='flex flex-row mt-1'>
                            <Dropdown />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileHeader