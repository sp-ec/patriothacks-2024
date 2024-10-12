import React, { Component } from 'react'
import ProfileHeader from '../components/ProfileHeader'

export class Main extends Component {
    render() {
        return (
            <div className='bg-neutral-800 h-32 flex items-center'>
                <div className='flex flex-row justify-start'>
                    <div className='flex flex-col ml-8'>
                        <ProfileHeader />
                    </div>
                    <div className='flex flex-col ml-8'>
                        <textarea
                            className='bg-white text-black p-2 rounded'
                            placeholder='Enter your text here...'
                            rows='2'
                            cols='50'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main