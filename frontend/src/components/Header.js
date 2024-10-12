import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'

export class Header extends Component {
    render() {
        return (
            <div className='bg-neutral-800 h-32 flex items-center absolute w-full shadow-lg shadow-white'>

                <div className='flex flex-col ml-8'>
                    <ProfileHeader />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded'
                        placeholder='Location'
                        rows='1'
                        cols='30'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded'
                        placeholder='Activity'
                        rows='1'
                        cols='50'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded'
                        placeholder='End Time'
                        rows='1'
                        cols='10'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex flex-col ml-auto mr-12'>
                    <h1 className='text-white font-cyberwar text-5xl'>Status Now</h1>
                </div>
            </div>
        )
    }
}

export default Header