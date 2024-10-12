import React, { Component } from 'react'
import Header from '../components/Header'
import Task from '../components/Task'
import WorkerStatus from '../components/WorkerStatus'

export class Main extends Component {
    render() {
        return (
            <>
                <Header />
                <div className='flex flex-row min-h-screen pt-32'>

                    <div className='flex flex-col basis-3/4'>
                        <h2 className='text-white text-3xl p-4 mt-4 ml-4'>Co-Workers</h2>
                        <WorkerStatus name='John Doe' status='Available' />
                    </div>

                    <div className='flex flex-col bg-blue-400 min-h-screen basis-1/4'>
                        <h2 className='text-white text-3xl text-center p-4 mt-4'>Tasks</h2>
                        <Task name='Dewberry Setup' description='This a description for the dewberry setup' />
                        <Task name='Clean Colorbands' description='Clean the color dust off the bands from last nights event' />
                    </div>

                </div>
            </>
        )
    }
}

export default Main