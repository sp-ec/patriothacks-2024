import React, { Component } from 'react'
import Header from '../components/Header'
import Task from '../components/Task'

export class Main extends Component {
    render() {
        return (
            <>
                <Header />
                <div className='flex flex-row min-h-screen pt-32'>
                    <div className='flex flex-col basis-3/4'>
                        <h2 className='text-white text-3xl p-8'>Co-Workers</h2>
                    </div>
                    <div className='flex flex-col bg-blue-400 min-h-screen basis-1/4'>
                        <h2 className='text-white text-3xl text-center p-8'>Tasks</h2>
                        <Task />
                        <Task />
                    </div>
                </div>
            </>
        )
    }
}

export default Main