import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'

export class Header extends Component {
    render() {
        return (
            <div className='bg-neutral-800 h-32 flex items-center absolute w-full shadow-lg outline outline-1 outline-fuchsia-500 -outline-offset-8 rounded-bl-3xl rounded-tr-3xl'>

                <div className='flex flex-col ml-8'>
                    <ProfileHeader />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl outline outline-1 outline-neonBlue outline-offset-4 transition-all duration-250 ease-in-out hover:outline-offset-8'
                        placeholder='Location'
                        rows='1'
                        cols='30'
                        style={{ resize: 'none' }}
                        onFocus={(e) => e.target.classList.add('outline-offset-8')}
                        onBlur={(e) => e.target.classList.remove('outline-offset-8')}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl outline outline-1 outline-neonBlue outline-offset-4 transition-all duration-250 ease-in-out hover:outline-offset-8'
                        placeholder='Activity'
                        rows='1'
                        cols='50'
                        style={{ resize: 'none' }}
                        onFocus={(e) => e.target.classList.add('outline-offset-8')}
                        onBlur={(e) => e.target.classList.remove('outline-offset-8')}
                    />
                </div>
                <div className='flex flex-col ml-8'>
                    <textarea
                        className='bg-neutral-700 text-white p-2 rounded-bl-2xl rounded-tr-2xl outline outline-1 outline-neonBlue outline-offset-4 transition-all duration-250 ease-in-out hover:outline-offset-8'
                        placeholder='End Time'
                        rows='1'
                        cols='10'
                        style={{ resize: 'none' }}
                        onFocus={(e) => e.target.classList.add('outline-offset-8')}
                        onBlur={(e) => e.target.classList.remove('outline-offset-8')}
                    />
                </div>
                <div className='flex flex-col ml-auto mr-12'>
                    <h1 className='text-white font-cyberwar text-5xl glitch'>Status Now</h1>
                </div>
            </div>
        )
    }
}

export default Header