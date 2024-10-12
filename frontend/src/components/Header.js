import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'

export class Header extends Component {
    render() {
        return (
            <div className='bg-neutral-800 h-32 flex items-center absolute w-full shadow-lg border-2 border-purple-700  rounded-bl-3xl rounded-tr-3xl'>

                <div className='flex flex-col ml-8'>
                    <ProfileHeader />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl border-2 border-neonBlue'
                        placeholder='Location'
                        rows='1'
                        cols='30'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl border-2 border-neonBlue'
                        placeholder='Activity'
                        rows='1'
                        cols='50'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl border-2 border-neonBlue'
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