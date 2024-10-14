import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';  // Import NavBar

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/api/admin/teams', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTeams(data);
            } else {
                setError('Error fetching teams');
            }
        } catch (error) {
            setError('Error fetching teams');
        }
    };

    const fetchTasksForTeam = async (teamId) => {
        try {
            const response = await fetch(`/api/admin/team-tasks/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTasks(data);
                setSelectedTeam(teamId);
            } else {
                setError('Error fetching tasks for team');
            }
        } catch (error) {
            setError('Error fetching tasks for team');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-10">
            <NavBar />  
            <h1 className="text-4xl mb-8">Admin Dashboard</h1>
            <div className="flex">
                <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-4 text-neonPurple">Teams</h2>
                    <ul className="space-y-4">
                        {teams.map(team => (
                            <li
                                key={team.id}
                                className={`cursor-pointer ${selectedTeam === team.id ? 'bg-neonPurple' : 'bg-neutral-700'} p-4 rounded-lg`}
                                onClick={() => fetchTasksForTeam(team.id)}
                            >
                                <p>{team.name}</p>
                                <p className="text-sm text-gray-400">Manager: {team.manager_id}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4 ml-10">
                    <h2 className="text-2xl mb-4">{selectedTeam ? `Tasks for Team ${selectedTeam}` : 'Select a team to view tasks'}</h2>

                    {tasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
                                    <h3 className="text-xl text-neonPurple">{task.taskName}</h3>
                                    <p className="text-sm text-gray-400">{task.description}</p>
                                    <p className="text-sm text-gray-400">Assigned to: {task.assigned_user_id}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        selectedTeam && <p>No tasks for this team yet</p>
                    )}

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
