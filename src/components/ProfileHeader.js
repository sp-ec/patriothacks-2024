import React, { Component } from 'react'

export class ProfileHeader extends Component {
    render() {
        return (
            <>
                <div className='flex flex-row'>

                    <img src={require('../images/template_profile.png')} className='h-20'></img>

                    <div className='flex flex-col mt-1'>
                        <h1 className='text-3xl text-white ml-8'>Your Name</h1>
                        <div className='flex flex-row mt-2'>
                            <div className='w-3 h-3 bg-green-500 rounded-full ml-8 mt-2'></div>
                            <p className='ml-3 text-white'>Available</p>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default ProfileHeader