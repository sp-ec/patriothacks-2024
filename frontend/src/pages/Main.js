import React, { useEffect } from 'react'
import Header from '../components/Header'
import Task from '../components/Task'
import WorkerStatus from '../components/WorkerStatus'

function Main() {

    useEffect(() => {
        // Fetch comments from the database and update the state
        // Example code:
        const fetchUsers = async () => {
            try {
                fetch('http://backend-production-bc79.up.railway.app/users')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })

            } catch (error) {
                console.error('Error fetching users:', error);

            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <div className='flex flex-row min-h-screen pt-32'>

                <div className='flex flex-col basis-3/4'>
                    <div className='flex flex-row mt-4 ml-4 mb-4'>
                        <h2 className='text-white text-3xl p-4'>Your Co-Workers</h2>
                        <textarea
                            className='bg-neutral-600 text-white p-2 h-10 mt-4 ml-5'
                            placeholder='Search'
                            rows='1'
                            cols='30'
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <WorkerStatus bg='bg-neutral-600' name='John Doe' status='Available' location='JC' endTime='9PM' activity="Doing lighting training aaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaa aaaaaa aaaa aaaaaaaaaaa aaaaa aaaaaaaa aaaaaaa aaaaa" />
                    <WorkerStatus bg='bg-neutral-700' name='Noah Martineau' status='Busy' location='Dewberry Hall' endTime='7PM' activity="Setting up event" />
                    <WorkerStatus bg='bg-neutral-600' name='Catherine Tomic' status='Busy' location='Dewberry Hall' endTime='7PM' activity="Lighting tech" />
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

export default Main