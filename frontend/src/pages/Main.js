import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Task from '../components/Task'
import WorkerStatus from '../components/WorkerStatus'

function Main() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        console.log(search);
        console.log("Fetching users...");
        const fetchUsers = async () => {
            try {
                fetch('https://backend-production-bc79.up.railway.app/users?name=' + search)
                    .then(response => response.json())
                    .then(data => {
                        setUsers(data);
                    })

            } catch (error) {
                console.error('Error fetching users:', error);

            }
        };

        fetchUsers([search]);
    }, [search]);

    return (
        <>
            <Header />
            <div className='flex flex-row min-h-screen pt-32'>

                <div className='flex flex-col basis-3/4'>
                    <div className='flex flex-row mt-4 ml-4 mb-4'>
                        <h2 className='text-white text-3xl p-4'>Your Co-Workers</h2>
                        <textarea
                            className='bg-neutral-600 text-white p-2 h-10 mt-4 ml-5 rounded-bl-2xl rounded-tr-2xl'
                            placeholder='Search'
                            rows='1'
                            cols='30'
                            style={{ resize: 'none' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {users.map((user, index) => (
                        <WorkerStatus
                            key={index}
                            bg={index % 2 == 0 ? 'bg-neutral-600' : 'bg-neutral-700'}
                            name={user.first_name + ' ' + user.last_name}
                            status={user.availability}
                            endTime={user.end_time}
                            activity={user.status}
                            location={user.location}
                        />
                    ))}
                </div>

                <div className='flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen basis-1/4 shadow-lg'>
                    <h2 className='text-white text-3xl text-center p-4 mt-4'>Tasks</h2>
                    <Task name='Dewberry Setup' description='This a description for the dewberry setup' />
                    <Task name='Clean Colorbands' description='Clean the color dust off the bands from last nights event' />
                    <Task name='Find Drape' description='Find 20 pieces of drape, set inside of an empty trunk, and label'></Task>
                    <Task name='Pull for Setup' description='Pull equipment for Event A and leave a note with equipment pulled'></Task>
                    <Task name='Organize Void' description='Clear all trunks and put everything away'></Task>
                </div>

            </div>
        </>
    )
}

export default Main